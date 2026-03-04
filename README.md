# How To Build Agent Docs

基于 `Fumadocs + Next.js Static Export` 的双语文档站，目标部署平台为 Cloudflare Pages。

## 本地开发

```bash
pnpm install
pnpm dev
```

访问：

- `http://localhost:3000/zh/docs`
- `http://localhost:3000/en/docs`

## 项目结构

- `src/lib/source.ts`: Fumadocs `loader()` 入口，负责文档索引与路由映射。
- `src/lib/i18n.ts`: 双语配置（`zh` / `en`）。
- `src/app/[lang]/docs`: 文档路由与页面渲染。
- `content/docs/zh` 与 `content/docs/en`: 双语 MDX 内容。
- `src/app/api/search/route.ts`: 静态搜索索引导出接口。

## 构建与检查

```bash
pnpm lint
pnpm typecheck
pnpm build
```

`pnpm build` 会输出静态站点到 `out/`，可直接用于 Cloudflare Pages。

## Cloudflare Pages 配置

- Framework preset: `None`
- Build command: `pnpm build`
- Build output directory: `out`
- Node version (env): `NODE_VERSION=22`
- Site URL (env): `NEXT_PUBLIC_SITE_URL=https://你的域名`

推荐打开 GitHub 自动部署：

- Push 到 `main` -> 生产环境部署
- Pull Request -> 预览环境部署

平台侧完整操作见：

- `docs/deploy/cloudflare-pages.md`
