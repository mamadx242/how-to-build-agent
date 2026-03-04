# Cloudflare Pages 部署说明

本文档对应当前仓库的静态构建配置（`pnpm build` 输出 `out/`）。

## 1. 创建 Pages 项目

1. 登录 Cloudflare 控制台。
2. 打开 `Workers & Pages` -> `Create` -> `Pages`。
3. 选择 `Connect to Git` 并授权 GitHub。
4. 选择仓库：`KieSun/how-to-build-agent`。
5. 生产分支选择：`main`。

## 2. 构建配置

按以下参数填写：

- Framework preset: `None`
- Build command: `pnpm build`
- Build output directory: `out`

环境变量：

- `NODE_VERSION=22`
- `NEXT_PUBLIC_SITE_URL=https://你的域名`

保存并触发首次部署。

## 3. 自定义域名（根域名）

1. 在 Pages 项目内打开 `Custom domains`。
2. 添加根域名（例如 `example.com`）。
3. 按提示自动创建/更新 DNS 记录（域名已托管在 Cloudflare 时可自动完成）。
4. 等待证书状态变为 `Active`。

## 4. 发布策略

- 推送到 `main`：自动发布 Production。
- Pull Request：自动生成 Preview。

建议在 GitHub 分支保护中要求 `CI` 通过后再合并。

## 5. 上线验收清单

- `https://你的域名/` 可访问并显示语言入口。
- `https://你的域名/zh/docs` 可访问。
- `https://你的域名/en/docs` 可访问。
- 页面检索可用（搜索弹窗可返回结果）。
- 随机文档页和 404 页行为正常。
