import React, { useState } from 'react';
import { Article } from '../types/article';
import { categories } from '../data/articles';
import { 
  TrendingUp, Mail, Phone, ChevronRight, 
  Layers, ArrowRight, CheckCircle2, Map
} from 'lucide-react';
import { resolveImageUrl } from '../utils/imageUtils';

interface SidebarProps {
  articles: Article[];
  activeCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
  onSelectArticle: (article: Article) => void;
  onOpenContact: () => void;
  onOpenStandards?: () => void;
  onOpenPrivacy: () => void;
  onOpenSitemap?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  articles,
  activeCategory,
  onSelectCategory,
  onSelectArticle,
  onOpenContact,
  onOpenPrivacy,
  onOpenSitemap
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Trending articles (top 5)
  const trendingArticles = articles.slice(0, 5);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <aside className="space-y-6">
      {/* 1. Quick Directory / Category Tree Widget */}
      <div className="rounded-xl bg-[#0b2721]/90 border border-[#5fdee7]/25 p-4 shadow-lg">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#5fdee7]">
            <Layers className="w-4 h-4 text-[#ffcc00]" />
            <span>PORTAL NAVIGATION // DIRECTORY</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {articles.length} Reports
          </span>
        </div>

        <div className="space-y-1.5">
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeCategory === null
                ? 'bg-[#5fdee7] text-black font-bold shadow-[0_0_12px_rgba(95,222,231,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <ChevronRight className={`w-3.5 h-3.5 ${activeCategory === null ? 'text-black' : 'text-[#5fdee7]'}`} />
              <span>All Engineering Reports</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 font-bold">
              {articles.length}
            </span>
          </button>

          {categories.map((cat) => {
            const isSelected = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#ffcc00] text-black font-bold shadow-[0_0_12px_rgba(255,204,0,0.4)]'
                    : 'text-slate-300 hover:text-[#5fdee7] hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-black' : 'text-[#5fdee7]'}`} />
                  <span className="truncate">{cat.name}</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 font-bold shrink-0">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {onOpenSitemap && (
          <div className="pt-2 mt-2 border-t border-white/5">
            <button
              onClick={onOpenSitemap}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-black/40 hover:bg-[#ffcc00] hover:text-black text-[#ffcc00] border border-[#ffcc00]/30 font-mono text-xs font-bold transition-all cursor-pointer"
            >
              <Map className="w-3.5 h-3.5" />
              <span>Open Interactive Sitemap (22 Reports)</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Trending & Most-Read Technical Reports */}
      <div className="rounded-xl bg-[#0b2721]/90 border border-[#5fdee7]/25 p-4 shadow-lg">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#ffcc00]">
            <TrendingUp className="w-4 h-4 text-[#ffcc00] animate-pulse" />
            <span>TRENDING TECHNICAL DISPATCHES</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">
            TOP 5
          </span>
        </div>

        <div className="space-y-3">
          {trendingArticles.map((article, index) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group p-2.5 rounded-lg bg-black/30 hover:bg-[#ffcc00]/10 border border-white/5 hover:border-[#ffcc00] transition-all duration-300 cursor-pointer flex gap-3 items-center"
            >
              <div className="text-sm font-mono font-black text-[#5fdee7] group-hover:text-[#ffcc00] w-6 shrink-0 text-center">
                0{index + 1}
              </div>

              <div className="w-14 h-14 rounded-md overflow-hidden bg-black/60 shrink-0 border border-white/10 group-hover:border-[#ffcc00] transition-colors">
                <img
                  src={resolveImageUrl(article.imageSrc)}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const filename = article.imageSrc.split('/').pop();
                    if (filename && !target.src.endsWith(`/images/${filename}`)) {
                      target.src = `/images/${filename}`;
                    }
                  }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white group-hover:text-[#ffcc00] line-clamp-2 leading-snug transition-colors">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-slate-400">
                  <span>{article.category}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Research Vault Newsletter Subscription */}
      <div className="rounded-xl bg-[#0b2721] border border-[#5fdee7]/25 p-4 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#5fdee7]">
          <Mail className="w-4 h-4 text-[#ffcc00]" />
          <span>DAILYTECHRADER RESEARCH VAULT</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          Receive daily technical investigations, silicon teardown whitepapers, and hardware deals directly to your inbox.
        </p>

        {isSubscribed ? (
          <div className="p-3 rounded-lg bg-emerald-900/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Subscribed successfully to Daily Tech Dispatches!</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your engineer email..."
              required
              className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#5fdee7]"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#5fdee7] hover:bg-[#ffcc00] text-black font-mono font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Subscribe To Research Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>Zero spam. 100% technical.</span>
          <button onClick={onOpenPrivacy} className="hover:underline">Privacy Terms</button>
        </div>
      </div>

      {/* 4. Newsroom Desk Helpline Card */}
      <div className="rounded-xl bg-[#051310] border border-white/10 p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
          <Phone className="w-4 h-4 text-[#ffcc00]" />
          <span>24/7 EDITORIAL HELPLINE DESK</span>
        </div>

        <p className="text-[11px] text-slate-400 font-sans">
          Direct inquiries regarding technical benchmarks, media partnerships, or editorial peer-reviews:
        </p>

        <div className="space-y-2 text-xs font-mono">
          <a
            href="tel:03046308630"
            className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/10 hover:border-[#ffcc00] text-[#ffcc00] font-bold transition-colors"
          >
            <span>Hotline / WhatsApp:</span>
            <span>03046308630</span>
          </a>

          <a
            href="mailto:ibrahimtrader019@gmail.com"
            className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/10 hover:border-[#5fdee7] text-slate-200 text-[11px] transition-colors"
          >
            <span className="text-slate-400">Press Email:</span>
            <span className="text-[#5fdee7] truncate ml-2">ibrahimtrader019@gmail.com</span>
          </a>

          <button
            onClick={onOpenContact}
            className="w-full py-1.5 rounded bg-[#0b2721] hover:bg-white/10 text-white font-mono text-xs border border-white/15 transition-colors cursor-pointer text-center"
          >
            Open Newsroom Desk Portal
          </button>
        </div>
      </div>
    </aside>
  );
};
