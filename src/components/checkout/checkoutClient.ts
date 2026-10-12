// ===== Checkout interactions (vanilla, mirrors original custom.js) =====
function initCheckout() {
    // --- Custom dropdowns ---
    document.querySelectorAll('.dropdown-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = btn.closest('.dropdown');
            const menu = dropdown?.querySelector('.dropdown-menu');
            const arrow = dropdown?.querySelector('.dropdown-arrow');
            document.querySelectorAll('.dropdown-menu').forEach((m) => { if (m !== menu) m.classList.remove('open'); });
            document.querySelectorAll('.dropdown-arrow').forEach((a) => { if (a !== arrow) a.classList.remove('rotate-180'); });
            menu?.classList.toggle('open');
            arrow?.classList.toggle('rotate-180');
        });
    });
    document.querySelectorAll('.dropdown-menu').forEach((menu) => {
        menu.addEventListener('click', (e) => e.stopPropagation());
    });
    document.querySelectorAll('.dropdown-item').forEach((item) => {
        item.addEventListener('click', () => {
            const dropdown = item.closest('.dropdown');
            const textEl = dropdown?.querySelector('.dropdown-text');
            const hiddenInput = dropdown?.querySelector<HTMLInputElement>("input[type='hidden']");
            const value = (item.textContent || '').trim();
            if (textEl) {
                textEl.textContent = value;
                textEl.classList.remove('text-thunder-100/50');
            }
            if (hiddenInput) {
                hiddenInput.value = value;
                hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
            dropdown?.querySelector('.dropdown-menu')?.classList.remove('open');
            dropdown?.querySelector('.dropdown-arrow')?.classList.remove('rotate-180');
        });
    });
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach((m) => m.classList.remove('open'));
        document.querySelectorAll('.dropdown-arrow').forEach((a) => a.classList.remove('rotate-180'));
    });

    // --- Ship to different address toggle (mirrors original behavior) ---
    const differentAddress = document.getElementById('different-address') as HTMLInputElement | null;
    const shippingDetail = document.querySelector<HTMLElement>('.shipping-detail');
    const setShippingRequired = (required: boolean) => {
        shippingDetail?.querySelectorAll('input').forEach((input) => {
            if (required) input.setAttribute('required', '');
            else input.removeAttribute('required');
        });
    };
    setShippingRequired(false);
    differentAddress?.addEventListener('change', () => {
        if (differentAddress.checked) {
            shippingDetail?.classList.remove('hidden');
            if (shippingDetail) {
                shippingDetail.animate(
                    [{ opacity: '0', transform: 'translateY(-6px)' }, { opacity: '1', transform: 'translateY(0)' }],
                    { duration: 150, easing: 'ease-out' }
                );
            }
            setShippingRequired(true);
        } else {
            shippingDetail?.classList.add('hidden');
            setShippingRequired(false);
        }
    });

    // --- Phone input: digits only, max 10 ---
    document.querySelectorAll<HTMLInputElement>('.phone-input').forEach((input) => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/g, '').substring(0, 10);
        });
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasted = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').substring(0, 10);
            input.value = pasted;
        });
        input.addEventListener('keypress', (e) => {
            if (e.key < '0' || e.key > '9' || input.value.length >= 10) e.preventDefault();
        });
    });

    // --- Totals (same math as Cart.astro: subtotal + 5% tax, YOGA20 = 20% off) ---
    const money = (n: number) => `$${n.toFixed(2)}`;
    const updateCheckoutTotals = () => {
        const subtotalEl = document.getElementById('checkoutSubtotal');
        const taxEl = document.getElementById('checkoutTax');
        const subTotal2El = document.getElementById('checkoutSubTotal2');
        const totalEl = document.getElementById('checkoutTotal');
        const discountEl = document.getElementById('checkoutDiscount');
        const discountRow = document.getElementById('checkoutDiscountRow');
        const discountLabel = document.getElementById('checkoutDiscountLabel');
        const chip = document.getElementById('checkoutCouponChip');
        const codeEl = document.getElementById('checkoutCouponCode');
        if (!subtotalEl || !taxEl || !subTotal2El || !totalEl) return;

        let subtotal = parseFloat((subtotalEl.textContent || '').replace(/[^0-9.]/g, '')) || 0;
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            if (Array.isArray(cart) && cart.length > 0) {
                subtotal = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
            }
        } catch (err) { /* keep static subtotal */ }

        const tax = subtotal * 0.05;
        const subtotalWithTax = subtotal + tax;
        const appliedCoupon = (localStorage.getItem('appliedCoupon') || 'YOGA20').toUpperCase();
        let discount = 0;
        let total = subtotalWithTax;
        if (appliedCoupon === 'YOGA20') {
            discount = subtotalWithTax * 0.20;
            total = subtotalWithTax - discount;
        }
        subtotalEl.textContent = money(subtotal);
        taxEl.textContent = money(tax);
        subTotal2El.textContent = money(subtotalWithTax);
        totalEl.textContent = money(total);
        if (discountEl) discountEl.textContent = money(discount);
        if (discountLabel) discountLabel.textContent = `Code Applied (${appliedCoupon})`;
        if (codeEl) codeEl.textContent = appliedCoupon;
        if (appliedCoupon === 'YOGA20') {
            discountRow?.classList.remove('hidden');
            chip?.classList.remove('hidden');
        } else {
            discountRow?.classList.add('hidden');
            chip?.classList.add('hidden');
        }
    };

    document.getElementById('checkoutCouponRemove')?.addEventListener('click', () => {
        localStorage.removeItem('appliedCoupon');
        updateCheckoutTotals();
    });
    document.getElementById('checkoutCouponSubmit')?.addEventListener('click', () => {
        console.log("Coupon submitted:", {
            coupon: "YOGA20"
        });
        localStorage.setItem('appliedCoupon', 'YOGA20');
        updateCheckoutTotals();
    });

    document.getElementById('placeOrderBtn')?.addEventListener('click', (e) => {
        e.preventDefault();

        const getValue = (name: string, scope: Element | null) =>
            (scope?.querySelector<HTMLInputElement>(`[name="${name}"]`)?.value || '').trim();

        const billDetail = document.querySelector('.bill-detail');
        const shippingDetail = document.querySelector('.shipping-detail');
        const differentAddress = document.getElementById('different-address') as HTMLInputElement | null;

        const invalid: HTMLInputElement[] = [];
        const checkField = (el: HTMLInputElement) => {
            if (el && !el.checkValidity()) invalid.push(el);
        };

        billDetail?.querySelectorAll<HTMLInputElement>('input[required]').forEach(checkField);

        if (differentAddress?.checked) {
            shippingDetail?.querySelectorAll<HTMLInputElement>('input[required]').forEach(checkField);
        }

        if (invalid.length > 0) {
            invalid[0].reportValidity();
            return;
        }

        const shipping_address = differentAddress?.checked
            ? {
                address: getValue('address', shippingDetail),
                country: getValue('country', shippingDetail),
                state: getValue('state', shippingDetail),
                city: getValue('city', shippingDetail),
                pincode: getValue('pincode', shippingDetail),
            }
            : null;

        const checkoutData = {
            first_name: getValue('first_name', billDetail),
            last_name: getValue('last_name', billDetail),
            phone: getValue('phone', billDetail),
            email: getValue('email', billDetail),
            address: getValue('address', billDetail),
            country: getValue('country', billDetail),
            state: getValue('state', billDetail),
            city: getValue('city', billDetail),
            pincode: getValue('pincode', billDetail),
            different_address: !!differentAddress?.checked,
            shipping_address: shipping_address,
            payment: document.querySelector<HTMLInputElement>('input[name="payment"]:checked')?.value || '',
            subtotal: document.getElementById('checkoutSubtotal')?.textContent?.trim() || '',
            tax: document.getElementById('checkoutTax')?.textContent?.trim() || '',
            discount: document.getElementById('checkoutDiscount')?.textContent?.trim() || '',
            total: document.getElementById('checkoutTotal')?.textContent?.trim() || '',
        };

        // Simulate order placement: persist a demo order, clear the cart, and redirect.
        const orderId = `PY-${Date.now().toString(36).toUpperCase()}`;
        try {
            sessionStorage.setItem('lastOrder', JSON.stringify({
                id: orderId,
                placedAt: new Date().toISOString(),
                ...checkoutData,
            }));
        } catch (err) { /* storage unavailable — still complete the demo flow */ }

        localStorage.removeItem('cart');
        localStorage.removeItem('appliedCoupon');

        window.location.href = '/thankYou/';
    });

    updateCheckoutTotals();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCheckout);
} else {
    initCheckout();
}
