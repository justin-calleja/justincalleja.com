import { SITE } from "@config";
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const myGlob = () => {
  const x = glob({ pattern: "**/*.mdx", base: "./src/data/blog" });
  // x.load
  return x;
};

const blog = defineCollection({
  type: "content",
  // type: "content_layer",
  // By default the ID is a slug generated from
  // the path of the file relative to `base`
  // loader: glob({ pattern: "**/*.mdx", base: "./src/data/blog" }),
  // loader: myGlob(),

  // loader: glob({ pattern: "**/*.mdx", base: "./src/data/blog" }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author).optional(),
      publishDate: z.date(),
      lastUpdateDate: z.date().optional().nullable(),
      title: z.string(),
      // slug: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string().optional(),
      canonicalURL: z.string().optional(),
      editPost: z
        .object({
          disabled: z.boolean().optional(),
          url: z.string().optional(),
          text: z.string().optional(),
          appendFilePath: z.boolean().optional(),
        })
        .optional(),
    }),
});

export const collections = { blog };
