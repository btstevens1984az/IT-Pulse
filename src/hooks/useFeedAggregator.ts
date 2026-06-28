import { useCallback, useEffect, useRef, useState } from 'react';
import {
  feedSources,
  type FeedArticle,
  type FeedCategory,
  type FeedSource,
  getSourcesByCategory,
} from '../data/feeds';
import { fetchFeed, sortArticles } from '../lib/rss';

export type FeedStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface SourceStatus {
  sourceId: string;
  status: FeedStatus;
  error?: string;
  articleCount: number;
  lastFetched?: Date;
}

interface AggregatorState {
  articles: FeedArticle[];
  sourceStatuses: Record<string, SourceStatus>;
  lastRefresh: Date | null;
  loading: boolean;
}

const REFRESH_MS = 5 * 60 * 1000; // 5 minutes

export function useFeedAggregator(category: FeedCategory) {
  const [state, setState] = useState<AggregatorState>({
    articles: [],
    sourceStatuses: {},
    lastRefresh: null,
    loading: true,
  });

  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  const refresh = useCallback(async (sources?: FeedSource[]) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const targetSources = sources ?? getSourcesByCategory(category);

    setState((s) => ({
      ...s,
      loading: true,
      sourceStatuses: Object.fromEntries(
        targetSources.map((src) => [
          src.id,
          { sourceId: src.id, status: 'loading' as FeedStatus, articleCount: 0 },
        ])
      ),
    }));

    const results = await Promise.all(
      targetSources.map(async (source) => {
        const result = await fetchFeed(source, controller.signal);
        return { source, result };
      })
    );

    if (!mountedRef.current || controller.signal.aborted) return;

    const allArticles: FeedArticle[] = [];
    const sourceStatuses: Record<string, SourceStatus> = {};

    for (const { source, result } of results) {
      allArticles.push(...result.articles);
      sourceStatuses[source.id] = {
        sourceId: source.id,
        status: result.error ? 'error' : 'ready',
        error: result.error,
        articleCount: result.articles.length,
        lastFetched: new Date(),
      };
    }

    setState({
      articles: sortArticles(allArticles),
      sourceStatuses,
      lastRefresh: new Date(),
      loading: false,
    });
  }, [category]);

  useEffect(() => {
    mountedRef.current = true;
    refresh();

    const interval = setInterval(() => refresh(), REFRESH_MS);

    return () => {
      mountedRef.current = false;
      clearInterval(interval);
      abortRef.current?.abort();
    };
  }, [refresh]);

  const readyCount = Object.values(state.sourceStatuses).filter(
    (s) => s.status === 'ready'
  ).length;
  const totalSources = getSourcesByCategory(category).length;

  return {
    ...state,
    readyCount,
    totalSources,
    refresh: () => refresh(),
  };
}

export function useTickerArticles(articles: FeedArticle[], limit = 8): FeedArticle[] {
  return articles.slice(0, limit);
}

export { feedSources, getSourcesByCategory };
