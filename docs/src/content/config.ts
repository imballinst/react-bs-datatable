import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ schema: docsSchema() })
  // TODO: uncomment when we have i18n
  // i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
};
