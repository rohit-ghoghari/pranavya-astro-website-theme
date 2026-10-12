import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

export const retreatsCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/retreats" }),

    schema: z.object({
        title: z.string(),
        slug: z.string(),

        hero: z.object({
            title: z.string(),
            description: z.string(),
        }),

        image: z.object({
            src: z.string(),
            alt: z.string(),
        }),

        meta: z.object({
            date: z.string(),
            price: z.string(),
            eventType: z.string(),
        }),

        programDescription: z.object({
            title: z.string(),
            description: z.string(),
        }),

        programOffers: z.object({
            title: z.string(),
            items: z.array(z.string()),
        }),

        experience: z.object({
            title: z.string(),
            intro: z.string().optional(),
            items: z.array(z.string()),
        }),

        welcome: z.object({
            title: z.string(),
            description: z.string(),
        }),

        sidebar: z.object({
            title: z.string(),
            image: z.object({
                src: z.string(),
                alt: z.string(),
            }),
            mapUrl: z.string(),
            address: z.string(),
            phone: z.string(),
            phoneHref: z.string(),
            bookButtonHref: z.string(),
            bookButtonText: z.string(),
            socials: z.object({
                instagram: z.string().default("https://www.instagram.com/"),
                twitter: z.string().default("https://x.com/?lang=en"),
                facebook: z.string().default("https://www.facebook.com/"),
                youtube: z.string().default("https://www.youtube.com/"),
            }),
        }),

        metaDescription: z.string().optional(),
    }),
});
