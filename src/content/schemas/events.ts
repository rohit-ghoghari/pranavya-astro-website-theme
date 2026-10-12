import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

export const eventsCollection = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/events",
    }),

    schema: z.object({
        title: z.string(),
        slug: z.string(),

        hero: z.object({
            title: z.string(),
            description: z.string(),
        }),

        event: z.object({
            date: z.string(),
            time: z.string(),
            location: z.string(),
            participants: z.string(),
        }),

        video: z.object({
            poster: z.string(),
            source: z.string(),
        }),

        about: z.object({
            title: z.string(),
            description: z.string(),
        }),

        programHighlights: z.array(
            z.object({
                title: z.string(),
                description: z.string(),
            })
        ),

        highlightImage: z.object({
            src: z.string(),
            alt: z.string(),
        }),

        feedback: z.object({
            title: z.string(),
            items: z.array(
                z.object({
                    quote: z.string(),
                    author: z.string(),
                })
            ),
        }),

        organization: z.object({
            title: z.string(),
            team: z.array(
                z.object({
                    role: z.string(),
                    name: z.string(),
                    designation: z.string(),
                    description: z.string(),
                })
            ),
            supportTeam: z.object({
                title: z.string(),
                members: z.array(
                    z.object({
                        name: z.string(),
                        responsibility: z.string(),
                    })
                ),
                description: z.string(),
            }),
            participantExperience: z.object({
                title: z.string(),
                description: z.string(),
            }),
            keyTakeaways: z.object({
                title: z.string(),
                items: z.array(z.string()),
            }),
            conclusion: z.object({
                text: z.string(),
            }),
        }),
    }),
});
