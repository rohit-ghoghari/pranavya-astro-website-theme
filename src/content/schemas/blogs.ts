import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

export const blogsCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        excerpt: z.string(),
        image: z.string(),
        date: z.string(),
        category: z.string(),
        tags: z.array(z.string()).default([]),
        author: z.string().default("Pranavya Yoga"),
        authorImage: z.string().default("/client-1.webp"),
        metaDescription: z.string().optional(),
    }),
});
