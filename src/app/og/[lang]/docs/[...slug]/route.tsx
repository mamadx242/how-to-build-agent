import { source } from '@/lib/source';
import { i18n, isLanguage } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { ImageResponse } from '@takumi-rs/image-response';
import { generate as DefaultImage } from 'fumadocs-ui/og/takumi';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/[lang]/docs/[...slug]'>) {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) notFound();

  const page = source.getPage(slug.slice(0, -1), lang);
  if (!page) notFound();

  return new ImageResponse(
    <DefaultImage title={page.data.title} description={page.data.description} site="How To Build Agent" />,
    {
      width: 1200,
      height: 630,
      format: 'webp',
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale ?? i18n.defaultLanguage,
    slug: [...page.slugs, 'image.webp'],
  }));
}
