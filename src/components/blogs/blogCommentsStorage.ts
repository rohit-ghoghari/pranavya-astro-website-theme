export interface StoredBlogComment {
  id: string;
  parentId: string | null;
  replyTo: string | null;
  name: string;
  email: string;
  text: string;
  timestamp: number;
}

export interface StoredBlogLike {
  liked: boolean;
  count: number;
}

export function isStoredBlogComment(value: unknown): value is StoredBlogComment {
  if (typeof value !== "object" || value === null) return false;
  const comment = value as Record<string, unknown>;
  return (
    typeof comment.id === "string" &&
    (typeof comment.parentId === "string" || comment.parentId === null) &&
    (typeof comment.replyTo === "string" || comment.replyTo === null) &&
    typeof comment.name === "string" &&
    typeof comment.email === "string" &&
    typeof comment.text === "string" &&
    typeof comment.timestamp === "number"
  );
}

export function loadComments(commentsKey: string): StoredBlogComment[] {
  const stored = localStorage.getItem(commentsKey);
  if (!stored) return [];
  const parsed: unknown = JSON.parse(stored);
  if (!Array.isArray(parsed) || !parsed.every(isStoredBlogComment)) {
    throw new Error("Saved blog comments have an invalid format.");
  }
  return parsed;
}

export function loadLikes(likesKey: string): Record<string, StoredBlogLike> {
  const stored = localStorage.getItem(likesKey);
  if (!stored) return {};
  const parsed: unknown = JSON.parse(stored);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Saved blog likes have an invalid format.");
  }

  const likes: Record<string, StoredBlogLike> = {};
  for (const [id, value] of Object.entries(parsed)) {
    if (
      typeof value !== "object" ||
      value === null ||
      typeof (value as Record<string, unknown>).liked !== "boolean" ||
      typeof (value as Record<string, unknown>).count !== "number"
    ) {
      throw new Error("Saved blog likes have an invalid format.");
    }
    likes[id] = value as StoredBlogLike;
  }
  return likes;
}

export function saveComments(commentsKey: string, comments: StoredBlogComment[]) {
  localStorage.setItem(commentsKey, JSON.stringify(comments));
}

export function saveLikes(likesKey: string, likes: Record<string, StoredBlogLike>) {
  localStorage.setItem(likesKey, JSON.stringify(likes));
}

export function updateLikeButton(button: HTMLButtonElement, like: StoredBlogLike) {
  const icon = button.querySelector("svg");
  const label = button.querySelector("p");
  const count = button.querySelector<HTMLElement>(".like-count");
  button.setAttribute("aria-pressed", String(like.liked));
  icon?.classList.toggle("text-red-500", like.liked);
  icon?.classList.toggle("text-[#575757]", !like.liked);
  if (label) label.textContent = like.liked ? "Liked" : "Like";
  if (count) count.textContent = like.count > 0 ? `- ${like.count}` : "";
}
