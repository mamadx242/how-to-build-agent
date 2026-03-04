import { i18n, isLanguage } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

interface LangLayoutProps {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  return children;
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
