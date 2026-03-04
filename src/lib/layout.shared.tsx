import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n, type Language } from '@/lib/i18n';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'KieSun',
  repo: 'how-to-build-agent',
  branch: 'main',
};

export function baseOptions(lang: Language): BaseLayoutProps {
  return {
    i18n,
    nav: {
      title: 'How To Build Agent',
      url: `/${lang}`,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
