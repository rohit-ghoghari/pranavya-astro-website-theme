const gridView = document.querySelector<HTMLElement>("#grid-view");
const listView = document.querySelector<HTMLElement>("#list-view");
const gridButton = document.querySelector<HTMLButtonElement>("#grid-btn");
const listButton = document.querySelector<HTMLButtonElement>("#list-btn");

function toggleView(viewType: "grid" | "list") {
    const isGrid = viewType === "grid";
    currentPage = 1;
    gridView?.classList.toggle("hidden", !isGrid);
    listView?.classList.toggle("hidden", isGrid);
    gridButton?.classList.toggle("active", isGrid);
    listButton?.classList.toggle("active", !isGrid);
    gridButton?.setAttribute("aria-pressed", String(isGrid));
    listButton?.setAttribute("aria-pressed", String(!isGrid));
    applyShopFilters();
}

gridButton?.addEventListener("click", () => toggleView("grid"));
listButton?.addEventListener("click", () => toggleView("list"));

const filterPanel = document.querySelector<HTMLElement>(".shop-filter-panel");
const mobileFilterButton = document.querySelector<HTMLButtonElement>(".shop-filter-mobile-toggle");
const mobileFilterIcon = document.querySelector<HTMLElement>(".shop-filter-mobile-icon");

function syncMobileFilters() {
    const isMobile = window.innerWidth < 1024;
    if (filterPanel) filterPanel.hidden = isMobile;
    mobileFilterButton?.setAttribute("aria-expanded", String(!isMobile));
    if (mobileFilterIcon) mobileFilterIcon.textContent = isMobile && filterPanel?.hidden ? "+" : "−";
}

syncMobileFilters();
window.addEventListener("resize", syncMobileFilters);
mobileFilterButton?.addEventListener("click", () => {
    if (window.innerWidth >= 1024 || !filterPanel) return;
    filterPanel.hidden = !filterPanel.hidden;
    mobileFilterButton.setAttribute("aria-expanded", String(!filterPanel.hidden));
    if (mobileFilterIcon) mobileFilterIcon.textContent = filterPanel.hidden ? "+" : "−";
});

document.querySelectorAll<HTMLButtonElement>(".filter-toggle").forEach((button) => {
    button.addEventListener("click", () => {
        const content = button.parentElement?.querySelector<HTMLElement>(".filter-content");
        if (!content) return;
        content.hidden = !content.hidden;
        button.setAttribute("aria-expanded", String(!content.hidden));
        const icon = button.querySelector<HTMLElement>(".toggle-icon");
        if (icon) icon.textContent = content.hidden ? "+" : "−";
    });
});

const sortRoot = document.querySelector<HTMLElement>("#shop-sort");
const sortButton = sortRoot?.querySelector<HTMLButtonElement>(".dropdown-btn");
const sortMenu = sortRoot?.querySelector<HTMLElement>(".dropdown-menu");
sortButton?.addEventListener("click", () => {
    const isOpen = sortButton.getAttribute("aria-expanded") === "true";
    sortButton.setAttribute("aria-expanded", String(!isOpen));
    sortMenu?.classList.toggle("open", !isOpen);
    sortMenu?.classList.toggle("opacity-0", isOpen);
    sortMenu?.classList.toggle("max-h-0", isOpen);
    sortMenu?.classList.toggle("opacity-100", !isOpen);
    sortMenu?.classList.toggle("max-h-[400px]", !isOpen);
    sortButton.querySelector(".dropdown-arrow")?.classList.toggle("rotate-180", !isOpen);
});

const productElements = Array.from(document.querySelectorAll<HTMLElement>(".shop-product-card"));
const filterInputs = Array.from(document.querySelectorAll<HTMLInputElement>(".filter-option"));
const sortInputs = Array.from(document.querySelectorAll<HTMLInputElement>(".sort-option"));
const resultsLabel = document.querySelector<HTMLElement>("#shop-results");
const filterTags = document.querySelector<HTMLElement>("#shop-filter-tags");
const pagination = document.querySelector<HTMLElement>("#pagination");
const paginationSection = pagination?.closest("section");
const pageSize = 9;
let currentPage = 1;
filterTags?.replaceChildren();

const previousPath = "M4.97462 6.77552C4.86214 6.88803 4.79895 7.04062 4.79895 7.19972L8.36882 11.0181C8.42417 11.0754 8.49037 11.1211 8.56357 11.1526C8.63678 11.184 8.71551 11.2006 8.79518 11.2013C8.87484 11.202 8.95385 11.1868 9.02759 11.1566C9.10133 11.1264 9.16832 11.0819 9.22465 11.0256C9.28099 10.9692 9.32554 10.9022 9.35571 10.8285C9.38588 10.7548 9.40106 10.6757 9.40037 10.5961C9.39968 10.5164 9.38312 10.4377 9.35168 10.3645C9.32023 10.2913 9.27452 10.2251 9.21722 10.1697L6.24722 7.19972L9.21722 4.22972L8.36882 3.38132L4.97462 6.77552Z";
const nextPath = "M9.42577 6.77747C9.53826 6.88999 9.60144 7.04257 9.60144 7.20167L6.03157 11.0201C5.97623 11.0774 5.91002 11.1231 5.83682 11.1545C5.76361 11.186 5.68488 11.2025 5.60521 11.2032C5.52555 11.2039 5.44654 11.1887 5.3728 11.1586C5.29906 11.1284 5.23207 11.0838 5.17574 11.0275L8.15317 7.20167L5.18317 4.23167L6.03157 3.38327L9.42577 6.77747Z";

function renderPagination(totalPages: number) {
    if (!pagination) return;
    pagination.replaceChildren();
    if (paginationSection) paginationSection.hidden = totalPages <= 1;
    if (totalPages <= 1) return;

    const addButton = (label: string, page: number, path?: string, active = false) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#";
        link.className = active ? "page-link active" : path ? "nav-btn" : "page-link";
        link.setAttribute("aria-label", label);
        if (active) link.setAttribute("aria-current", "page");
        if (path) {
            link.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="${path}" fill="#2D2D2D"/></svg>`;
        } else {
            link.textContent = label;
        }
        link.addEventListener("click", (event) => {
            event.preventDefault();
            currentPage = Math.max(1, Math.min(totalPages, page));
            applyShopFilters(false);
        });
        li.append(link);
        pagination.append(li);
    };

    if (currentPage > 1) addButton("Previous page", currentPage - 1, previousPath);
    for (let page = 1; page <= totalPages; page++) {
        addButton(String(page), page, undefined, currentPage === page);
    }
    if (currentPage < totalPages) addButton("Next page", currentPage + 1, nextPath);
}

function selectedFilters(type: string) {
    return filterInputs.filter((input) => input.checked && input.dataset.filterType === type);
}

function applyShopFilters(resetPage = true) {
    if (resetPage) currentPage = 1;
    const categories = selectedFilters("category").map((input) => input.value.toLowerCase());
    const brands = selectedFilters("brand").map((input) => input.value.toLowerCase());
    const colors = selectedFilters("color").map((input) => input.value.toLowerCase());
    const ranges = selectedFilters("price");
    const filtered = productElements.filter((product) => {
        const category = (product.dataset.category ?? "").toLowerCase();
        const brand = (product.dataset.brand ?? "").toLowerCase();
        const productColors = (product.dataset.colors ?? "").split(",");
        const price = Number(product.dataset.price);
        return (
            (!categories.length || categories.includes(category)) &&
            (!brands.length || brands.includes(brand)) &&
            (!colors.length || colors.some((color) => productColors.includes(color))) &&
            (!ranges.length || ranges.some((range) => price >= Number(range.dataset.min) && price <= Number(range.dataset.max)))
        );
    });

    const isListView = listView?.classList.contains("hidden") === false;
    const activeProducts = filtered.filter((product) =>
        isListView ? product.closest("#list-view") : product.closest("#grid-view"),
    );
    const totalPages = Math.max(1, Math.ceil(activeProducts.length / pageSize));
    currentPage = Math.min(currentPage, totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const pageProducts = new Set(activeProducts.slice(startIndex, startIndex + pageSize));
    for (const product of productElements) {
        const belongsToActiveView = product.closest(isListView ? "#list-view" : "#grid-view") !== null;
        product.hidden = !filtered.includes(product) || (belongsToActiveView && !pageProducts.has(product));
    }

    const visibleGridProducts = filtered.filter((product) => product.closest("#grid-view"));
    const visibleProducts = isListView ? activeProducts : visibleGridProducts;
    if (resultsLabel) {
        resultsLabel.textContent = visibleProducts.length
            ? `Showing ${startIndex + 1}-${Math.min(startIndex + pageSize, visibleProducts.length)} of ${visibleProducts.length} results`
            : "Showing 0 results";
    }
    renderPagination(totalPages);
    const currentFilterCount = filterTags?.querySelector<HTMLElement>("[data-filter-count]");
    if (currentFilterCount) currentFilterCount.textContent = `${visibleGridProducts.length} Items in`;

    if (filterTags) {
        const chosen = filterInputs.filter((input) => input.checked);
        filterTags.hidden = chosen.length === 0;
        if (!chosen.length) {
            filterTags.replaceChildren();
        } else {
            filterTags.replaceChildren();
            const count = document.createElement("p");
            count.className = "font-medium";
            count.dataset.filterCount = "";
            count.textContent = `${visibleGridProducts.length} Items in`;
            filterTags.append(count);
            for (const input of chosen) {
                const tag = document.createElement("div");
                tag.className = "flex items-center 1xl:gap-5.5 gap-4.5 1xl:px-4.5 xl:px-4 sm:px-3 px-2.5 sm:py-0 py-0.5 rounded-full border border-bronco-100";
                const label = document.createElement("p");
                label.textContent = input.value || input.closest("label")?.textContent?.trim() || "";
                const remove = document.createElement("button");
                remove.type = "button";
                remove.className = "filter-tag-remove hover:text-red-500 transition-colors text-thunder-100";
                remove.setAttribute("aria-label", `Remove ${label.textContent} filter`);
                remove.textContent = "×";
                remove.addEventListener("click", () => {
                    input.checked = false;
                    applyShopFilters();
                });
                tag.append(label, remove);
                filterTags.append(tag);
            }
        }
    }
}

function applySort() {
    const selected = sortInputs.find((input) => input.checked);
    const sortOrder = selected?.value ?? "default";
    const getPrice = (item: HTMLElement) => Number(item.dataset.price);
    const sorted = [...productElements].sort((a, b) => {
        if (sortOrder === "high-price") return getPrice(b) - getPrice(a);
        if (sortOrder === "low-price") return getPrice(a) - getPrice(b);
        if (sortOrder === "newest") return Number(b.dataset.productId) - Number(a.dataset.productId);
        return Number(a.dataset.productId) - Number(b.dataset.productId);
    });
    const parents = new Set(sorted.map((item) => item.parentElement).filter((parent): parent is HTMLElement => parent instanceof HTMLElement));
    for (const parent of parents) {
        for (const item of sorted) {
            if (item.parentElement === parent) parent.append(item);
        }
    }
    applyShopFilters();
}

for (const input of filterInputs) input.addEventListener("change", () => applyShopFilters());
for (const input of sortInputs) {
    input.addEventListener("change", () => {
        for (const other of sortInputs) if (other !== input) other.checked = false;
        applySort();
        const text = sortRoot?.querySelector<HTMLElement>(".dropdown-text");
        if (text) text.textContent = input.closest("label")?.querySelector("span:last-child")?.textContent?.trim() ?? "Sort by";
    });
}

document.querySelectorAll<HTMLButtonElement>(".filter-tag-remove").forEach((button) => {
    button.addEventListener("click", () => {
        const text = button.parentElement?.querySelector("p")?.textContent?.trim().toLowerCase();
        const input = filterInputs.find((candidate) =>
            candidate.value.toLowerCase() === text ||
            candidate.closest("label")?.textContent?.trim().toLowerCase() === text
        );
        if (input) {
            input.checked = false;
            applyShopFilters();
        } else {
            filterTags?.replaceChildren();
            if (filterTags) filterTags.hidden = true;
            applyShopFilters();
        }
    });
});

applyShopFilters();
