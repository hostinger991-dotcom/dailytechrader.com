import React from 'react';
import { Article } from '../types/article';
import { Clock, Calendar, ArrowRight, Bookmark, BookmarkCheck, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { resolveImageUrl } from '../utils/imageUtils';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (e: React.MouseEvent, articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked = false,
  onToggleBookmark
}) => {
  return (
    <article
      onClick={() => onSelect(article)}
      className="article-card-interactive group rounded-xl p-4 sm:p-5 cursor-pointer flex flex-col justify-between border border-[#5fdee7]/25 shadow-lg"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(article);
        }
      }}
    >
      <div>
        {/* Top Meta Bar: Date Badge (ke.com.pk news style) + Category + Bookmark */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-[#0b2721] text-[#ffcc00] border border-[#ffcc00]/40 group-hover:bg-[#ffcc00] group-hover:text-black transition-colors">
              {article.publishDate}
            </span>
            <span className="card-category-badge px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded border border-[#5fdee7]/30 bg-[#0b2721]/90 text-[#5fdee7] transition-all duration-300">
              {article.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#5fdee7] group-hover:text-[#ffcc00] transition-colors" />
              {article.readTime}
            </span>
            {onToggleBookmark && (
              <button
                onClick={(e) => onToggleBookmark(e, article.id)}
                className="p-1 rounded text-slate-400 hover:text-[#ffcc00] hover:bg-white/5 transition-colors cursor-pointer"
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
                aria-label="Bookmark article"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-[#ffcc00]" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Thumbnail Image with crisp border & hover zoom */}
        <div className="relative z-10 mb-3.5 rounded-lg overflow-hidden border border-[#5fdee7]/25 group-hover:border-[#ffcc00] transition-colors aspect-video bg-black/60 shadow-md">
          <img
            src={resolveImageUrl(article.imageSrc)}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              const filename = article.imageSrc.split('/').pop();
              if (filename && !target.src.endsWith(`/images/${filename}`)) {
                target.src = `/images/${filename}`;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono">
            <span className="px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[#5fdee7] group-hover:text-[#ffcc00] border border-white/10 font-bold transition-colors">
              INFOGRAPHIC #{article.infographic.promptNumber}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-slate-300 border border-white/10">
              6 PANELS
            </span>
          </div>
        </div>

        {/* Title & Excerpt */}
        <div className="relative z-10">
          <h3 className="card-title text-base sm:text-lg font-bold font-display text-white transition-all duration-300 line-clamp-2 leading-snug mb-2">
            {article.title}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-3 font-sans">
            {article.excerpt}
          </p>
        </div>

        {/* Specifications & Peer-Review Metric Strip */}
        <div className="relative z-10 grid grid-cols-2 gap-2 mb-3.5 p-2 rounded bg-black/40 border border-white/5 group-hover:border-[#ffcc00]/20 transition-colors">
          <div className="text-[10px] font-mono">
            <span className="text-slate-400 block truncate">Report Depth:</span>
            <span className="text-[#5fdee7] group-hover:text-[#ffcc00] font-bold transition-colors flex items-center gap-1">
              <FileText className="w-2.5 h-2.5" />
              {article.wordCount} words
            </span>
          </div>
          <div className="text-[10px] font-mono">
            <span className="text-slate-400 block truncate">Validation:</span>
            <span className="text-emerald-400 group-hover:text-[#ffd700] flex items-center gap-1 font-semibold transition-colors">
              <CheckCircle2 className="w-2.5 h-2.5" /> Lab Approved
            </span>
          </div>
        </div>
      </div>

      {/* Author & Action Button */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-6 h-6 rounded-full object-cover ring-1 ring-[#5fdee7]/40 group-hover:ring-[#ffcc00] transition-all"
            loading="lazy"
          />
          <div className="min-w-0">
            <div className="text-[11px] font-medium text-slate-200 truncate group-hover:text-[#ffcc00] transition-colors">
              {article.author.name}
            </div>
            <div className="text-[9px] font-mono text-slate-400 truncate">
              {article.author.role}
            </div>
          </div>
        </div>

        <button className="card-action-btn flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#0b2721] text-[#5fdee7] border border-[#5fdee7]/40 group-hover:bg-[#ffcc00] group-hover:text-[#081c18] group-hover:border-[#ffcc00] transition-all duration-300 shrink-0">
          <span>Read Report</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Subtle Bottom Glow Accent */}
      <div className="card-border-glow absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5fdee7]/40 to-transparent transition-all duration-300" />
    </article>
  );
};
