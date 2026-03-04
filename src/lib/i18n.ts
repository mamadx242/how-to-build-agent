import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'zh',
  languages: ['zh', 'en'],
  hideLocale: 'never',
  parser: 'dir',
});

export type Language = (typeof i18n.languages)[number];

export function isLanguage(value: string): value is Language {
  return i18n.languages.includes(value as Language);
}
