import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { Language } from '@/lib/i18n';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'KieSun',
  repo: 'how-to-build-agent',
  branch: 'main',
};

export function baseOptions(lang: Language): BaseLayoutProps {
  return {
    nav: {
      title: 'How To Build Agent',
      url: `/${lang}`,
    },
    links: [
      { text: lang === 'zh' ? '文档首页' : 'Docs Home', url: `/${lang}/docs` },
      { text: '中文', url: '/zh/docs' },
      { text: 'English', url: '/en/docs' },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
