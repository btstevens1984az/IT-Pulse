import type { FeedArticle, FeedSource } from '../data/feeds';

const IS_DEV = import.meta.env.DEV;

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
}

function parseDate(raw: string | null | undefined): Date | null {
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

function parseRss(xml: Document, source: FeedSource): FeedArticle[] {
  const items = xml.querySelectorAll('item, entry');
  const articles: FeedArticle[] = [];

  items.forEach((item, index) => {
    const title = item.querySelector('title')?.textContent?.trim();
    if (!title) return;

    const linkEl = item.querySelector('link[href]') ?? item.querySelector('link');
    const link =
      linkEl?.getAttribute('href') ??
      linkEl?.textContent?.trim() ??
      source.siteUrl;

    const pubRaw =
      item.querySelector('pubDate')?.textContent ??
      item.querySelector('published')?.textContent ??
      item.querySelector('updated')?.textContent;

    const descRaw =
      item.querySelector('description')?.textContent ??
      item.querySelector('summary')?.textContent ??
      item.querySelector('content\\:encoded')?.textContent ??
      '';

    const excerpt = stripHtml(descRaw).slice(0, 220);
    const published = parseDate(pubRaw ?? undefined);

    articles.push({
      id: `${source.id}-${index}-${link}`,
      title,
      link,
      excerpt: excerpt ? `${excerpt}${descRaw.length > 220 ? '…' : ''}` : '',
      published,
      sourceId: source.id,
      sourceName: source.name,
      category: source.category,
      color: source.color,
    });
  });

  return articles;
}

async function fetchFeedXml(url: string, signal: AbortSignal): Promise<string> {
  // Local Vite proxy (dev + preview) — most reliable
  if (IS_DEV || typeof window !== 'undefined') {
    try {
      const proxyUrl = `/api/rss?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxyUrl, { signal });
      if (res.ok) {
        const text = await res.text();
        if (text.trim().length > 0) return text;
      }
    } catch {
      // fall through
    }
  }

  // Direct fetch fallback (some feeds allow CORS)
  try {
    const direct = await fetch(url, {
      signal,
      headers: { Accept: 'application/rss+xml, application/xml, text/xml, */*' },
    });
    if (direct.ok) return await direct.text();
  } catch {
    // fall through
  }

  // Public CORS proxies as last resort
  const proxies = [
    (u: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    (u: string) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
  ];

  let lastError: Error | null = null;
  for (const proxyFn of proxies) {
    try {
      const res = await fetch(proxyFn(url), { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      if (text.trim().length > 0) return text;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  throw lastError ?? new Error('All fetch attempts failed');
}

function mergeSignals(a: AbortSignal, b: AbortSignal): AbortSignal {
  if (a.aborted || b.aborted) {
    const c = new AbortController();
    c.abort();
    return c.signal;
  }
  const controller = new AbortController();
  const abort = () => controller.abort();
  a.addEventListener('abort', abort, { once: true });
  b.addEventListener('abort', abort, { once: true });
  return controller.signal;
}

export interface FetchFeedResult {
  articles: FeedArticle[];
  error?: string;
}

export async function fetchFeed(
  source: FeedSource,
  signal?: AbortSignal
): Promise<FetchFeedResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  const combined = signal ? mergeSignals(signal, controller.signal) : controller.signal;

  try {
    const xmlText = await fetchFeedXml(source.url, combined);
    const doc = new DOMParser().parseFromString(xmlText, 'text/xml');

    if (doc.querySelector('parsererror')) {
      throw new Error('Invalid RSS/XML response');
    }

    const articles = parseRss(doc, source).slice(0, 12);
    return { articles };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Fetch failed';
    return { articles: [], error: message };
  } finally {
    clearTimeout(timeout);
  }
}

export function sortArticles(articles: FeedArticle[]): FeedArticle[] {
  return [...articles].sort((a, b) => {
    const ta = a.published?.getTime() ?? 0;
    const tb = b.published?.getTime() ?? 0;
    return tb - ta;
  });
}

export function timeAgo(date: Date | null): string {
  if (!date) return 'Unknown';
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
