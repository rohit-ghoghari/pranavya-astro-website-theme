export function initClassListing() {
    const searchInput = document.querySelector<HTMLInputElement>("[data-class-search]");
    const categoryButton = document.querySelector<HTMLButtonElement>("[data-category-button]");
    const categoryMenu = document.querySelector<HTMLElement>("[data-category-menu]");
    const categoryText = document.querySelector<HTMLElement>(".dropdown-text");
    const categoryItems = document.querySelectorAll<HTMLElement>(".dropdown-item");
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-class-card]"));
    const revealButton = document.querySelector<HTMLButtonElement>("[data-reveal-more]");

    if (
        !searchInput ||
        !categoryButton ||
        !categoryMenu ||
        !categoryText ||
        !revealButton
    ) {
        return;
    }

    const INITIAL_VISIBLE_COUNT = 6;
    let showingAll = false;
    let selectedCategory = "All Category";

    const closeDropdown = () => {
        categoryMenu.classList.remove("open", "max-h-96", "opacity-100");
        categoryMenu.classList.add("max-h-0", "opacity-0");
        categoryButton.querySelector(".dropdown-arrow")?.classList.remove("rotate-180");
    };

    const openDropdown = () => {
        categoryMenu.classList.remove("max-h-0", "opacity-0");
        categoryMenu.classList.add("open", "max-h-96", "opacity-100");
        categoryButton.querySelector(".dropdown-arrow")?.classList.add("rotate-180");
    };

    const getFilteredCards = () => {
        const searchValue = searchInput.value.trim().toLowerCase();

        return cards.filter((card) => {
            const title = card.dataset.title?.toLowerCase() ?? "";
            const description = card.dataset.description?.toLowerCase() ?? "";
            const category = card.dataset.category?.toLowerCase() ?? "";
            const filterCategories =
                card.dataset.filterCategories
                    ?.toLowerCase()
                    .split("|")
                    .map((value) => value.trim()) ?? [];

            const matchesSearch =
                !searchValue ||
                title.includes(searchValue) ||
                description.includes(searchValue) ||
                category.includes(searchValue);

            const matchesCategory =
                selectedCategory === "All Category" ||
                filterCategories.includes(selectedCategory.toLowerCase());

            return matchesSearch && matchesCategory;
        });
    };

    const updateCards = () => {
        const filteredCards = getFilteredCards();

        cards.forEach((card) => {
            card.style.display = "none";
        });

        const cardsToShow = showingAll
            ? filteredCards
            : filteredCards.slice(0, INITIAL_VISIBLE_COUNT);

        cardsToShow.forEach((card) => {
            card.style.display = "";
        });

        if (!showingAll && filteredCards.length > INITIAL_VISIBLE_COUNT) {
            revealButton.style.display = "flex";
        } else {
            revealButton.style.display = "none";
        }
    };

    categoryButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = categoryMenu.classList.contains("open");
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    categoryItems.forEach((item) => {
        item.addEventListener("click", () => {
            selectedCategory = item.dataset.category ?? "All Category";
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
        const target = event.target as Node;
        if (!categoryButton.contains(target) && !categoryMenu.contains(target)) {
            closeDropdown();
        }
    });

    updateCards();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initClassListing, { once: true });
} else {
    initClassListing();
}
