import type { FeedArticle } from '../data/feeds';
import { timeAgo } from '../lib/rss';

interface ArticleCardProps {
  article: FeedArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="lab-panel block p-5 hover:border-lab-cyan/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.08)] transition-all group h-full"
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: article.color }}
        />
        <span className="text-[10px] font-mono text-gray-500 truncate">
          {article.sourceName}
        </span>
        <span className="text-[10px] font-mono text-gray-700 ml-auto shrink-0">
          {timeAgo(article.published)}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-white group-hover:text-lab-cyan transition-colors leading-snug mb-2 line-clamp-2">
        {article.title}
      </h3>

      {article.excerpt && (
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>
      )}

      <div className="mt-4 text-[10px] font-mono text-lab-cyan/60 group-hover:text-lab-cyan transition-colors">
        Read article →
      </div>
    </a>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="lab-panel p-5 animate-pulse">
      <div className="h-2 w-24 bg-lab-border/50 rounded mb-4" />
      <div className="h-4 w-full bg-lab-border/40 rounded mb-2" />
      <div className="h-4 w-3/4 bg-lab-border/30 rounded mb-4" />
      <div className="h-3 w-full bg-lab-border/20 rounded mb-1" />
      <div className="h-3 w-5/6 bg-lab-border/20 rounded" />
    </div>
  );
}
