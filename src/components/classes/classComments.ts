// Comments system for ClassDetailLayout
import {
    type CommentItem,
    loadComments,
    saveComments,
    loadLikes,
    saveLikes,
    generateId,
    getRandomAvatar,
    formatDate,
} from "./classCommentsStorage";

export type { CommentItem };

export function initClassComments() {
    const STORAGE_KEY = 'yoga-comments-' + window.location.pathname;

    function renderReply(reply: CommentItem) {
        return `
            <div class="ml-10 sm:ml-16 md:ml-20 border-l-2 border-primary/30 pl-4 mt-6" data-comment-id="${reply.id}">
                <div class="flex items-center sm:gap-3.5 gap-2.5 lg:mb-5 mb-4">
                    <div class="1xl:size-15 xl:size-14 sm:size-13.5 size-10 rounded-full overflow-hidden shrink-0">
                        <img loading="lazy" src="${reply.avatar}" alt="${reply.name}" class="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p class="font-medium">${reply.name}</p>
                        <p class="text-thunder-100/50 text-16">${formatDate(reply.timestamp)}</p>
                    </div>
                </div>
                <div class="1xl:pl-18.5 lg:pl-18 sm:pl-17 pl-0">
                    <div class="bg-whitesmoke-100 border-l-3 border-primary 1xl:p-8.5 xl:p-7.5 lg:p-6 sm:p-5.5 p-4">
                        <p class="text-primary text-sm mb-2">Replying to ${reply.replyTo}</p>
                        <p>${reply.text}</p>
                    </div>
                    <div class="flex items-center lg:gap-8 sm:gap-6 gap-3 xl:mt-6 lg:mt-4.5 mt-3.5 1xl:pl-6 sm:pl-5 pl-0">
                        <button class="like-btn flex items-center xl:gap-2.5 sm:gap-2 gap-1 cursor-pointer transition-colors hover:text-primary" data-comment-id="${reply.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                class="like-icon text-[#575757] lg:size-6 size-5 object-contain transition-colors">
                                <path fill="currentColor"
                                    d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501C7.5.825 2 4.274 2 9.137" />
                            </svg>
                            <p class="p2 text-thunder-100/80"><span class="like-text">Like</span> <span class="like-count"></span></p>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderComment(comment: CommentItem) {
        return `
            <div data-comment-id="${comment.id}">
                <div class="flex items-center sm:gap-3.5 gap-2.5 lg:mb-5 mb-4">
                    <div class="1xl:size-15 xl:size-14 sm:size-13.5 size-10 rounded-full overflow-hidden shrink-0">
                        <img loading="lazy" src="${comment.avatar}" alt="${comment.name}" class="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p class="font-medium">${comment.name}</p>
                        <p class="text-thunder-100/50 text-16">${formatDate(comment.timestamp)}</p>
                    </div>
                </div>
                <div class="1xl:pl-18.5 lg:pl-18 sm:pl-17 pl-0">
                    <div class="bg-whitesmoke-100 border-l-3 border-primary 1xl:p-8.5 xl:p-7.5 lg:p-6 sm:p-5.5 p-4">
                        <p>${comment.text}</p>
                    </div>
                    <div class="flex items-center lg:gap-8 sm:gap-6 gap-3 xl:mt-6 lg:mt-4.5 mt-3.5 1xl:pl-6 sm:pl-5 pl-0">
                        <button class="like-btn flex items-center xl:gap-2.5 sm:gap-2 gap-1 cursor-pointer transition-colors hover:text-primary" data-comment-id="${comment.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                class="like-icon text-[#575757] lg:size-6 size-5 object-contain transition-colors">
                                <path fill="currentColor"
                                    d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501C7.5.825 2 4.274 2 9.137" />
                            </svg>
                            <p class="p2 text-thunder-100/80"><span class="like-text">Like</span> <span class="like-count"></span></p>
                        </button>
                        <button class="reply-btn flex items-center xl:gap-2.5 sm:gap-2 gap-1 cursor-pointer transition-colors hover:text-primary" data-comment-id="${comment.id}" data-reply-to="${comment.name}">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="text-[#575757] lg:size-7 size-6 object-contain">
                                <path d="M14 9V5L21 12L14 19V14.9C9 14.9 5.5 16.5 3 20C4 15 7 10 14 9Z"
                                    fill="currentColor" />
                            </svg>
                            <p class="p2 text-thunder-100/80">Reply</p>
                        </button>
                    </div>
                </div>
                <div id="replies-${comment.id}" class="mt-6"></div>
            </div>
        `;
    }

    function renderComments() {
        const comments = loadComments(STORAGE_KEY);
        const container = document.getElementById('dynamic-comments-container');
        if (!container) return;

        let html = '';
        comments.filter(c => !c.parentId).forEach(comment => {
            html += renderComment(comment);
        });
        container.innerHTML = html;

        const allCommentIds = ['static-1', 'static-2', ...comments.filter(c => !c.parentId).map(c => c.id)];
        allCommentIds.forEach(commentId => {
            const repliesContainer = document.getElementById('replies-' + commentId);
            if (repliesContainer) {
                const replies = comments.filter(c => c.parentId === commentId);
                repliesContainer.innerHTML = replies.map(r => renderReply(r)).join('');
            }
        });

        updateLikeStates();
        attachEventListeners();
    }

    function updateLikeStates() {
        const likes = loadLikes(STORAGE_KEY);
        Object.keys(likes).forEach(commentId => {
            const likeData = likes[commentId];
            const commentEl = document.querySelector(`[data-comment-id="${commentId}"]`);
            if (commentEl) {
                const likeBtn = commentEl.querySelector('.like-btn');
                const likeIcon = commentEl.querySelector('.like-icon');
                const likeText = commentEl.querySelector('.like-text');
                const likeCount = commentEl.querySelector('.like-count');

                if (likeBtn && likeIcon && likeText && likeCount) {
                    if (likeData.liked) {
                        likeIcon.classList.remove('text-[#575757]');
                        likeIcon.classList.add('text-red-500');
                        likeText.textContent = 'Liked';
                    }
                    if (likeData.count > 0) {
                        likeCount.textContent = `(${likeData.count})`;
                    }
                }
            }
        });
    }

    function attachEventListeners() {
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function(this: HTMLElement) {
                const commentId = this.getAttribute('data-comment-id');
                if (commentId) toggleLike(commentId, this);
            });
        });

        document.querySelectorAll('.reply-btn').forEach(btn => {
            btn.addEventListener('click', function(this: HTMLElement) {
                const commentId = this.getAttribute('data-comment-id');
                const replyToName = this.getAttribute('data-reply-to');
                if (commentId && replyToName) showReplyForm(commentId, replyToName);
            });
        });
    }

    function toggleLike(commentId: string, btnElement: HTMLElement) {
        const likes = loadLikes(STORAGE_KEY);
        const current = likes[commentId] || { liked: false, count: 0 };

        current.liked = !current.liked;
        current.count = current.liked ? current.count + 1 : Math.max(0, current.count - 1);

        likes[commentId] = current;
        saveLikes(STORAGE_KEY, likes);

        const likeIcon = btnElement.querySelector('.like-icon');
        const likeText = btnElement.querySelector('.like-text');
        const likeCount = btnElement.querySelector('.like-count');

        if (likeIcon && likeText && likeCount) {
            if (current.liked) {
                likeIcon.classList.remove('text-[#575757]');
                likeIcon.classList.add('text-red-500');
                likeText.textContent = 'Liked';
            } else {
                likeIcon.classList.remove('text-red-500');
                likeIcon.classList.add('text-[#575757]');
                likeText.textContent = 'Like';
            }
            likeCount.textContent = current.count > 0 ? `(${current.count})` : '';
        }
    }

    function showReplyForm(commentId: string, replyToName: string) {
        const parentIdInput = document.getElementById('parent-comment-id') as HTMLInputElement | null;
        const replyToNameInput = document.getElementById('reply-to-name') as HTMLInputElement | null;
        const indicator = document.getElementById('reply-indicator');
        const cancelBtn = document.getElementById('cancel-reply-btn');
        const submitText = document.getElementById('submit-btn-text');

        if (parentIdInput) parentIdInput.value = commentId;
        if (replyToNameInput) replyToNameInput.value = replyToName;
        if (indicator) {
            indicator.textContent = ` — Replying to ${replyToName}`;
            indicator.classList.remove('hidden');
        }
        if (cancelBtn) cancelBtn.classList.remove('hidden');
        if (submitText) submitText.textContent = 'Post Reply';

        document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        document.getElementById('comment-text')?.focus();
    }

    document.getElementById('cancel-reply-btn')?.addEventListener('click', function(this: HTMLElement) {
        const parentIdInput = document.getElementById('parent-comment-id') as HTMLInputElement | null;
        const replyToNameInput = document.getElementById('reply-to-name') as HTMLInputElement | null;
        const indicator = document.getElementById('reply-indicator');
        const submitText = document.getElementById('submit-btn-text');

        if (parentIdInput) parentIdInput.value = '';
        if (replyToNameInput) replyToNameInput.value = '';
        if (indicator) indicator.classList.add('hidden');
        this.classList.add('hidden');
        if (submitText) submitText.textContent = 'Post Comment';
    });

    const commentForm = document.getElementById('comment-form') as HTMLFormElement | null;
    commentForm?.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = (document.getElementById('comment-name') as HTMLInputElement | null)?.value.trim() || '';
        const email = (document.getElementById('comment-email') as HTMLInputElement | null)?.value.trim() || '';
        const text = (document.getElementById('comment-text') as HTMLTextAreaElement | null)?.value.trim() || '';
        const parentId = (document.getElementById('parent-comment-id') as HTMLInputElement | null)?.value || null;
        const replyToName = (document.getElementById('reply-to-name') as HTMLInputElement | null)?.value || null;

        if (!name || !email || !text) {
            showError('Please fill in all required fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address.');
            return;
        }

        const comments = loadComments(STORAGE_KEY);
        const newComment: CommentItem = {
            id: generateId(),
            name,
            email,
            text,
            avatar: getRandomAvatar(),
            timestamp: Date.now(),
            parentId: parentId || null,
            replyTo: replyToName || null
        };

        comments.push(newComment);
        saveComments(STORAGE_KEY, comments);

        commentForm.reset();
        const parentIdInput = document.getElementById('parent-comment-id') as HTMLInputElement | null;
        const replyToNameInput = document.getElementById('reply-to-name') as HTMLInputElement | null;
        const indicator = document.getElementById('reply-indicator');
        const cancelBtn = document.getElementById('cancel-reply-btn');
        const submitText = document.getElementById('submit-btn-text');

        if (parentIdInput) parentIdInput.value = '';
        if (replyToNameInput) replyToNameInput.value = '';
        if (indicator) indicator.classList.add('hidden');
        if (cancelBtn) cancelBtn.classList.add('hidden');
        if (submitText) submitText.textContent = 'Post Comment';

        showSuccess(parentId ? 'Reply posted successfully!' : 'Comment posted successfully!');
        renderComments();

        setTimeout(() => {
            const newCommentEl = document.querySelector(`[data-comment-id="${newComment.id}"]`);
            if (newCommentEl) {
                newCommentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    });

    function showSuccess(message: string) {
        const successMsg = document.getElementById('form-success-msg');
        const errorMsg = document.getElementById('form-error-msg');
        if (errorMsg) errorMsg.classList.add('hidden');
        if (successMsg) {
            successMsg.textContent = message;
            successMsg.classList.remove('hidden');
            setTimeout(() => successMsg.classList.add('hidden'), 5000);
        }
    }

    function showError(message: string) {
        const errorMsg = document.getElementById('form-error-msg');
        const successMsg = document.getElementById('form-success-msg');
        if (successMsg) successMsg.classList.add('hidden');
        if (errorMsg) {
            errorMsg.textContent = message;
            errorMsg.classList.remove('hidden');
            setTimeout(() => errorMsg.classList.add('hidden'), 5000);
        }
    }

    renderComments();
    attachEventListeners();
}
