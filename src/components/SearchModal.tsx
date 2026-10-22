import React, { useState, useEffect } from 'react';
import { Article } from '../types/article';
import { Search, X, Clock, ArrowRight, Tag } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'all' || article.categorySlug === selectedCategory;

    const q = query.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      article.title.toLowerCase().includes(q) ||
      article.keyword.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16 md:pt-24 animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#081c18] border border-[#5fdee7]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        style={{
          boxShadow: '0 0 40px rgba(95,222,231,0.2)'
        }}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#5fdee7]/20 bg-[#061411] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#5fdee7] shrink-0" />
          <input
            type="text"
            placeholder="Search keywords, topics, benchmarks (e.g. 3nm, WireGuard, LiDAR, OLED)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm md:text-base text-white placeholder-slate-400 focus:outline-none font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white text-xs font-mono px-1.5 py-0.5 rounded bg-white/5"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="p-3 bg-[#0a221d] border-b border-white/5 flex flex-wrap gap-1.5 text-xs font-mono">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#5fdee7] text-black font-bold'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            All Categories ({articles.length})
          </button>
          <button
            onClick={() => setSelectedCategory('consumer-gadgets')}
            className={`px-2.5 py-1 rounded transition-colors ${
              selectedCategory === 'consumer-gadgets'
                ? 'bg-[#5fdee7] text-black font-bold'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            Consumer Gadgets
          </button>
          <button
            onClick={() => setSelectedCategory('ai-future-tech')}
            className={`px-2.5 py-1 rounded transition-colors ${
              selectedCategory === 'ai-future-tech'
                ? 'bg-[#5fdee7] text-black font-bold'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            AI & Future Tech
          </button>
          <button
            onClick={() => setSelectedCategory('cybersecurity-software')}
            className={`px-2.5 py-1 rounded transition-colors ${
              selectedCategory === 'cybersecurity-software'
                ? 'bg-[#5fdee7] text-black font-bold'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            Cybersecurity & Software
          </button>
          <button
            onClick={() => setSelectedCategory('smart-home-computing')}
            className={`px-2.5 py-1 rounded transition-colors ${
              selectedCategory === 'smart-home-computing'
                ? 'bg-[#5fdee7] text-black font-bold'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            Smart Home & Computing
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-white/5 space-y-2">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-mono text-xs">
              <p>No technical reports match your query &ldquo;{query}&rdquo;.</p>
              <p className="mt-1 text-slate-500">Try searching for &lsquo;battery&rsquo;, &lsquo;robotics&rsquo;, &lsquo;vpn&rsquo;, or &lsquo;smart hub&rsquo;.</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="pt-2 first:pt-0 p-3 rounded-xl hover:bg-[#0b2721] transition-all cursor-pointer group flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-[#5fdee7] border border-[#5fdee7]/30 group-hover:border-[#ffcc00] group-hover:text-[#ffcc00] transition-colors uppercase">
                      {article.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-[#ffcc00] transition-colors leading-snug">
                    {article.title}
                  </h4>

                  <p className="text-xs text-slate-300 line-clamp-1">
                    {article.excerpt}
                  </p>
                </div>

                <div className="shrink-0 pt-1">
                  <span className="p-1.5 rounded-lg bg-black/50 border border-white/10 group-hover:border-[#ffcc00] group-hover:text-[#ffcc00] text-slate-400 flex items-center transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#061411] border-t border-white/10 text-center text-[11px] font-mono text-slate-400 flex items-center justify-between px-4">
          <span>{filteredArticles.length} Technical Reports Found</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
