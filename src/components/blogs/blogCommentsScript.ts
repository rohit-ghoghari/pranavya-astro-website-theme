import {
  type StoredBlogComment,
  loadComments,
  loadLikes,
  saveComments,
  saveLikes,
  updateLikeButton,
} from "./blogCommentsStorage";
import { renderStoredComment } from "./blogCommentsRenderer";

export function initBlogComments() {
  document.addEventListener("change", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || !input.matches(".file-upload .file-input")) return;
    const fileName = input.closest("label")?.querySelector<HTMLElement>(".file-name");
    if (fileName) fileName.textContent = input.files?.[0]?.name ?? "No choosen file";
  });

  const commentsRoot = document.querySelector<HTMLElement>("#blog-comments");
  const baseReplyForm = document.querySelector<HTMLFormElement>("#reply-form");
  const pageKey = `pranavya-blog-comments:${window.location.pathname}`;
  const commentsKey = `${pageKey}:comments`;
  const likesKey = `${pageKey}:likes`;

  const root = commentsRoot;
  if (!root || !baseReplyForm) return;

  const comments = loadComments(commentsKey);
  const likes = loadLikes(likesKey);
  let inlineFormCount = 0;

  root.querySelectorAll<HTMLButtonElement>(".like-btn").forEach((button) => {
    const id = button.dataset.likeId;
    if (!id) return;
    const stored = likes[id];
    const like = stored ?? {
      liked: button.dataset.defaultLiked === "true",
      count: Number(button.dataset.baseCount ?? 0),
    };
    updateLikeButton(button, like);
  });

  function appendStoredReplies(parentId: string) {
    if (!root) return;
    const slot = root.querySelector<HTMLElement>(
      `[data-replies-for="${CSS.escape(parentId)}"]`,
    );
    if (!slot) return;
    for (const comment of comments.filter((item) => item.parentId === parentId)) {
      const node = renderStoredComment(comment, 1);
      slot.append(node);
      appendStoredReplies(comment.id);
      const likeButton = node.querySelector<HTMLButtonElement>(".like-btn");
      if (likeButton) {
        const stored = likes[comment.id] ?? { liked: false, count: 0 };
        updateLikeButton(likeButton, stored);
      }
    }
  }

  appendStoredReplies("static-1");
  appendStoredReplies("static-2");
  root.querySelectorAll<HTMLButtonElement>(".reply-btn[data-base-reply-count]").forEach((button) => {
    const id = button.dataset.replyId;
    if (!id) return;
    const count = Number(button.dataset.baseReplyCount ?? 0) +
      comments.filter((comment) => comment.parentId === id).length;
    const countElement = button.querySelector<HTMLElement>(".reply-count");
    if (countElement) countElement.textContent = `- ${count}`;
  });

  const dynamicComments = document.querySelector<HTMLElement>("#dynamic-blog-comments");
  if (dynamicComments) {
    for (const comment of comments.filter((item) => item.parentId === null)) {
      const node = renderStoredComment(comment, 0);
      dynamicComments.append(node);
      appendStoredReplies(comment.id);
      const likeButton = node.querySelector<HTMLButtonElement>(".like-btn");
      if (likeButton) updateLikeButton(likeButton, likes[comment.id] ?? { liked: false, count: 0 });
    }
  }

  root.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const likeButton = target.closest<HTMLButtonElement>(".like-btn");
    if (likeButton) {
      const id = likeButton.dataset.likeId;
      if (!id) return;
      const current = likes[id] ?? {
        liked: likeButton.dataset.defaultLiked === "true",
        count: Number(likeButton.dataset.baseCount ?? 0),
      };
      current.liked = !current.liked;
      current.count = Math.max(0, current.count + (current.liked ? 1 : -1));
      likes[id] = current;
      saveLikes(likesKey, likes);
      updateLikeButton(likeButton, current);
      return;
    }

    const replyButton = target.closest<HTMLButtonElement>(".reply-btn");
    if (!replyButton) return;
    const parentId = replyButton.dataset.replyId;
    const replyTo = replyButton.dataset.replyTo;
    const slot = parentId
      ? root.querySelector<HTMLElement>(`[data-replies-for="${CSS.escape(parentId)}"]`)
      : null;
    if (!parentId || !replyTo || !slot) return;

    root.querySelectorAll("[data-inline-reply-container]").forEach((form) => form.remove());
    inlineFormCount += 1;
    const form = baseReplyForm.cloneNode(true) as HTMLFormElement;
    form.removeAttribute("id");
    form.dataset.inlineReply = "true";
    form.dataset.parentId = parentId;
    form.dataset.replyTo = replyTo;
    for (const field of form.querySelectorAll<HTMLElement>("[id]")) {
      const previousId = field.id;
      const nextId = `inline-reply-${inlineFormCount}-${previousId}`;
      field.id = nextId;
      form.querySelectorAll<HTMLLabelElement>(`label[for="${CSS.escape(previousId)}"]`).forEach((label) => {
        label.htmlFor = nextId;
      });
    }
    const heading = document.createElement("h5");
    heading.className = "uppercase text-primary lg:mb-6 sm:mb-5 mb-4";
    heading.textContent = `Reply to ${replyTo}`;
    const inlineReply = document.createElement("div");
    inlineReply.dataset.inlineReplyContainer = "true";
    inlineReply.className = "reply-form reply-form-animated mt-6 mb-10";
    inlineReply.append(heading, form);
    const cancelButton = form.querySelector<HTMLButtonElement>(".cancel-reply");
    cancelButton?.classList.remove("hidden");
    const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (submitButton) submitButton.textContent = "Post Reply";
    slot.append(inlineReply);
    form.querySelector<HTMLInputElement>('input[name="firstName"]')?.focus();
    inlineReply.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  root.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const cancelButton = target.closest<HTMLButtonElement>(".cancel-reply");
    if (cancelButton) cancelButton.closest("[data-inline-reply-container]")?.remove();
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (form !== baseReplyForm && !form.dataset.inlineReply) return;
    event.preventDefault();
    if (!form.reportValidity()) return;

    const firstName = form.querySelector<HTMLInputElement>('input[name="firstName"]')?.value.trim() ?? "";
    const lastName = form.querySelector<HTMLInputElement>('input[name="lastName"]')?.value.trim() ?? "";
    const email = form.querySelector<HTMLInputElement>('input[name="email"]')?.value.trim() ?? "";
    const text = form.querySelector<HTMLTextAreaElement>('textarea[name="comment"]')?.value.trim() ?? "";
    const parentId = form.dataset.parentId ?? null;
    const replyTo = form.dataset.replyTo ?? null;
    const status = form.querySelector<HTMLElement>(form.dataset.inlineReply ? ".reply-form-status" : ".reply-form-status");

    if (!firstName || !lastName || !email || !text) {
      if (status) {
        status.textContent = "Please complete all required fields.";
        status.classList.remove("hidden");
      }
      return;
    }

    const comment: StoredBlogComment = {
      id: crypto.randomUUID(),
      parentId,
      replyTo,
      name: `${firstName} ${lastName}`,
      email,
      text,
      timestamp: Date.now(),
    };
    const updatedComments = [...comments, comment];
    saveComments(commentsKey, updatedComments);
    comments.push(comment);

    if (parentId) {
      const slot = root.querySelector<HTMLElement>(
        `[data-replies-for="${CSS.escape(parentId)}"]`,
      );
      if (!slot) throw new Error(`Could not find reply container for comment ${parentId}.`);
      const node = renderStoredComment(comment, 1);
      slot.append(node);
      const likeButton = node.querySelector<HTMLButtonElement>(".like-btn");
      if (likeButton) updateLikeButton(likeButton, { liked: false, count: 0 });
    } else {
      if (!dynamicComments) throw new Error("Could not find the new-comments container.");
      const node = renderStoredComment(comment, 0);
      dynamicComments.append(node);
      const likeButton = node.querySelector<HTMLButtonElement>(".like-btn");
      if (likeButton) updateLikeButton(likeButton, { liked: false, count: 0 });
      form.reset();
      if (status) {
        status.textContent = "Comment posted successfully.";
        status.classList.remove("hidden");
      }
      return;
    }

    form.reset();
    const wrapper = form.closest<HTMLElement>("[data-inline-reply-container]");
    if (wrapper) {
      wrapper.innerHTML = "";
      const confirmation = document.createElement("p");
      confirmation.className = "text-primary font-medium";
      confirmation.textContent = "Reply posted successfully.";
      wrapper.append(confirmation);
    }
    const replyCount = root.querySelector<HTMLElement>(
      `[data-comment-id="${CSS.escape(parentId)}"] > div:nth-child(2) .reply-count`,
    );
    if (replyCount) {
      const baseCount = Number(
        root
          .querySelector<HTMLButtonElement>(`[data-reply-id="${CSS.escape(parentId)}"]`)
          ?.dataset.baseReplyCount ?? 0,
      );
      const count = comments.filter((item) => item.parentId === parentId).length;
      replyCount.textContent = `- ${baseCount + count}`;
    }
    wrapper?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBlogComments, { once: true });
} else {
  initBlogComments();
}
