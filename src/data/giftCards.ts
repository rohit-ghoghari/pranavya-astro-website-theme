export interface GiftCard {
    id: number;
    banner: string;
    sideImage?: string;

    eyebrow: string;
    title: string;
    description: string;

    buttonText: string;
    buttonHref: string;

    code: string;

    background?: string;
    bannerClass?: string;
    bannerOpacity?: string;
    bannerExtraClass?: string;

    type: "featured" | "tranquil" | "inner-glow" | "harmony" | "serenity";

    redeemableItems?: string[];
    bottomText?: string;
    sideBottomText?: string;

    whiteText?: boolean;
}

export const defaultGiftCards: GiftCard[] = [
    {
        id: 1,
        type: "featured",
        banner: "/gift-card-banner-1.webp",
        sideImage: "/gift-card-side-1.webp",
        eyebrow: "Gift Cards",
        title: "wellness. Gift flexibility.",
        description:
            "Give the gift of balance — yoga sessions, wellness gear, or class passes for every level.Perfect for birthdays, celebrations, or a simple “thinking of you.”",
        buttonText: "BUY GIFT CARDS",
        buttonHref: "/giftCard/",
        code: "TM-5827-YG",
        redeemableItems: [
            "Studio & Online Classes",
            "Private Sessions",
            "Wellness Merchandise",
            "Retreats & Workshops",
        ],
        sideBottomText: "Non-refundable. Terms apply.",
    },

    {
        id: 2,
        type: "tranquil",
        banner: "/gift-card-banner-2.webp",
        sideImage: "/gift-card-side-2.webp",
        eyebrow: "Tranquil Moments Gift Card",
        title: "Give Wellness That Lasts.",
        description:
            "Inspire calm and positivity with a gift that encourages mindful living and inner peace.",
        buttonText: "GET YOUR GIFT CARDS",
        buttonHref: "/giftCard/",
        code: "TM-5827-YG",
        redeemableItems: [
            "In-Studio & Online Yoga",
            "Personal Coaching",
            "Retreat Experiences",
            "Yoga Equipment",
        ],
        bottomText:
            "Valid across all locations. Non-refundable. Terms apply.",
    },

    {
        id: 3,
        type: "inner-glow",
        banner: "/gift-card-banner-3.webp",
        eyebrow: "Inner Glow Gift Card",
        title: "Shine from within.",
        description:
            "Give the experience of renewal — from energizing vinyasa flows to soothing restorative sessions and self-care gear.",
        buttonText: "BUY NOW",
        buttonHref: "/giftCard/",
        code: "IG-2315-HW",
        background: "#FFE2B9",
        bannerOpacity: "opacity-45",
        bannerExtraClass:
            "bg-blend-multiply md:object-[center_14%] sm:object-[center_center] object-[60%_center]",
        bottomText:
            "Valid online and in studio. Terms & conditions apply.",
    },

    {
        id: 4,
        type: "harmony",
        banner: "/gift-card-banner-4.webp",
        eyebrow: "Harmony Haven Gift Card",
        title: "Wellness wrapped with love.",
        description:
            "Celebrate mindfulness and movement with a flexible gift that nurtures body, mind, and soul.",
        buttonText: "BUY GIFT CARD",
        buttonHref: "/giftCard/",
        code: "MM-7642-YA",
        background: "#6B97D9",
        bannerOpacity: "opacity-65",
        bannerExtraClass:
            "bg-blend-multiply 1xl:object-[center_68%] md:object-[center_80%] object-[center_center]",
        bottomText:
            "Valid online and in studio. Terms & conditions apply.",
        whiteText: true,
    },

    {
        id: 5,
        type: "serenity",
        banner: "/gift-card-banner-5.webp",
        eyebrow: "Serenity Path Gift Card",
        title: "Guide someone toward inner peace.",
        description:
            "Support their wellness path with relaxing classes, rejuvenating retreats, and mindful essentials designed to restore balance.",
        buttonText: "PURCHASE GIFT CARD",
        buttonHref: "/giftCard/",
        code: "MM-7642-YA",
        background: "#FFF3EE",
        bannerOpacity: "opacity-17",
        bannerExtraClass: "sm:object-bottom",
        redeemableItems: [
            "Studio & Online Yoga",
            "Private Therapy Sessions",
            "Retreat Bookings",
            "Yoga Mats & Props",
        ],
        bottomText:
            "No cash value. Non-transferable. Terms apply.",
    },
];
