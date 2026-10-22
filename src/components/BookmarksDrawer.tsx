import React from 'react';
import { Article } from '../types/article';
import { Bookmark, X, ArrowRight, Trash2, Clock } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#081c18] border-l border-[#5fdee7]/30 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 md:p-6 border-b border-[#5fdee7]/20 bg-[#061411] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#ffcc00]" />
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Saved Technical Vault
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                {bookmarkedArticles.length} Offline-Saved Reports
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/40 text-slate-400 hover:text-white border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Articles List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Bookmark className="w-10 h-10 text-slate-600 mx-auto stroke-[1.5]" />
              <p className="text-sm font-mono text-slate-400">Your reading vault is empty.</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the bookmark icon on any article card or report view to save it here for fast retrieval.
              </p>
            </div>
          ) : (
            bookmarkedArticles.map((article) => (
              <div
                key={article.id}
                className="p-3.5 rounded-xl bg-[#0b2721] border border-[#5fdee7]/20 hover:border-[#ffcc00] transition-all group flex flex-col justify-between gap-2"
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#5fdee7] uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                </div>

                <h4
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="text-xs md:text-sm font-bold text-white group-hover:text-[#ffcc00] transition-colors cursor-pointer line-clamp-2"
                >
                  {article.title}
                </h4>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <button
                    onClick={() => onRemoveBookmark(article.id)}
                    className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-[11px] font-mono text-[#5fdee7] group-hover:text-[#ffcc00] font-bold transition-colors cursor-pointer"
                  >
                    <span>Open Report</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {bookmarkedArticles.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-[#061411] flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors"
            >
              Clear Entire Vault
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg text-xs font-mono bg-[#5fdee7] text-black font-bold"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
