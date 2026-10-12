import type { StoredBlogComment } from "./blogCommentsStorage";

export function renderStoredComment(comment: StoredBlogComment, depth: number): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.dataset.commentId = comment.id;
  if (depth > 0) {
    wrapper.className = "flex items-start sm:flex-row flex-col 1xl:gap-6 lg:gap-4.5 gap-3";

    const avatarAndName = document.createElement("div");
    avatarAndName.className = "flex items-center sm:gap-3.5 gap-2.5 shrink-0";
    const avatarWrapper = document.createElement("div");
    avatarWrapper.className =
      "1xl:size-15 xl:size-14 sm:size-13.5 size-10 rounded-full overflow-hidden shrink-0";
    const avatar = document.createElement("img");
    avatar.src = "/client-3.webp";
    avatar.alt = comment.name;
    avatar.loading = "lazy";
    avatar.className = "w-full h-full object-cover";
    avatarWrapper.append(avatar);

    const identity = document.createElement("div");
    const name = document.createElement("p");
    name.className = "font-medium";
    name.textContent = comment.name;
    const date = document.createElement("p");
    date.className = "text-thunder-100/50 1xl:text-base lt:text-sm text-13";
    date.textContent = new Date(comment.timestamp).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    identity.append(name, date);
    avatarAndName.append(avatarWrapper, identity);

    const card = document.createElement("div");
    card.className =
      "w-full sm:flex-1 border border-primary/20 1xl:px-9 xl:px-7 lt:px-6 sm:px-4.5 px-3.5 1xl:py-5.5 xl:py-4.5 sm:py-3.5 py-2.5";
    const text = document.createElement("p");
    text.className = "text-thunder-100/74";
    text.textContent = comment.text;
    card.append(text);
    wrapper.append(avatarAndName, card);
    return wrapper;
  }

  wrapper.className = "mt-6";

  const avatarAndName = document.createElement("div");
  avatarAndName.className = "flex items-center sm:gap-3.5 gap-2.5 shrink-0";
  const avatar = document.createElement("img");
  avatar.src = "/client-3.webp";
  avatar.alt = comment.name;
  avatar.loading = "lazy";
  avatar.className = "1xl:size-15 xl:size-14 sm:size-13.5 size-10 rounded-full object-cover";
  const identity = document.createElement("div");
  const name = document.createElement("p");
  name.className = "font-medium";
  name.textContent = comment.name;
  const date = document.createElement("p");
  date.className = "text-thunder-100/50 1xl:text-base lt:text-sm text-13";
  date.textContent = new Date(comment.timestamp).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  identity.append(name, date);
  avatarAndName.append(avatar, identity);

  const body = document.createElement("div");
  body.className = "1xl:pl-18.5 lg:pl-18 sm:pl-17 pl-0 w-full";
  const message = document.createElement("div");
  message.className = "bg-whitesmoke-100 border-l-3 border-primary 1xl:p-8.5 xl:p-7.5 lg:p-6 sm:p-5.5 p-4";
  if (comment.replyTo) {
    const replyContext = document.createElement("p");
    replyContext.className = "text-primary text-sm mb-2";
    replyContext.textContent = `Replying to ${comment.replyTo}`;
    message.append(replyContext);
  }
  const text = document.createElement("p");
  text.textContent = comment.text;
  message.append(text);

  const actions = document.createElement("div");
  actions.className =
    "flex items-center lg:gap-8 sm:gap-6 gap-3 xl:mt-6 lg:mt-4.5 mt-3.5 1xl:pl-6 sm:pl-5 pl-0";
  const likeButton = document.createElement("button");
  likeButton.type = "button";
  likeButton.dataset.likeId = comment.id;
  likeButton.dataset.baseCount = "0";
  likeButton.className = "like-btn flex items-center sm:gap-2 gap-1 cursor-pointer";
  likeButton.setAttribute("aria-pressed", "false");
  likeButton.innerHTML =
    '<svg viewBox="0 0 24 24" class="text-[#575757] lg:size-6 size-5 object-contain" aria-hidden="true"><path fill="currentColor" d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501C7.5.825 2 4.274 2 9.137"/></svg><p class="p2 text-thunder-100/80">Like</p><span class="like-count text-sm text-thunder-100/80"></span>';
  const replyButton = document.createElement("button");
  replyButton.type = "button";
  replyButton.dataset.replyId = comment.id;
  replyButton.dataset.replyTo = comment.name;
  replyButton.className = "reply-btn flex items-center sm:gap-2 gap-1 cursor-pointer";
  replyButton.innerHTML =
    '<svg viewBox="0 0 24 24" class="text-[#575757] lg:size-7 size-6 object-contain" aria-hidden="true"><path d="M14 9V5L21 12L14 19V14.9C9 14.9 5.5 16.5 3 20C4 15 7 10 14 9Z" fill="currentColor"/></svg><p class="p2 text-thunder-100/80">Reply</p>';
  actions.append(likeButton, replyButton);

  const replies = document.createElement("div");
  replies.dataset.repliesFor = comment.id;
  replies.className = "mt-6";
  body.append(message, actions);
  wrapper.append(avatarAndName, body, replies);
  return wrapper;
}
