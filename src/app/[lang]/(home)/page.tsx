import { isLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface HomePageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  const copy =
    lang === 'zh'
      ? {
          title: 'Agent 工程文档',
          description: '从 0 到 1 搭建并持续迭代一个可运行、可维护的 Agent。',
          cta: '开始阅读文档',
        }
      : {
          title: 'Agent Engineering Docs',
          description: 'Build, ship, and iterate an Agent system from zero to production.',
          cta: 'Read the docs',
        };

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="text-3xl font-bold">{copy.title}</h1>
      <p className="max-w-2xl text-sm text-fd-muted-foreground sm:text-base">{copy.description}</p>
      <Link
        href={`/${lang}/docs`}
        className="rounded-lg border border-fd-border px-4 py-2 text-sm font-medium hover:bg-fd-accent/40"
      >
        {copy.cta}
      </Link>
    </main>
  );
}
