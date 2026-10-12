export interface ShopProduct {
    id: number;
    title: string;
    price: string;
    image: string;
    alt: string;
    category: string;
    brand: string;
    colors?: { value: string; selected?: boolean }[];
    listView?: {
        title: string;
        description: string;
        price: string;
    };
}

export const shopCatalog: ShopProduct[] = [
    {
        id: 1,
        title: "Manduka PRO Yoga Mat 6mm",
        price: "$138.00",
        image: "/product-1.webp",
        alt: "Yoga Mat",
        category: "Yoga Mats",
        brand: "Manduka",
        colors: [
            { value: "#7CD2E8" },
            { value: "#D19EF6" },
            { value: "#B4C7E2", selected: true },
        ],
        listView: {
            title: "Manduka PRO Yoga Mat 6mm",
            description: "Ultra-dense cushioning for superior joint protection and stability during practice.",
            price: "$138.00",
        },
    },
    {
        id: 2,
        title: "Buddha Teas Organic Calm Tea",
        price: "$49.98",
        image: "/product-2.webp",
        alt: "Yoga Mat",
        category: "Wellness",
        brand: "Buddha Teas",
        listView: {
            title: "Buddha Teas Organic Calm Tea",
            description: "A soothing herbal blend designed to relax the mind and body post-practice.",
            price: "$49.98",
        },
    },
    {
        id: 3,
        title: "Manduka PRO Yoga Kit",
        price: "$49.98",
        image: "/product-3.webp",
        alt: "Yoga Mat",
        category: "Yoga Props",
        brand: "Manduka",
        colors: [
            { value: "#AC99CE" },
            { value: "#A8D5A7" },
            { value: "#A7CDD5", selected: true },
        ],
        listView: {
            title: "Gaiam Yoga Starter Kit",
            description: "All-in-one beginner set with mat, block, and strap to support your journey.",
            price: "$49.98",
        },
    },
    {
        id: 4,
        title: 'Light on Yoga" by B.K.S. Iyengar',
        price: "$138.00",
        image: "/product-4.webp",
        alt: "Yoga Mat",
        category: "Books & Guides",
        brand: "",
        listView: {
            title: 'Light on Yoga" by B.K.S. Iyengar',
            description: "A timeless yoga guide offering deep insights into postures and philosophy.",
            price: "$17.99",
        },
    },
    {
        id: 5,
        title: "90 Degree by Reflex Leggings",
        price: "$24.99",
        image: "/product-5.webp",
        alt: "Yoga Mat",
        category: "Yoga Apparel",
        brand: "90 Degree by Reflex",
        colors: [
            { value: "#435F72" },
            { value: "#72434C" },
            { value: "#292832", selected: true },
        ],
        listView: {
            title: "90 Degree by Reflex Leggings",
            description: "A timeless yoga guide offering deep insights into postures and philosophy.",
            price: "$24.99",
        },
    },
    {
        id: 6,
        title: "Original Yoga Mat",
        price: "$140.00",
        image: "/product-6.webp",
        alt: "Yoga Mat",
        category: "Yoga Mats",
        brand: "",
        listView: {
            title: "Original Yoga Mat",
            description: "Lightweight and grippy mat ideal for daily home or studio practice.",
            price: "$140.00",
        },
    },
    {
        id: 7,
        title: "Gaiam Yoga Strap (8 ft)",
        price: "$10.98",
        image: "/product-7.webp",
        alt: "Yoga Mat",
        category: "Yoga Props",
        brand: "Gaiam",
        colors: [
            { value: "#8E9C9B" },
            { value: "#767985" },
            { value: "#969C8E", selected: true },
        ],
        listView: {
            title: "Gaiam Yoga Strap (8 ft)",
            description: "Durable strap to deepen stretches and enhance alignment in poses.",
            price: "$10.98",
        },
    },
    {
        id: 8,
        title: "Prosourcefit Yoga Wheel",
        price: "$138.00",
        image: "/product-8.webp",
        alt: "Yoga Mat",
        category: "Yoga Props",
        brand: "Prosourcefit",
        colors: [
            { value: "#DB5091" },
            { value: "#60D1AA" },
            { value: "#38ACC5", selected: true },
        ],
    },
    {
        id: 9,
        title: "Aura Cacia Chakra Roll-On Oils",
        price: "$14.99",
        image: "/product-9.webp",
        alt: "Yoga Mat",
        category: "Wellness",
        brand: "Aura Cacia",
    },
    {
        id: 10,
        title: "Gaiam Yoga Mat Towel",
        price: "$17.99",
        image: "/product-10.webp",
        alt: "Yoga Mat",
        category: "Accessories",
        brand: "Gaiam",
        colors: [
            { value: "#9D0B09" },
            { value: "#D5480D" },
            { value: "#0E5DCD", selected: true },
        ],
    },
    {
        id: 11,
        title: "wellness Gift Card",
        price: "$22.99",
        image: "/product-11.webp",
        alt: "Yoga Mat",
        category: "Gift Cards",
        brand: "",
    },
    {
        id: 12,
        title: "Manduka Cork Yoga Block",
        price: "$138.00",
        image: "/product-12.webp",
        alt: "Yoga Mat",
        category: "Yoga Props",
        brand: "Manduka",
    },
    {
        id: 13,
        title: "Yoga Backpack",
        price: "$75.00",
        image: "/product-13.webp",
        alt: "Yoga Mat",
        category: "Accessories",
        brand: "",
        colors: [
            { value: "#6B6B6B" },
            { value: "#0E1235" },
            { value: "#282627", selected: true },
        ],
    },
    {
        id: 14,
        title: "Stainless Steel Water Bottle",
        price: "$39.95",
        image: "/product-14.webp",
        alt: "Yoga Mat",
        category: "Accessories",
        brand: "",
        colors: [
            { value: "#7D5942" },
            { value: "#77427D" },
            { value: "#1C1B1B", selected: true },
        ],
    },
    {
        id: 15,
        title: "Studio Wrap Shoes",
        price: "$9.98",
        image: "/product-15.webp",
        alt: "Yoga Mat",
        category: "Yoga Apparel",
        brand: "",
        colors: [
            { value: "#C5C0B5" },
            { value: "#0E1235" },
            { value: "#33AAAE", selected: true },
        ],
    },
];

export const shopCategories = [
    { name: "Yoga Mats", count: 44 },
    { name: "Yoga Apparel", count: 56 },
    { name: "Yoga Props", count: 66 },
    { name: "Accessories", count: 45 },
    { name: "Wellness", count: 56 },
    { name: "Skincare", count: 33 },
    { name: "Books & Guides", count: 56 },
    { name: "Gift Cards", count: 33 },
];

export const shopBrands = [
    "Manduka",
    "Gaiam",
    "Lululemon",
    "Alo Yoga",
    "Jade Yoga",
    "Hugger Mugger",
    "Saje",
    "Athleta",
];

export const shopFilterColors = [
    "#B9AC39",
    "#53871D",
    "#8EC9E2",
    "#8EB0E2",
    "#9E8EE2",
    "#B78EE2",
    "#E28EDA",
    "#E28EA8",
    "#C54191",
    "#E28EC1",
];

export const shopPriceRanges = [
    { label: "$0 – $25", min: 0, max: 25 },
    { label: "$25 – $50", min: 25, max: 50 },
    { label: "$50 – $100", min: 50, max: 100 },
    { label: "$100 – $150", min: 100, max: 150 },
    { label: "$150+", min: 150, max: Number.POSITIVE_INFINITY },
];
