import { docs } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { i18n } from '@/lib/i18n';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  i18n,
  plugins: [],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const locale = page.locale ?? i18n.defaultLanguage;
  const segments = [...page.slugs, 'image.webp'];

  return {
    locale,
    segments,
    url: `/og/${locale}/docs/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
