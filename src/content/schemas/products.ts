import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

export const productsCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        sku: z.string(),
        skuDisplay: z.string().optional(),
        description: z.string().optional(),
        descriptionParagraphs: z.array(z.string()).optional(),
        shortDescription: z.string().optional(),
        price: z.string(),
        salePrice: z.string().optional(),
        discount: z.string().optional(),
        category: z.string(),
        brand: z.string().optional(),
        rating: z.number(),
        reviewCount: z.number(),
        reviewText: z.string().optional(),
        stock: z.string().default("In Stock"),
        images: z.object({
            main: z.string(),
            video: z.string().optional(),
            videoPoster: z.string().optional(),
            gallery: z.array(z.string()),
            thumbnail: z.array(z.string()).optional(),
        }),
        colors: z.array(z.object({
            name: z.string(),
            value: z.string(), // hex or color name
            image: z.string().optional(),
            default: z.boolean().optional(),
        })).optional(),
        sizes: z.array(z.object({
            name: z.string(),
            value: z.string(),
        })).optional(),
        features: z.array(z.string()),
        specifications: z.array(z.object({
            label: z.string(),
            value: z.string(),
        })),
        careInstructions: z.array(z.string()).optional(),
        careInstructionsIntro: z.string().optional(),
        shippingInfo: z.union([
            z.object({
                shipping: z.string(),
                returns: z.string(),
                guarantee: z.string().optional(),
                sustainabilityNote: z.string().optional(),
            }),
            z.array(z.object({
                label: z.string(),
                value: z.string(),
            }))
        ]).optional(),
        whatsIncluded: z.array(z.string()).optional(),
        tabs: z.object({
            description: z.string().optional(),
            specifications: z.boolean().default(true),
            careInstructions: z.boolean().default(false),
            shippingReturns: z.boolean().default(false),
        }).optional(),
        descriptionHeading: z.string().optional(),
        featuresHeading: z.string().optional(),
        specificationsHeading: z.string().optional(),
        careInstructionsHeading: z.string().optional(),
        whatsIncludedHeading: z.string().optional(),
        productOptionsHeading: z.string().optional(),
        addToCartText: z.string().optional(),
        wishlistText: z.string().optional(),
        discoverMoreHeading: z.string().optional(),
        relatedProducts: z.array(z.union([
            z.string(), // slugs
            z.object({
                title: z.string(),
                price: z.string(),
                image: z.string(),
                url: z.string(),
                colors: z.array(z.object({
                    value: z.string(),
                    default: z.boolean().optional(),
                })).optional(),
            })
        ])),
        metaDescription: z.string().optional(),
    }),
});
