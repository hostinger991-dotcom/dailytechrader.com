import React, { useState, useMemo } from 'react';
import { Article } from '../types/article';
import { categories } from '../data/articles';
import { 
  X, Map, Search, FileText, ExternalLink, ChevronRight, 
  Layers, Shield, Users, Award, Lock, Mail, Home as HomeIcon,
  Cpu, Compass, CheckCircle2, Clock, Calendar, ArrowRight, Download
} from 'lucide-react';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (categorySlug: string | null) => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenEditors: () => void;
  onOpenStandards: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
  onSelectCategory,
  onOpenAbout,
  onOpenContact,
  onOpenEditors,
  onOpenStandards,
  onOpenPrivacy,
  onOpenTerms
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const staticPages = [
    {
      title: 'Home Feed & Master Journal',
      url: '/',
      description: 'Main editorial stream featuring all 22 technical investigations and hardware reviews.',
      icon: <HomeIcon className="w-4 h-4 text-[#5fdee7]" />,
      action: () => {
        onSelectCategory(null);
        onClose();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      title: 'About The Publication',
      url: '#about',
      description: 'Our journalistic charter, hardware laboratory testing ethics, and editorial mission.',
      icon: <Award className="w-4 h-4 text-[#ffcc00]" />,
      action: () => {
        onClose();
        onOpenAbout();
      }
    },
    {
      title: 'Editorial Board & Staff',
      url: '#editors',
      description: 'Accredited silicon analysts, AI researchers, and embedded systems benchmarking staff.',
      icon: <Users className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        onOpenEditors();
      }
    },
    {
      title: 'Editorial Standards & Peer Review',
      url: '#standards',
      description: 'Fact-checking methodologies, errata transparency, and independent lab protocols.',
      icon: <Shield className="w-4 h-4 text-[#5fdee7]" />,
      action: () => {
        onClose();
        onOpenStandards();
      }
    },
    {
      title: 'Privacy Policy (GDPR / CCPA)',
      url: '#privacy',
      description: 'Data protection standards, cookie disclosures, and European GDPR Article 17 rights.',
      icon: <Lock className="w-4 h-4 text-[#ffcc00]" />,
      action: () => {
        onClose();
        onOpenPrivacy();
      }
    },
    {
      title: 'Terms of Service & Licensing',
      url: '#terms',
      description: 'Copyright conventions, benchmarking syndication rules, and hardware safety disclaimer.',
      icon: <FileText className="w-4 h-4 text-slate-300" />,
      action: () => {
        onClose();
        onOpenTerms();
      }
    },
    {
      title: 'Contact Newsroom & Whistleblower Desk',
      url: '#contact',
      description: 'Direct press hotline (03046308630) and encrypted inbox (ibrahimtrader019@gmail.com).',
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        onOpenContact();
      }
    },
    {
      title: 'Search Engine XML Sitemap',
      url: '/sitemap.xml',
      description: 'Raw XML index file for Google, Bing, and AdSense automated digital crawlers.',
      icon: <ExternalLink className="w-4 h-4 text-[#5fdee7]" />,
      action: () => {
        window.open('/sitemap.xml', '_blank');
      }
    }
  ];

  // Filter articles based on search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const q = searchQuery.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.keyword.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [articles, searchQuery]);

  // Group articles by category
  const articlesByCategory = useMemo(() => {
    return categories.map((cat) => ({
      category: cat,
      items: filteredArticles.filter((a) => a.categorySlug === cat.slug)
    }));
  }, [filteredArticles]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-[#081c18] border border-[#5fdee7]/40 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
        style={{
          boxShadow: '0 0 50px rgba(95,222,231,0.25)'
        }}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#5fdee7]/20 bg-[#051411] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#0b2721] border border-[#5fdee7]/40 text-[#5fdee7]">
              <Map className="w-5 h-5 text-[#ffcc00] animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#5fdee7] uppercase block">
                INDEX & DIRECTORY NAVIGATION
              </span>
              <h2 className="text-lg sm:text-2xl font-bold font-display text-white uppercase tracking-tight">
                dailytechrader Sitemap
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b2721] hover:bg-[#ffcc00] hover:text-black border border-white/10 text-slate-300 font-mono text-xs transition-colors"
              title="Open Raw XML Sitemap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>XML Sitemap</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#0b2721] border border-white/10 text-slate-300 hover:text-white hover:border-white/30 cursor-pointer"
              aria-label="Close Sitemap"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar inside Sitemap */}
        <div className="p-4 bg-[#071915] border-b border-white/5 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5fdee7]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter sitemap reports or keywords (e.g. smartphone, LLM, WiFi 7, VPN)..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-black/60 border border-white/15 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#5fdee7]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-8 flex-1 text-slate-300 text-xs font-sans">
          {/* SECTION 1: OFFICIAL SITE PAGES */}
          <section className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-xs text-[#5fdee7]">
                <Layers className="w-4 h-4 text-[#ffcc00]" />
                <span>1. Core Editorial Pages & Regulatory Policies ({staticPages.length} Pages)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">All links open directly</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {staticPages.map((page, idx) => (
                <div
                  key={idx}
                  onClick={page.action}
                  className="group p-3 rounded-xl bg-[#0b2721]/90 border border-white/10 hover:border-[#ffcc00] hover:bg-[#ffcc00]/10 transition-all duration-200 cursor-pointer flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-black/50 border border-white/10 shrink-0 group-hover:border-[#ffcc00]">
                    {page.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold font-mono text-white group-hover:text-[#ffcc00] transition-colors truncate">
                        {page.title}
                      </h3>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#ffcc00] group-hover:translate-x-1 transition-all shrink-0 ml-1" />
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {page.description}
                    </p>
                    <div className="text-[9px] font-mono text-[#5fdee7] group-hover:text-[#ffcc00] mt-1">
                      Target: {page.url}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2: CATEGORY PORTALS */}
          <section className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-xs text-[#ffcc00]">
                <Cpu className="w-4 h-4 text-[#ffcc00]" />
                <span>2. Technical Categories ({categories.length} Research Domains)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Filter home feed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => {
                    onSelectCategory(cat.slug);
                    onClose();
                  }}
                  className="group text-left p-3 rounded-xl bg-[#0b2721]/90 border border-[#5fdee7]/25 hover:border-[#ffcc00] hover:bg-[#ffcc00] transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-[#5fdee7] group-hover:text-black">
                      {cat.name}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/40 text-white group-hover:bg-black/20 group-hover:text-black">
                      {cat.count} Reports
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 group-hover:text-black/80 line-clamp-2 mt-2">
                    {cat.tagline}
                  </p>
                  <div className="mt-2 text-[9px] font-mono text-slate-400 group-hover:text-black flex items-center gap-1">
                    <span>Filter Domain</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* SECTION 3: ALL 22 TECHNICAL INVESTIGATIONS (100% CLICKABLE) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  3. Full-Length Technical Investigation Reports ({filteredArticles.length} / {articles.length} Available)
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#ffcc00]">
                Clicking opens full 1,200+ word reader
              </span>
            </div>

            {articlesByCategory.map((group) => {
              if (group.items.length === 0) return null;

              return (
                <div key={group.category.slug} className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-200 bg-[#051411] px-3 py-1.5 rounded-lg border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-[#5fdee7]" />
                    <span>{group.category.name} ({group.items.length} Reports)</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {group.items.map((article, i) => (
                      <div
                        key={article.id}
                        onClick={() => {
                          onSelectArticle(article);
                          onClose();
                        }}
                        className="group p-3 rounded-lg bg-black/40 border border-white/10 hover:border-[#ffcc00] hover:bg-[#ffcc00]/10 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 text-[10px] font-mono mb-1">
                            <span className="text-[#5fdee7] group-hover:text-[#ffcc00] font-bold">
                              #{article.infographic.promptNumber < 10 ? `0${article.infographic.promptNumber}` : article.infographic.promptNumber}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-400">{article.wordCount} words</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-400 flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5 text-[#5fdee7]" />
                              {article.readTime}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold font-display text-white group-hover:text-[#ffcc00] transition-colors line-clamp-1">
                            {article.title}
                          </h4>

                          <div className="text-[10px] font-mono text-slate-500 truncate mt-0.5">
                            Target: #{article.keyword}
                          </div>
                        </div>

                        <button className="px-2.5 py-1 rounded bg-[#0b2721] text-[#5fdee7] group-hover:bg-[#ffcc00] group-hover:text-black font-mono font-bold text-[10px] transition-colors shrink-0 flex items-center gap-1">
                          <span>Read</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#051411] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400 px-6 shrink-0">
          <div className="flex items-center gap-3">
            <span>dailytechrader Dynamic Index</span>
            <span>•</span>
            <span className="text-emerald-400">All 22 Links Verified</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5fdee7] hover:text-[#ffcc00] underline"
            >
              Open /sitemap.xml
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#5fdee7] hover:bg-[#ffcc00] text-black font-bold transition-colors cursor-pointer ml-2"
            >
              Close Sitemap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
