export function initClassTwoListing() {
    document.querySelectorAll<HTMLElement>("[data-class-two-listing]").forEach((listing) => {
        const searchInput = listing.querySelector<HTMLInputElement>("[data-class-two-search]");
        const categoryButton = listing.querySelector<HTMLButtonElement>("[data-class-two-category-button]");
        const categoryMenu = listing.querySelector<HTMLElement>("[data-class-two-category-menu]");
        const categoryText = listing.querySelector<HTMLElement>("[data-class-two-category-text]");
        const categoryItems = listing.querySelectorAll<HTMLElement>("[data-class-two-category]");
        const cards = Array.from(listing.querySelectorAll<HTMLElement>("[data-class-two-card]"));
        const revealButton = listing.querySelector<HTMLButtonElement>("[data-class-two-reveal]");

        if (!searchInput || !categoryButton || !categoryMenu || !categoryText || !revealButton) {
            return;
        }

        const initialVisibleCount = 6;
        let selectedCategory = "All Category";
        let showingAll = false;

        const closeDropdown = () => {
            categoryMenu.classList.remove("open", "max-h-96", "opacity-100");
            categoryMenu.classList.add("max-h-0", "opacity-0");
            categoryButton.setAttribute("aria-expanded", "false");
            categoryButton.querySelector(".dropdown-arrow")?.classList.remove("rotate-180");
        };

        const updateCards = () => {
            const searchValue = searchInput.value.trim().toLowerCase();
            const filteredCards = cards.filter((card) => {
                const title = card.dataset.title?.toLowerCase() ?? "";
                const tagline = card.dataset.tagline?.toLowerCase() ?? "";
                const description = card.dataset.description?.toLowerCase() ?? "";
                const categories = card.dataset.categories?.toLowerCase().split("|") ?? [];
                const matchesSearch =
                    !searchValue ||
                    title.includes(searchValue) ||
                    tagline.includes(searchValue) ||
                    description.includes(searchValue);
                const matchesCategory =
                    selectedCategory === "All Category" ||
                    categories.includes(selectedCategory.toLowerCase());

                return matchesSearch && matchesCategory;
            });

            cards.forEach((card) => {
                card.style.display = "none";
            });

            const visibleCards = showingAll
                ? filteredCards
                : filteredCards.slice(0, initialVisibleCount);

            visibleCards.forEach((card) => {
                card.style.display = "";
            });

            revealButton.style.display =
                !showingAll && filteredCards.length > initialVisibleCount
                    ? "flex"
                    : "none";
        };

        categoryButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const isOpen = categoryMenu.classList.contains("open");

            if (isOpen) {
                closeDropdown();
            } else {
                categoryMenu.classList.remove("max-h-0", "opacity-0");
                categoryMenu.classList.add("open", "max-h-96", "opacity-100");
                categoryButton.setAttribute("aria-expanded", "true");
                categoryButton.querySelector(".dropdown-arrow")?.classList.add("rotate-180");
            }
        });

        categoryItems.forEach((item) => {
            item.addEventListener("click", () => {
                selectedCategory = item.dataset.classTwoCategory ?? "All Category";
                categoryText.textContent = selectedCategory;
                showingAll = false;
                updateCards();
                closeDropdown();
            });
        });

        searchInput.addEventListener("input", () => {
            showingAll = false;
            updateCards();
        });

        revealButton.addEventListener("click", () => {
            showingAll = true;
            updateCards();
        });

        document.addEventListener("click", (event) => {
            if (!listing.contains(event.target as Node)) {
                closeDropdown();
            }
        });

        updateCards();
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initClassTwoListing, { once: true });
} else {
    initClassTwoListing();
}
