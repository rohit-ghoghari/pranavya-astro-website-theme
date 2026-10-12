const cartSidebar = document.querySelector<HTMLElement>("#cartSidebar");
const wishlistSidebar = document.querySelector<HTMLElement>("#wishlistSidebar");
const cartItems = cartSidebar?.querySelector<HTMLElement>(":scope > div > div:nth-child(2)");
const wishlistItems = wishlistSidebar?.querySelector<HTMLElement>(":scope > div > div:nth-child(2)");

function cartRows() {
    return Array.from(cartItems?.children ?? []).filter(
        (item): item is HTMLElement => item instanceof HTMLElement && item.classList.contains("border-b"),
    );
}

function cartPrice(row: HTMLElement) {
    return Array.from(row.querySelectorAll("p"))
        .find((paragraph) => /^\$\s*[\d,.]+$/.test(paragraph.textContent?.trim() ?? ""));
}

function cartQuantity(row: HTMLElement) {
    const control = Array.from(row.querySelectorAll("div")).find(
        (element) =>
            element.classList.contains("rounded-full") &&
            element.querySelectorAll("button").length >= 2,
    );
    return control?.querySelector<HTMLElement>("p");
}

function updateCartSubtotal() {
    let total = 0;
    for (const row of cartRows()) {
        const price = cartPrice(row);
        const quantity = cartQuantity(row);
        if (!price || !quantity) continue;
        const unitPrice = Number((row.dataset.unitPrice ?? price.textContent ?? "").replace(/[^0-9.]/g, ""));
        row.dataset.unitPrice = String(unitPrice);
        total += unitPrice * (Number.parseInt(quantity.textContent ?? "1", 10) || 1);
    }
    const subtotalLabel = Array.from(cartSidebar?.querySelectorAll("p") ?? []).find(
        (paragraph) => paragraph.textContent?.trim() === "Sub Total",
    );
    const subtotal = subtotalLabel?.parentElement?.querySelector("p:last-child");
    if (subtotal) subtotal.textContent = `$${total.toFixed(2)}`;
}

function setCartRowProduct(row: HTMLElement, product: { title: string; image: string; price: string; id?: string }) {
    row.dataset.unitPrice = String(Number(product.price.replace(/[^0-9.]/g, "")));
    if (product.id) row.dataset.productId = product.id;
    const name = row.querySelector<HTMLElement>("p.font-primary");
    const image = row.querySelector<HTMLImageElement>("img");
    const price = cartPrice(row);
    const quantity = cartQuantity(row);
    if (name) name.textContent = product.title;
    if (image) {
        image.src = product.image;
        image.alt = product.title;
    }
    if (price) price.textContent = product.price;
    if (quantity) quantity.textContent = "1";
}

function openCartSidebar() {
    document.querySelector<HTMLButtonElement>("#openCart")?.click();
}

function openWishlistSidebar() {
    document.querySelector<HTMLButtonElement>("#openWishlist")?.click();
}

function addCartProduct(product: { title: string; image: string; price: string; id?: string }) {
    if (!cartItems) return;
    const existing = product.id
        ? cartRows().find((row) => row.dataset.productId === product.id)
        : undefined;
    if (existing) {
        const quantity = cartQuantity(existing);
        if (quantity) quantity.textContent = String((Number.parseInt(quantity.textContent ?? "1", 10) || 1) + 1);
    } else {
        const template = cartRows()[0];
        if (!template) return;
        const row = template.cloneNode(true) as HTMLElement;
        setCartRowProduct(row, product);
        cartItems.append(row);
        attachCartRow(row);
    }
    updateCartSubtotal();
    openCartSidebar();
}

function addWishlistProduct(product: { title: string; image: string; price: string; id?: string }) {
    if (!wishlistItems) return;
    const existing = Array.from(wishlistItems.children).find(
        (row) => row instanceof HTMLElement && row.querySelector("p.font-primary")?.textContent === product.title,
    );
    if (existing) return;
    const template = wishlistItems.querySelector<HTMLElement>(":scope > div");
    if (!template) return;
    const row = template.cloneNode(true) as HTMLElement;
    const name = row.querySelector<HTMLElement>("p.font-primary");
    const image = row.querySelector<HTMLImageElement>("img");
    const price = Array.from(row.querySelectorAll("p")).find((paragraph) =>
        /^\$\s*[\d,.]+$/.test(paragraph.textContent?.trim() ?? ""),
    );
    if (name) name.textContent = product.title;
    if (image) {
        image.src = product.image;
        image.alt = product.title;
    }
    if (price) price.textContent = product.price;
    if (product.id) row.dataset.productId = product.id;
    attachWishlistRow(row);
    wishlistItems.append(row);
    openWishlistSidebar();
}

function attachCartRow(row: HTMLElement) {
    row.dataset.unitPrice ??= String(Number((cartPrice(row)?.textContent ?? "").replace(/[^0-9.]/g, "")));
    const quantity = cartQuantity(row);
    const control = quantity?.parentElement;
    const [decrease, increase] = Array.from(control?.querySelectorAll<HTMLButtonElement>("button") ?? []);
    decrease?.addEventListener("click", () => {
        const amount = Number.parseInt(quantity?.textContent ?? "1", 10) || 1;
        if (quantity) quantity.textContent = String(Math.max(1, amount - 1));
        updateCartSubtotal();
    });
    increase?.addEventListener("click", () => {
        if (quantity) quantity.textContent = String((Number.parseInt(quantity.textContent ?? "1", 10) || 1) + 1);
        updateCartSubtotal();
    });
    const removeButton = Array.from(row.querySelectorAll<HTMLButtonElement>("button")).find((button) =>
        button.textContent?.includes("Remove"),
    );
    removeButton?.addEventListener("click", () => {
        row.remove();
        updateCartSubtotal();
    });
}

for (const row of cartRows()) attachCartRow(row);

function moveWishlistRowToCart(row: HTMLElement) {
    const title = row.querySelector<HTMLElement>("p.font-primary")?.textContent?.trim();
    const image = row.querySelector<HTMLImageElement>("img")?.src;
    const price = Array.from(row.querySelectorAll("p")).find((paragraph) =>
        /^\$\s*[\d,.]+$/.test(paragraph.textContent?.trim() ?? ""),
    )?.textContent?.trim();
    if (!title || !image || !price) return;
    document.querySelector<HTMLButtonElement>("#closeWishlist")?.click();
    addCartProduct({ title, image, price, id: row.dataset.productId });
    row.remove();
}

function attachWishlistRow(row: HTMLElement) {
    const buttons = Array.from(row.querySelectorAll<HTMLButtonElement>("button"));
    const addToCartButton = buttons.find((button) => button.textContent?.includes("Add to Cart"));
    const removeButton = buttons.find((button) => button !== addToCartButton);
    addToCartButton?.addEventListener("click", () => moveWishlistRowToCart(row));
    removeButton?.addEventListener("click", () => row.remove());
}

for (const row of Array.from(wishlistItems?.children ?? [])) {
    if (row instanceof HTMLElement) attachWishlistRow(row);
}

const moveAllButton = Array.from(wishlistSidebar?.querySelectorAll<HTMLButtonElement>("button, a") ?? []).find(
    (button) => button.textContent?.includes("Move All to Cart"),
);
moveAllButton?.addEventListener("click", (event) => {
    event.preventDefault();
    for (const row of Array.from(wishlistItems?.children ?? [])) {
        if (row instanceof HTMLElement) moveWishlistRowToCart(row);
    }
});

document.querySelectorAll<HTMLButtonElement>(".shop-product-card .cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const productCard = button.closest<HTMLElement>(".shop-product-card");
        const title = productCard?.dataset.productTitle;
        const image = productCard?.querySelector<HTMLImageElement>("img")?.src;
        const value = productCard?.dataset.price;
        const price = Array.from(productCard?.querySelectorAll("p") ?? []).find((paragraph) =>
            /^\$\s*[\d,.]+$/.test(paragraph.textContent?.trim() ?? ""),
        )?.textContent?.trim();
        const formattedPrice = price ?? (value ? `$${Number(value).toFixed(2)}` : undefined);
        if (!title || !image || !formattedPrice) return;

        button.classList.toggle("active");
        button.setAttribute("aria-pressed", String(button.classList.contains("active")));
        const product = {
            title,
            image,
            price: formattedPrice,
            id: productCard?.dataset.productId,
        };
        if (button.getAttribute("aria-label") === "Add to wishlist") {
            addWishlistProduct(product);
        } else {
            addCartProduct(product);
        }
    });
});
