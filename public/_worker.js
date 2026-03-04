function shouldUseChinese(acceptLanguage) {
  if (!acceptLanguage) return false;

  const normalized = acceptLanguage.toLowerCase();
  return normalized.includes('zh');
}

function isMarkdownPreferred(request) {
  const accept = request.headers.get('accept')?.toLowerCase() ?? '';
  if (!accept) return false;

  return (
    accept.includes('text/markdown') ||
    accept.includes('text/x-markdown') ||
    accept.includes('text/plain')
  );
}

function isDocsPath(pathname) {
  return /^\/(en|zh)\/docs(?:\/.*)?$/.test(pathname);
}

function isDocsMdxPath(pathname) {
  return /^\/(en|zh)\/docs(?:\/.*)?\.mdx$/.test(pathname);
}

function toLlmsMdxPath(pathname) {
  const pathWithoutExt = pathname.endsWith('.mdx') ? pathname.slice(0, -4) : pathname;
  const segments = pathWithoutExt.split('/').filter(Boolean);
  const [lang, section, ...slugs] = segments;

  if (!lang || section !== 'docs') return null;

  if (slugs.length === 0) return `/llms.mdx/${lang}/docs/index.mdx`;
  return `/llms.mdx/${lang}/docs/${slugs.join('/')}/index.mdx`;
}

function rewriteRequest(request, url, pathname) {
  const rewrittenUrl = new URL(pathname, url);
  rewrittenUrl.search = url.search;
  return new Request(rewrittenUrl, request);
}

async function fetchMarkdownAsset(env, request, varyAccept) {
  const response = await env.ASSETS.fetch(request);
  const headers = new Headers(response.headers);
  headers.set('content-type', 'text/markdown; charset=utf-8');

  if (varyAccept) {
    headers.append('vary', 'Accept');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === '/') {
      const acceptLanguage = request.headers.get('accept-language');
      const target = shouldUseChinese(acceptLanguage) ? '/zh/docs' : '/en/docs';

      return new Response(null, {
        status: 307,
        headers: {
          location: new URL(target, url).toString(),
          vary: 'Accept-Language',
        },
      });
    }

    if (pathname === '/en') {
      return Response.redirect(new URL('/en/docs', url), 307);
    }

    if (pathname === '/zh') {
      return Response.redirect(new URL('/zh/docs', url), 307);
    }

    if (isDocsMdxPath(pathname)) {
      const rewrittenPath = toLlmsMdxPath(pathname);
      if (rewrittenPath) {
        return fetchMarkdownAsset(env, rewriteRequest(request, url, rewrittenPath), false);
      }
    }

    if (
      (request.method === 'GET' || request.method === 'HEAD') &&
      isDocsPath(pathname) &&
      isMarkdownPreferred(request)
    ) {
      const rewrittenPath = toLlmsMdxPath(pathname);
      if (rewrittenPath) {
        return fetchMarkdownAsset(env, rewriteRequest(request, url, rewrittenPath), true);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
