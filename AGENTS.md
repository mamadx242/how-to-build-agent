# AGENTS.md

## 项目概览

本项目是一个基于 Fumadocs 的双语文档站，使用 Next.js 静态导出，部署在 Cloudflare Pages。

当前线上目标：

- 根路由 `/` 自动按浏览器语言跳转到中文或英文文档
- 英文文档路径：`/en/docs`
- 中文文档路径：`/zh/docs`
- 支持 LLM 读取入口：`/llms.txt`、`/llms-full.txt`、`/en/docs/*.mdx`、`/zh/docs/*.mdx`

## 当前技术栈

- 运行时与语言
  - Node.js 22（部署环境）
  - TypeScript 5.9

- 前端与框架
  - Next.js 16.1.6（App Router）
  - React 19.2.4
  - `next.config.mjs` 使用 `output: 'export'`（静态导出）

- 文档系统
  - `fumadocs-core` 16.6.9
  - `fumadocs-ui` 16.6.9
  - `fumadocs-mdx` 14.2.9
  - 文档源目录：`content/docs/zh`、`content/docs/en`

- 样式与 UI
  - Tailwind CSS 4
  - `lucide-react`

- 搜索与 LLM
  - `@orama/orama`（静态搜索）
  - LLM 相关路由：`/llms.txt`、`/llms-full.txt`、`/llms.mdx/...`

- 国际化
  - 语言：`zh`、`en`
  - Fumadocs i18n + UI i18n provider
  - 语言切换由 Fumadocs 内置组件提供

## 关键目录

- `src/app/[lang]/docs`：文档页面路由
- `src/lib/source.ts`：Fumadocs source loader 与 LLM 文本生成
- `src/lib/i18n.ts`：i18n 配置
- `src/lib/i18n-ui.ts`：Fumadocs UI 多语言显示文案
- `public/_worker.js`：Cloudflare Pages Functions（语言跳转与 LLM 重写）
- `docs/deploy/cloudflare-pages.md`：部署说明

## 本地开发与检查

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
```

## 部署方式（Cloudflare Pages）

### 方式一：Git 自动部署（推荐）

在 Cloudflare Pages 配置：

- Framework preset: `None`
- Build command: `pnpm build`
- Build output directory: `out`
- Environment variables:
  - `NODE_VERSION=22`
  - `NEXT_PUBLIC_SITE_URL=https://你的域名`

生产分支：`main`。

### 方式二：本地手动部署

```bash
pnpm build
pnpm dlx wrangler@latest pages deploy out --project-name=learn-agent-docs --branch=main --commit-dirty=true
```

说明：

- `--project-name` 为当前 Pages 项目名（当前为 `learn-agent-docs`）
- `--branch=main` 会部署到 Production 环境

## 当前 Worker 行为（public/_worker.js）

- 路径跳转
  - `/`：根据 `Accept-Language` 跳转到 `/zh/docs` 或 `/en/docs`
  - `/zh` -> `/zh/docs`
  - `/en` -> `/en/docs`

- LLM 重写与内容协商
  - `/en/docs/*.mdx`、`/zh/docs/*.mdx` 重写到内部 `llms.mdx` 资源
  - 当请求 `/en/docs/*` 或 `/zh/docs/*` 且 `Accept` 包含 `text/markdown`、`text/x-markdown` 或 `text/plain` 时，返回 markdown 内容
  - markdown 响应头为 `Content-Type: text/markdown; charset=utf-8`

## 快速验收

```bash
curl -I https://你的域名/
curl -I -H 'Accept-Language: zh-CN,zh;q=0.9' https://你的域名/
curl -I https://你的域名/en/docs/getting-started.mdx
curl -I -H 'Accept: text/markdown' https://你的域名/en/docs/getting-started
curl -I https://你的域名/llms-full.txt
```
