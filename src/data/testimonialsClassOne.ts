export interface Testimonial {
    image: string;
    imageAlt?: string;
    eyebrow: string;
    title: string;
    quote: string;
    name: string;
    role: string;
    stars: ("full" | "half" | "empty")[];
}

export const defaultTestimonials: Testimonial[] = [
    {
        image: "/testimonials-1.webp",
        imageAlt: "client",
        eyebrow: "Stories of Transformation",
        title: "Wellness Journeys Shared",
        quote: '"Pranavya Yoga has become my safe space after long workdays. The calming environment and knowledgeable instructors make every session something I look forward to."',
        name: "Jason M. Carter",
        role: "– Interior Designer",
        stars: ["full", "full", "full", "half", "empty"],
    },
    {
        image: "/testimonials-2.webp",
        imageAlt: "client",
        eyebrow: "Voices from the Mat",
        title: "A PRACTICE FEELS PERSONAL",
        quote: "“Each session at Pranavya Yoga feels intentional and grounding.The instructors guide with clarity and care, creating a space where both body and mind can truly unwind.”",
        name: "Ananya Patel",
        role: "- Marketing Consultant",
        stars: ["full", "full", "full", "half", "empty"],
    },
    {
        image: "/testimonials-3.webp",
        imageAlt: "client",
        eyebrow: "Real Journeys, Real Balance",
        title: "BALANCE BEYOND THE MAT",
        quote: "“Pranavya Yoga became part of my weekly reset.The classes help me release stress, improve flexibility, and stay mentally clear—even during the busiest weeks.”",
        name: "Emily R. Thompson",
        role: "- Wellness Program Manager, California",
        stars: ["full", "full", "full", "half", "empty"],
    },
];
