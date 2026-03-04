'use client';
import SearchDialog from '@/components/search';
import { i18n, isLanguage, type Language } from '@/lib/i18n';
import { i18nUI } from '@/lib/i18n-ui';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';

function getLocaleFromPathname(pathname: string | null): Language {
  if (!pathname) return i18n.defaultLanguage;

  const [firstSegment] = pathname.split('/').filter(Boolean);
  return firstSegment && isLanguage(firstSegment) ? firstSegment : i18n.defaultLanguage;
}

export function Provider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  return (
    <RootProvider search={{ SearchDialog }} i18n={i18nUI.provider(locale)}>
      {children}
    </RootProvider>
  );
}
