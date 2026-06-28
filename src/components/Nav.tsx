import type { FeedArticle } from '../data/feeds';
import { timeAgo } from '../lib/rss';

interface NavProps {
  feedCount: number;
  readyCount: number;
  loading: boolean;
  onRefresh: () => void;
}

export function Nav({ feedCount, readyCount, loading, onRefresh }: NavProps) {
  return (
    <nav className="sticky top-0 z-50 bg-lab-void/90 backdrop-blur-md border-b border-lab-border/40">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="font-display font-bold text-white text-sm tracking-wider">
            IT<span className="text-lab-cyan">PULSE</span>
          </div>
          <span className="hidden sm:inline text-[10px] font-mono text-gray-600 border-l border-lab-border pl-3">
            Live infrastructure news
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-gray-500">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                loading ? 'bg-lab-amber animate-pulse' : 'bg-lab-green'
              }`}
            />
            {loading ? 'Syncing feeds…' : `${readyCount}/${feedCount} feeds live`}
          </div>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="px-3 py-1.5 rounded-md text-xs font-mono border border-lab-border text-lab-cyan hover:bg-lab-cyan/10 disabled:opacity-50 transition-colors"
          >
            {loading ? '↻ Syncing…' : '↻ Refresh'}
          </button>
        </div>
      </div>
    </nav>
  );
}

interface HeroProps {
  articles: FeedArticle[];
  lastRefresh: Date | null;
  totalArticles: number;
}

export function Hero({ articles, lastRefresh, totalArticles }: HeroProps) {
  const ticker = articles.slice(0, 6);

  return (
    <header className="border-b border-lab-border/30 bg-lab-deep/40">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lab-cyan/30 bg-lab-cyan/5 text-lab-cyan text-[10px] font-mono mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-lab-green animate-pulse" />
              LIVE RSS FEEDS · AUTO-REFRESH 5 MIN
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
              Infrastructure <span className="text-lab-cyan lab-glow-text">News Wire</span>
            </h1>
            <p className="text-gray-500 text-sm max-w-xl">
              Real-time headlines from vendor blogs and IT news — Windows, VMware,
              CrowdStrike, Cisco UCS, PowerShell, Ansible, GitHub, and 30+ sources.
            </p>
          </div>
          <div className="flex gap-4">
            <Stat label="Articles loaded" value={String(totalArticles)} />
            <Stat
              label="Last sync"
              value={
                lastRefresh
                  ? lastRefresh.toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '—'
              }
            />
          </div>
        </div>

        {ticker.length > 0 && (
          <div className="lab-panel overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-lab-border/40 bg-lab-void/40">
              <span className="text-[10px] font-mono text-lab-amber uppercase tracking-wider">
                Breaking
              </span>
            </div>
            <div className="divide-y divide-lab-border/30">
              {ticker.map((a) => (
                <a
                  key={a.id}
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 px-4 py-3 hover:bg-lab-cyan/5 transition-colors group"
                >
                  <span
                    className="shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                    style={{ backgroundColor: a.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-gray-200 group-hover:text-lab-cyan transition-colors line-clamp-1">
                      {a.title}
                    </span>
                    <span className="text-[10px] font-mono text-gray-600">
                      {a.sourceName} · {timeAgo(a.published)}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="lab-panel px-4 py-3 text-center min-w-[100px]">
      <div className="font-display text-xl font-bold text-lab-cyan">{value}</div>
      <div className="text-[9px] font-mono text-gray-600 uppercase tracking-wider">{label}</div>
    </div>
  );
}
