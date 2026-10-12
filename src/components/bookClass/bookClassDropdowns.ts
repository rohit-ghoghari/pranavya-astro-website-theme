export const closeDropdown = (dropdown: HTMLElement) => {
    dropdown.classList.remove("is-open");
    dropdown
        .querySelector<HTMLButtonElement>(".dropdown-btn")
        ?.setAttribute("aria-expanded", "false");
};

export const closeAllDropdowns = (except?: HTMLElement, dropdowns?: HTMLElement[]) => {
    const list = dropdowns ?? Array.from(document.querySelectorAll<HTMLElement>(".dropdown"));
    list.forEach((dropdown) => {
        if (dropdown !== except) closeDropdown(dropdown);
    });
};

export function initBookClassDropdowns(
    form: HTMLFormElement,
    validateField: (field: HTMLInputElement) => boolean
) {
    const dropdowns = Array.from(form.querySelectorAll<HTMLElement>(".dropdown"));

        dropdowns.forEach((dropdown) => {
            const button = dropdown.querySelector<HTMLButtonElement>(".dropdown-btn");
            const text = dropdown.querySelector<HTMLElement>(".dropdown-text");
            const hiddenInput = dropdown.querySelector<HTMLInputElement>('input[type="hidden"]');
            const items = dropdown.querySelectorAll<HTMLElement>(".dropdown-item");

            if (!button || !text || !hiddenInput) return;

            button.setAttribute("aria-haspopup", "listbox");
            button.setAttribute("aria-expanded", "false");

            /* Open / close */
            button.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();

                const willOpen = !dropdown.classList.contains("is-open");

                closeAllDropdowns(dropdown);

                if (willOpen) {
                    dropdown.classList.add("is-open");
                    button.setAttribute("aria-expanded", "true");
                } else {
                    closeDropdown(dropdown);
                }
            });

            /* Select an option */
            items.forEach((item) => {
                item.addEventListener("click", (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const label = item.textContent?.trim() || "";
                    const value = item.dataset.value || label;

                    hiddenInput.value = value;
                    text.textContent = label;

                    text.classList.remove("text-thunder-100/50");
                    text.classList.add("text-thunder-100");

                    items.forEach((other) => other.classList.remove("is-selected"));
                    item.classList.add("is-selected");

                    closeDropdown(dropdown);

                    // Clear the error as soon as a value is chosen
                    if (hiddenInput.required) validateField(hiddenInput);
                });
            });
        });

        /* Click outside closes every dropdown */
        document.addEventListener("click", (event) => {
            const target = event.target as Node;

            dropdowns.forEach((dropdown) => {
                if (!dropdown.contains(target)) closeDropdown(dropdown);
            });
        });

        /* Escape closes dropdowns */
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeAllDropdowns();
        });


}
