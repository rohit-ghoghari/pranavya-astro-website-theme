export interface CommentItem {
    id: string;
    name: string;
    email: string;
    text: string;
    avatar: string;
    timestamp: number;
    parentId?: string | null;
    replyTo?: string | null;
}

export function loadComments(storageKey: string): CommentItem[] {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
}

export function saveComments(storageKey: string, comments: CommentItem[]) {
    localStorage.setItem(storageKey, JSON.stringify(comments));
}

export function loadLikes(storageKey: string): Record<string, { liked: boolean; count: number }> {
    const stored = localStorage.getItem(storageKey + '-likes');
    return stored ? JSON.parse(stored) : {};
}

export function saveLikes(storageKey: string, likes: Record<string, { liked: boolean; count: number }>) {
    localStorage.setItem(storageKey + '-likes', JSON.stringify(likes));
}

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function getRandomAvatar() {
    const avatars = ['/client-3.webp', '/client-4.webp'];
    return avatars[Math.floor(Math.random() * avatars.length)];
}

export function formatDate(timestamp: number) {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}
