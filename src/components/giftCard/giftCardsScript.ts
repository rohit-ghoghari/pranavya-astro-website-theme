const copyTextToClipboard = async (text: string): Promise<boolean> => {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // Fallback
        }
    }

    try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        textarea.style.opacity = "0";
        textarea.setAttribute("readonly", "");

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);

        const doc = document as any;
        const copied = typeof doc.execCommand === "function" ? doc.execCommand("copy") : false;
        textarea.remove();
        return Boolean(copied);
    } catch {
        return false;
    }
};

const initGiftCardCopy = () => {
    const buttons = document.querySelectorAll<HTMLButtonElement>(".copy-gift-code");

    buttons.forEach((button) => {
        if (button.dataset.copyInitialized === "true") {
            return;
        }

        button.dataset.copyInitialized = "true";

        button.addEventListener("click", async () => {
            const code = button.dataset.code;
            if (!code) return;

            const originalLabel = button.getAttribute("aria-label") || "Copy gift card code";
            const copied = await copyTextToClipboard(code);

            if (!copied) {
                button.setAttribute("aria-label", "Unable to copy gift card code");
                button.title = "Unable to copy";
                setTimeout(() => {
                    button.setAttribute("aria-label", originalLabel);
                    button.title = "";
                }, 2000);
                return;
            }

            button.setAttribute("aria-label", "Gift card code copied");
            button.title = "Copied!";

            const copiedMessage = document.createElement("span");
            copiedMessage.textContent = "Copied!";
            copiedMessage.className =
                "gift-card-copied absolute bottom-full right-0 mb-2 whitespace-nowrap rounded bg-primary px-3 py-1.5 text-xs text-white";

            const parent = button.parentElement;
            if (parent) {
                parent.classList.add("relative");
                parent.appendChild(copiedMessage);
            }

            setTimeout(() => {
                copiedMessage.remove();
                button.setAttribute("aria-label", originalLabel);
                button.title = "";
            }, 1500);
        });
    });
};

document.addEventListener("astro:page-load", initGiftCardCopy);
initGiftCardCopy();
