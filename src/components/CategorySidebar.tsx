import { categories, type FeedCategory } from '../data/feeds';
import type { SourceStatus } from '../hooks/useFeedAggregator';
import { feedSources } from '../data/feeds';

interface CategorySidebarProps {
  active: FeedCategory;
  onSelect: (cat: FeedCategory) => void;
  sourceStatuses: Record<string, SourceStatus>;
  search: string;
  onSearchChange: (q: string) => void;
}

export function CategorySidebar({
  active,
  onSelect,
  sourceStatuses,
  search,
  onSearchChange,
}: CategorySidebarProps) {
  const countForCategory = (cat: FeedCategory) => {
    if (cat === 'all') return feedSources.length;
    return feedSources.filter((f) => f.category === cat).length;
  };

  const liveForCategory = (cat: FeedCategory) => {
    const sources =
      cat === 'all' ? feedSources : feedSources.filter((f) => f.category === cat);
    return sources.filter((s) => sourceStatuses[s.id]?.status === 'ready').length;
  };

  return (
    <aside className="w-full lg:w-56 shrink-0 space-y-4">
      <div>
        <label className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2 block">
          Search headlines
        </label>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter articles…"
          className="w-full h-9 px-3 rounded-md bg-lab-panel border border-lab-border text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-lab-cyan/50"
        />
      </div>

      <div>
        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2 px-1">
          Categories
        </div>
        <nav className="space-y-0.5">
          {categories.map((cat) => {
            const isActive = active === cat.id;
            const total = countForCategory(cat.id);
            const live = liveForCategory(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left text-sm transition-colors ${
                  isActive
                    ? 'bg-lab-cyan/15 text-lab-cyan border border-lab-cyan/30'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-lab-panel border border-transparent'
                }`}
              >
                <span className="font-mono text-xs w-4 text-center opacity-60">{cat.icon}</span>
                <span className="flex-1 truncate">{cat.label}</span>
                <span className="text-[10px] font-mono text-gray-600">
                  {live}/{total}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <FeedHealthPanel sourceStatuses={sourceStatuses} active={active} />
    </aside>
  );
}

function FeedHealthPanel({
  sourceStatuses,
  active,
}: {
  sourceStatuses: Record<string, SourceStatus>;
  active: FeedCategory;
}) {
  const sources =
    active === 'all'
      ? feedSources
      : feedSources.filter((f) => f.category === active);

  return (
    <div className="lab-panel p-3 hidden lg:block">
      <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2">
        Feed Status
      </div>
      <ul className="space-y-1.5 max-h-48 overflow-y-auto">
        {sources.map((src) => {
          const st = sourceStatuses[src.id];
          return (
            <li key={src.id} className="flex items-center gap-2 text-[10px] font-mono">
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  st?.status === 'ready'
                    ? 'bg-lab-green'
                    : st?.status === 'loading'
                      ? 'bg-lab-amber animate-pulse'
                      : st?.status === 'error'
                        ? 'bg-red-500'
                        : 'bg-gray-700'
                }`}
              />
              <span className="text-gray-500 truncate flex-1">{src.name}</span>
              {st?.status === 'ready' && (
                <span className="text-gray-700">{st.articleCount}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
