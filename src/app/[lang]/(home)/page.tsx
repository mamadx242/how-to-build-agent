import { isLanguage } from '@/lib/i18n';
import { notFound, redirect } from 'next/navigation';

interface HomePageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  redirect(`/${lang}/docs`);
}
