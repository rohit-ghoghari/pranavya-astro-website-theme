import Swiper from "swiper/bundle";
import "swiper/css/bundle";

function initProductDetailPage() {
    // ===== SWIPER INITIALIZATION =====
    const thumbEl = document.querySelector('.product-thumb');
    const productEl = document.querySelector('.product');
    
    let productThumb: any = null;
    if (thumbEl) {
        productThumb = new Swiper('.product-thumb', {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
        });
    }

    let mainProductSwiper: any = null;
    if (productEl) {
        mainProductSwiper = new Swiper('.product', {
            spaceBetween: 10,
            thumbs: productThumb ? {
                swiper: productThumb,
            } : undefined,
        });
    }

    // ===== VIDEO PLAY BUTTON =====
    const eventVideo = document.getElementById('eventVideo') as HTMLVideoElement | null;
    const videoPlay = document.querySelector<HTMLElement>('.video-play');
    
    if (eventVideo && videoPlay) {
        videoPlay.addEventListener('click', function() {
            eventVideo.play();
            videoPlay.style.display = 'none';
            eventVideo.setAttribute('controls', 'controls');
        });
        
        eventVideo.addEventListener('pause', function() {
            if (eventVideo.currentTime > 0 && !eventVideo.ended) {
                videoPlay.style.display = 'flex';
            }
        });
        
        eventVideo.addEventListener('ended', function() {
            videoPlay.style.display = 'flex';
            eventVideo.removeAttribute('controls');
        });
        
        eventVideo.addEventListener('play', function() {
            videoPlay.style.display = 'none';
        });

        if (mainProductSwiper) {
            mainProductSwiper.on('slideChange', function() {
                if (!eventVideo.paused) {
                    eventVideo.pause();
                }
            });
        }
    }

    // ===== QUANTITY SELECTOR =====
    const quantityDisplay = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease');
    const increaseBtn = document.getElementById('increase');
    let quantity = 1;

    if (decreaseBtn && increaseBtn && quantityDisplay) {
        decreaseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = String(quantity);
            }
        });

        increaseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            quantity++;
            quantityDisplay.textContent = String(quantity);
        });
    }

    // ===== CART AND WISHLIST FUNCTIONALITY =====
    function getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    function saveCart(cart: any[]) {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
    }

    function getWishlist() {
        const wishlist = localStorage.getItem('wishlist');
        return wishlist ? JSON.parse(wishlist) : [];
    }

    function saveWishlist(wishlist: any[]) {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        window.dispatchEvent(new CustomEvent('wishlist-updated', { detail: wishlist }));
    }

    function showNotification(message: string, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-24 right-4 px-6 py-3 rounded-sm shadow-lg z-50 ${type === 'success' ? 'bg-green-600' : 'bg-blue-600'} text-white`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    function getSelectedColor() {
        const colorInput = document.querySelector<HTMLInputElement>('input[name="color-set-main"]:checked');
        if (!colorInput) return null;
        const colorSpan = colorInput.nextElementSibling?.querySelector<HTMLElement>('span[style]');
        return colorSpan?.style.backgroundColor || null;
    }

    function getSelectedSize() {
        const sizeInput = document.querySelector<HTMLInputElement>('input[name="size-1"]:checked');
        if (!sizeInput) return null;
        return sizeInput.nextElementSibling?.querySelector('p')?.textContent?.trim() || null;
    }

    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productId = this.getAttribute('data-product-id');
            const productTitle = this.getAttribute('data-product-title');
            const productPrice = parseFloat(this.getAttribute('data-product-price') || '0');
            const productImage = this.getAttribute('data-product-image');
            const productUrl = this.getAttribute('data-product-url');
            const selectedColor = getSelectedColor();
            const selectedSize = getSelectedSize();

            const cart = getCart();
            const existingItemIndex = cart.findIndex((item: any) => 
                item.id === productId && 
                item.color === selectedColor && 
                item.size === selectedSize
            );

            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += quantity;
            } else {
                cart.push({
                    id: productId,
                    title: productTitle,
                    price: productPrice,
                    image: productImage,
                    quantity: quantity,
                    color: selectedColor,
                    size: selectedSize,
                    url: productUrl
                });
            }

            saveCart(cart);
            showNotification('Added to cart successfully!', 'success');
            
            quantity = 1;
            if (quantityDisplay) quantityDisplay.textContent = '1';
        });
    }

    const addToWishlistBtn = document.getElementById('addToWishlistBtn');
    if (addToWishlistBtn) {
        addToWishlistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productId = this.getAttribute('data-product-id');
            const productTitle = this.getAttribute('data-product-title');
            const productPrice = this.getAttribute('data-product-price');
            const productImage = this.getAttribute('data-product-image');
            const productUrl = this.getAttribute('data-product-url');
            const productDescription = this.getAttribute('data-product-description');
            const selectedColor = getSelectedColor();

            const wishlist = getWishlist();
            const existingItem = wishlist.find((item: any) => item.id === productId);

            if (existingItem) {
                showNotification('Already in wishlist!', 'info');
            } else {
                wishlist.push({
                    id: productId,
                    title: productTitle,
                    price: productPrice,
                    image: productImage,
                    description: productDescription,
                    color: selectedColor,
                    url: productUrl
                });
                saveWishlist(wishlist);
                showNotification('Added to wishlist!', 'success');
            }
        });
    }

    // Related cards cart & wishlist toggles
    document.querySelectorAll<HTMLElement>('.product-card-wrapper [data-product-id]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const productId = this.getAttribute('data-product-id');
            const cart = getCart();
            const existingItem = cart.find((item: any) => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    title: this.getAttribute('data-product-title'),
                    price: parseFloat(this.getAttribute('data-product-price') || '0'),
                    image: this.getAttribute('data-product-image'),
                    quantity: 1,
                    color: null,
                    size: null,
                    url: this.getAttribute('data-product-url')
                });
            }

            saveCart(cart);
            showNotification('Added to cart successfully!', 'success');
        });
    });

    document.querySelectorAll<HTMLElement>('.product-card-wrapper [data-wishlist-id]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const productId = this.getAttribute('data-wishlist-id');
            const wishlist = getWishlist();

            if (wishlist.some((item: any) => item.id === productId)) {
                showNotification('Already in wishlist!', 'info');
                return;
            }

            wishlist.push({
                id: productId,
                title: this.getAttribute('data-product-title'),
                price: this.getAttribute('data-product-price'),
                image: this.getAttribute('data-product-image'),
                description: '',
                color: null,
                url: this.getAttribute('data-product-url')
            });
            saveWishlist(wishlist);
            showNotification('Added to wishlist!', 'success');
        });
    });

    // ===== SCHEDULE TABS (Product Info Tabs) =====
    const productTabs = document.querySelector('.product-detail-tabs');
    const scheduleTabs = productTabs?.querySelectorAll<HTMLElement>('.schedule-tab') ?? [];
    const schedulePanels = productTabs?.querySelectorAll<HTMLElement>('.schedule-panel') ?? [];

    if (scheduleTabs.length > 0) {
        scheduleTabs.forEach(tab => {
            tab.addEventListener('click', function(this: HTMLElement, e: Event) {
                e.preventDefault();
                const target = this.getAttribute('data-target');

                scheduleTabs.forEach(t => {
                    const isActive = t === this;
                    t.classList.toggle('active', isActive);
                    t.classList.toggle('is-active', isActive);
                    t.setAttribute('aria-selected', String(isActive));
                });

                schedulePanels.forEach(panel => {
                    panel.classList.add('hidden');
                });

                const targetPanel = target ? productTabs?.querySelector<HTMLElement>(target) : null;
                if (targetPanel) {
                    targetPanel.classList.remove('hidden');
                }
            });
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductDetailPage);
} else {
    initProductDetailPage();
}

document.addEventListener('astro:page-load', initProductDetailPage);
