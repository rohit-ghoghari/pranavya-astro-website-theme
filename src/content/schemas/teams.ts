import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

export const teamsCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/team" }),

    schema: z.object({
        title: z.string(),
        slug: z.string(),
        metaDescription: z.string().optional(),

        hero: z.object({
            title: z.string(),
            description: z.string(),
            flowerImage: z.string().default("/flower-shape.svg"),
            flowerImageAlt: z.string().default("decor"),
        }),

        profile: z.object({
            name: z.string(),
            designation: z.string(),
            image: z.string(),
            imageAlt: z.string().default("team member"),
            aboutTitle: z.string(),
            aboutParagraphs: z.array(z.string()),
        }),

        background: z.object({
            title: z.string(),
            items: z.array(z.string()),
        }),

        featuredSpecialty: z.object({
            title: z.string(),
            quote: z.string(),
            description: z.string(),
            icon: z.string().default("/events-detail-true.svg"),
            iconAlt: z.string().default("true"),
        }),

        specialties: z.object({
            title: z.string(),
            items: z.array(
                z.object({
                    title: z.string(),
                    description: z.string(),
                })
            ),
        }),

        contact: z.object({
            title: z.string(),
            booking: z.object({
                label: z.string(),
                url: z.string(),
            }),
            privateSessions: z.object({
                title: z.string(),
                email: z.string(),
                emailHref: z.string(),
                phoneLabel: z.string().default("Phone"),
                phone: z.string(),
                phoneHref: z.string(),
            }),
        }),
    }),
});
