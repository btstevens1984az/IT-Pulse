import { useMemo, useState } from 'react';
import { ParticleField } from './components/ParticleField';
import { Nav, Hero } from './components/Nav';
import { CategorySidebar } from './components/CategorySidebar';
import { ArticleCard, ArticleSkeleton } from './components/ArticleCard';
import { useFeedAggregator } from './hooks/useFeedAggregator';
import { getCategoryMeta, type FeedCategory } from './data/feeds';

export default function App() {
  const [category, setCategory] = useState<FeedCategory>('all');
  const [search, setSearch] = useState('');

  const {
    articles,
    loading,
    sourceStatuses,
    lastRefresh,
    refresh,
    readyCount,
    totalSources,
  } = useFeedAggregator(category);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.sourceName.toLowerCase().includes(q)
    );
  }, [articles, search]);

  const meta = getCategoryMeta(category);

  return (
    <div className="relative min-h-screen grid-bg">
      <ParticleField />

      <div className="relative z-10">
        <Nav
          feedCount={totalSources}
          readyCount={readyCount}
          loading={loading}
          onRefresh={refresh}
        />
        <Hero
          articles={articles}
          lastRefresh={lastRefresh}
          totalArticles={articles.length}
        />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <CategorySidebar
              active={category}
              onSelect={setCategory}
              sourceStatuses={sourceStatuses}
              search={search}
              onSearchChange={setSearch}
            />

            <main className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-white">{meta.label}</h2>
                  <p className="text-xs text-gray-500 mt-1">{meta.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] font-mono text-gray-600">
                    {filtered.length} article{filtered.length !== 1 ? 's' : ''}
                  </div>
                  <div className="text-[10px] font-mono text-lab-green">
                    {readyCount}/{totalSources} feeds online
                  </div>
                </div>
              </div>

              {loading && articles.length === 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <ArticleSkeleton key={i} />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="lab-panel p-12 text-center">
                  <p className="text-gray-500 text-sm mb-2">
                    {search ? 'No articles match your search.' : 'No articles loaded yet.'}
                  </p>
                  {!search && (
                    <button
                      onClick={refresh}
                      className="text-sm text-lab-cyan hover:underline font-mono"
                    >
                      Retry feed sync
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}

              {loading && articles.length > 0 && (
                <div className="mt-4 text-center text-[10px] font-mono text-lab-amber animate-pulse">
                  Updating feeds in background…
                </div>
              )}
            </main>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-lab-border/30 py-8 px-6 mt-8">
      <div className="max-w-[1600px] mx-auto text-center">
        <p className="font-display text-sm text-white mb-1">
          IT<span className="text-lab-cyan">Pulse</span>
        </p>
        <p className="text-[10px] font-mono text-gray-600 mb-4">
          Live RSS from 30+ vendor blogs & IT news sources · Auto-refresh every 5 min
        </p>
        <p className="text-[10px] font-mono text-gray-700">
          Articles link to original publishers. IT Pulse does not host content.
        </p>
      </div>
    </footer>
  );
}
