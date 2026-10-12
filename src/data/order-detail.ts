
export const orderDetails = {
    number: "#1045",
    date: "03 December 2025",
    paymentMethod: "Credit Card (** 3271)**",
    totalAmount: "$476.00",
    status: "Confirmed",

    billingAddress: [
        ["Street Address", "108 Serenity Street"],
        ["City", "Bliss City"],
        ["State", "New York"],
        ["Country", "USA"],
        ["Pin Code", "10001"],
    ],

    shippingAddress: [
        ["Street Address", "204, Greenwoods Residency, Andheri West"],
        ["City", "Mumbai"],
        ["State", "Maharashtra"],
        ["Country", "India"],
        ["Pin Code", "400053"],
    ],

    products: [
        {
            name: "Manduka PRO Yoga Mat 6mm",
            image: "/product-1.webp",
            href: "/shop/manduka-pro-yoga-mat/",
            price: "$138.00",
            total: "$138.00",
            color: "#B4C7E2",
        },
        {
            name: "Buddha Teas Organic Calm Tea",
            image: "/product-2.webp",
            href: "/shop/buddha-teas-organic-calm-tea/",
            price: "$49.98",
            total: "$49.98",
            color: "#B4C7E2",
        },
        {
            name: "Gaiam Yoga Starter Kit",
            image: "/product-3.webp",
            href: "/shop/gaiam-yoga-starter-kit/",
            price: "$49.98",
            total: "$49.98",
            color: "#AC99CE",
        },
    ],

    giftCard: {
        name: "Wellness Gift Card",
        image: "/gift-card.webp",
        href: "/shop/wellness-gift-card/",
        code: "YOGA20",
        price: "$138.00",
        total: "$138.00",
    },

    productTableTotals: [
        ["Sub Total", "$228.96"],
        ["Shipping", "Free"],
        ["Total", "$228.96"],
    ],

    cartTotals: [
        ["Subtotal:", "$474.85"],
        ["Shipping:", "Free"],
        ["Tax (5%):", "$23.74"],
    ],

    cartSubtotal: "$498.59",
    discountLabel: "Code Applied (YOGA20)",
    discount: "$22.59",
    grandTotal: "$476.00",
};
