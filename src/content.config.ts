import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const research = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string().default('Aayush Bankar'),
    category: z.enum([
      'Kernel & Exploitation',
      'Android Internals',
      'Verifiable Systems',
      'AI Engineering',
    ]),
    tags: z.array(z.string()),
    cveId: z.string().optional(),
    verifiableLedgerUrl: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { research };
