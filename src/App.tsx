import React, { useState, useEffect, useMemo } from 'react';
import { allArticles, categories, getArticleById } from './data/articles';
import { Article } from './types/article';
import { Navbar } from './components/Navbar';
import { TickerTape } from './components/TickerTape';
import { ArticleCard } from './components/ArticleCard';
import { Sidebar } from './components/Sidebar';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { EditorialModal } from './components/EditorialSections';
import { GDPRBanner } from './components/GDPRBanner';
import { Footer } from './components/Footer';
import { 
  Sparkles, Radio, Cpu, Shield, Filter, ArrowUpDown, 
  Layers, CheckCircle2, ChevronRight, Bookmark, Search,
  Award, Zap, Compass, Lock, Home as HomeIcon
} from 'lucide-react';
import { resolveImageUrl } from './utils/imageUtils';

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'default' | 'readTime' | 'wordCount'>('default');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [editorialModalType, setEditorialModalType] = useState<'about' | 'contact' | 'editors' | 'standards' | 'privacy' | 'terms' | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dailytechrader_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('dailytechrader_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Handle URL hash changes (deep linking #article-best-flagship-smartphone-deals)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#article-')) {
        const articleId = hash.replace('#article-', '');
        const matched = getArticleById(articleId);
        if (matched) {
          setSelectedArticle(matched);
        }
      } else if (hash && hash.startsWith('#category-')) {
        const catSlug = hash.replace('#category-', '');
        setActiveCategory(catSlug);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleToggleBookmarkInCard = (e: React.MouseEvent, articleId: string) => {
    e.stopPropagation();
    handleToggleBookmark(articleId);
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedIds([]);
  };

  const bookmarkedArticles = useMemo(() => {
    return allArticles.filter((a) => bookmarkedIds.includes(a.id));
  }, [bookmarkedIds]);

  // Filtered and sorted articles
  const displayedArticles = useMemo(() => {
    let result = activeCategory
      ? allArticles.filter((a) => a.categorySlug === activeCategory)
      : [...allArticles];

    if (sortBy === 'wordCount') {
      result.sort((a, b) => b.wordCount - a.wordCount);
    } else if (sortBy === 'readTime') {
      result.sort((a, b) => parseInt(b.readTime) - parseInt(a.readTime));
    }

    return result;
  }, [activeCategory, sortBy]);

  // Lead Featured Article (Hero Article)
  const leadArticle = displayedArticles[0] || allArticles[0];
  const gridArticles = displayedArticles.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-[#081c18] text-slate-100 font-sans selection:bg-[#ffcc00] selection:text-black">
      {/* 1. Dual-Tier Corporate Header (like ke.com.pk top bar + mega menu) */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(slug) => {
          setActiveCategory(slug);
          if (slug) {
            window.location.hash = `category-${slug}`;
          } else {
            window.location.hash = '';
          }
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenAbout={() => setEditorialModalType('about')}
        onOpenContact={() => setEditorialModalType('contact')}
        onOpenEditors={() => setEditorialModalType('editors')}
        onOpenStandards={() => setEditorialModalType('standards')}
        bookmarkedCount={bookmarkedIds.length}
      />

      {/* 2. Continuous Ticker Tape (Directly below Header) */}
      <TickerTape
        onSelectArticleById={(id) => {
          const found = getArticleById(id);
          if (found) setSelectedArticle(found);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-8">
        {/* Category Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden p-6 md:p-8 border border-[#5fdee7]/25 bg-gradient-to-br from-[#0c2e27] via-[#081f1b] to-[#040e0c] shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(#5fdee7_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#5fdee7]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest bg-[#5fdee7]/15 border border-[#5fdee7] text-[#5fdee7] shadow-[0_0_10px_rgba(95,222,231,0.3)]">
                PEER-REVIEWED JOURNAL
              </span>
              <span className="text-xs font-mono text-slate-400">
                • {allArticles.length} Full-Length Technical Investigations
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black font-display tracking-tight text-white uppercase leading-tight">
              {activeCategory
                ? categories.find((c) => c.slug === activeCategory)?.name
                : 'Engineering & Consumer Tech Journal'}
            </h1>

            <p className="text-xs md:text-sm text-slate-300 font-sans leading-relaxed">
              {activeCategory
                ? categories.find((c) => c.slug === activeCategory)?.tagline
                : 'Rigorous technical investigations, 3nm silicon teardowns, generative AI architecture audits, zero-knowledge cryptographic benchmarks, and smart infrastructure engineering.'}
            </p>

            {/* Category Quick Chips */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeCategory === null
                    ? 'bg-[#5fdee7] text-black font-bold shadow-[0_0_12px_rgba(95,222,231,0.4)]'
                    : 'bg-[#0b2721] text-slate-300 hover:text-white border border-[#5fdee7]/20'
                }`}
              >
                All {allArticles.length} Reports
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeCategory === cat.slug
                      ? 'bg-[#ffcc00] text-black font-bold shadow-[0_0_15px_rgba(255,204,0,0.4)]'
                      : 'bg-[#0b2721] text-slate-300 hover:text-[#5fdee7] border border-[#5fdee7]/20'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Main Content: 2-Column Layout (Left 8 cols = Articles Feed, Right 4 cols = Sticky Portal Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Feed Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Lead Featured Article Spotlight (Hero Article) */}
            {leadArticle && (
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5fdee7]">
                    <Radio className="w-4 h-4 text-[#ffcc00] animate-pulse" />
                    <span>LEAD TECHNICAL INVESTIGATION // REPORT 01</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {leadArticle.wordCount} words • 6 Data Panels
                  </span>
                </div>

                <div
                  onClick={() => setSelectedArticle(leadArticle)}
                  className="article-card-interactive group rounded-2xl p-5 md:p-6 cursor-pointer border border-[#5fdee7]/30 flex flex-col md:flex-row gap-6 items-center"
                >
                  {/* Infographic Preview */}
                  <div className="w-full md:w-1/2">
                    <div className="relative rounded-xl overflow-hidden border border-[#5fdee7]/30 group-hover:border-[#ffcc00] transition-all aspect-video bg-black/60 shadow-xl">
                      <img
                        src={resolveImageUrl(leadArticle.imageSrc)}
                        alt={leadArticle.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.currentTarget;
                          const filename = leadArticle.imageSrc.split('/').pop();
                          if (filename && !target.src.endsWith(`/images/${filename}`)) {
                            target.src = `/images/${filename}`;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[#5fdee7] group-hover:text-[#ffcc00] border border-[#5fdee7]/40 text-[10px] font-mono font-bold transition-colors">
                          INFOGRAPHIC #{leadArticle.infographic.promptNumber}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-white font-bold truncate">
                          {leadArticle.infographic.title}
                        </span>
                        <span className="text-[#ffcc00] shrink-0 font-bold ml-2">
                          Expand Full →
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Lead Details */}
                  <div className="w-full md:w-1/2 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="card-category-badge px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded border border-[#5fdee7]/40 bg-[#0b2721] text-[#5fdee7]">
                        {leadArticle.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {leadArticle.readTime}
                      </span>
                    </div>

                    <h2 className="card-title text-lg md:text-2xl font-extrabold font-display uppercase tracking-tight text-white leading-tight transition-colors">
                      {leadArticle.title}
                    </h2>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                      {leadArticle.excerpt}
                    </p>

                    {/* Key specs highlight */}
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-[11px] font-mono grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 block text-[9px]">VERIFIED TARGET:</span>
                        <span className="text-[#ffcc00] font-bold truncate block">{leadArticle.keyword}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">BENCHMARK VERDICT:</span>
                        <span className="text-emerald-400 font-bold truncate block">TSMC 3nm N3E Approved</span>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={leadArticle.author.avatar}
                          alt={leadArticle.author.name}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-[#5fdee7]"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{leadArticle.author.name}</div>
                          <div className="text-[9px] text-slate-400 font-mono">{leadArticle.publishDate}</div>
                        </div>
                      </div>

                      <button className="card-action-btn flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#5fdee7] text-black transition-all">
                        <span>Read Full Report</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Filter & Sorting Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Layers className="w-4 h-4 text-[#5fdee7]" />
                <span>
                  Showing <strong className="text-white">{displayedArticles.length}</strong> of {allArticles.length} Reports
                </span>
                {activeCategory && (
                  <span className="text-[#ffcc00] font-bold">
                    ({categories.find((c) => c.slug === activeCategory)?.name})
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#0b2721] border border-[#5fdee7]/30 text-xs font-mono text-white focus:outline-none focus:border-[#ffcc00] cursor-pointer"
                >
                  <option value="default">Default Order</option>
                  <option value="wordCount">Deepest Analysis (Word Count)</option>
                  <option value="readTime">Longest Read Time</option>
                </select>
              </div>
            </div>

            {/* Post Cards Grid (Crisp 2-Column grid with glowing yellow hover effect) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {gridArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelect={(a) => setSelectedArticle(a)}
                  isBookmarked={bookmarkedIds.includes(article.id)}
                  onToggleBookmark={handleToggleBookmarkInCard}
                />
              ))}
            </div>

            {/* AdSense Compliance & Editorial Standards Banner */}
            <section className="rounded-2xl p-6 border border-[#5fdee7]/30 bg-[#061411] space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5fdee7] uppercase tracking-wider font-bold">
                <Award className="w-4 h-4 text-[#ffcc00]" />
                <span>DAILYTECHRADER EDITORIAL PLEDGE // AD-NETWORK APPROVAL COMPLIANCE</span>
              </div>

              <h3 className="text-lg md:text-xl font-bold font-display text-white uppercase">
                Built for Readers, Engineered for Transparency
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Every review, benchmark, and architectural guide published on dailytechrader meets rigorous technical standards. We provide clean indexable structures, sub-second page rendering, certified GDPR/CCPA privacy safeguards, and transparent contact methods with our editorial newsroom staff.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs font-mono">
                <div className="p-3 rounded-lg bg-[#0b2721] border border-white/10">
                  <div className="text-[#5fdee7] font-bold">{allArticles.length}/{allArticles.length} Full Reports</div>
                  <div className="text-slate-400 text-[10px] mt-0.5">Targeting 1,200–1,300 technical words per keyword topic.</div>
                </div>
                <div className="p-3 rounded-lg bg-[#0b2721] border border-white/10">
                  <div className="text-[#ffcc00] font-bold">{allArticles.length} Unique Infographics</div>
                  <div className="text-slate-400 text-[10px] mt-0.5">Custom 6-panel vector visual blueprints.</div>
                </div>
                <div className="p-3 rounded-lg bg-[#0b2721] border border-white/10">
                  <div className="text-emerald-400 font-bold">Direct Verification</div>
                  <div className="text-slate-400 text-[10px] mt-0.5">Official WhatsApp (03046308630) & Press Email routing.</div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar Column (Sticky Portal Directory & Widgets) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <Sidebar
              articles={allArticles}
              activeCategory={activeCategory}
              onSelectCategory={(slug) => {
                setActiveCategory(slug);
                if (slug) {
                  window.location.hash = `category-${slug}`;
                } else {
                  window.location.hash = '';
                }
              }}
              onSelectArticle={(art) => setSelectedArticle(art)}
              onOpenContact={() => setEditorialModalType('contact')}
              onOpenStandards={() => setEditorialModalType('standards')}
              onOpenPrivacy={() => setEditorialModalType('privacy')}
            />
          </div>
        </div>
      </main>

      {/* 6. Article Reader Modal (100% interactive deep reading view) */}
      {selectedArticle && (
        <ArticleReaderModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onSelectRelated={(rel) => setSelectedArticle(rel)}
          allArticles={allArticles}
          isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* 7. Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={allArticles}
        onSelectArticle={(art) => setSelectedArticle(art)}
      />

      {/* 8. Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticles}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={handleClearAllBookmarks}
      />

      {/* 9. Editorial Modals (About, Contact, Editors, Standards, Privacy, Terms) */}
      {editorialModalType && (
        <EditorialModal
          type={editorialModalType}
          onClose={() => setEditorialModalType(null)}
        />
      )}

      {/* 10. GDPR Cookie Notification Banner */}
      <GDPRBanner onOpenPrivacy={() => setEditorialModalType('privacy')} />

      {/* 11. Corporate 4-Column Footer */}
      <Footer
        onSelectCategory={(slug) => {
          setActiveCategory(slug);
          window.location.hash = `category-${slug}`;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAbout={() => setEditorialModalType('about')}
        onOpenContact={() => setEditorialModalType('contact')}
        onOpenEditors={() => setEditorialModalType('editors')}
        onOpenStandards={() => setEditorialModalType('standards')}
        onOpenPrivacy={() => setEditorialModalType('privacy')}
        onOpenTerms={() => setEditorialModalType('terms')}
      />
    </div>
  );
}
