import React, { useState } from 'react';
import { 
  Search, Bookmark, Menu, X, Radio, Shield, 
  Cpu, Lock, Home as HomeIcon, Info, Mail, Users, Compass,
  Phone, Globe, ChevronDown, Check, Sparkles, ExternalLink
} from 'lucide-react';
import { categories } from '../data/articles';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  activeCategory: string | null;
  onSelectCategory: (categorySlug: string | null) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenEditors: () => void;
  onOpenStandards: () => void;
  bookmarkedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenBookmarks,
  onOpenAbout,
  onOpenContact,
  onOpenEditors,
  onOpenStandards,
  bookmarkedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<'EN' | 'UR'>('EN');

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'consumer-gadgets':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'ai-future-tech':
        return <Compass className="w-3.5 h-3.5" />;
      case 'cybersecurity-software':
        return <Lock className="w-3.5 h-3.5" />;
      case 'smart-home-computing':
        return <HomeIcon className="w-3.5 h-3.5" />;
      default:
        return <Radio className="w-3.5 h-3.5" />;
    }
  };

  const getCategorySublinks = (slug: string) => {
    switch (slug) {
      case 'consumer-gadgets':
        return [
          { name: 'Flagship Smartphone Deals', keyword: 'smartphones' },
          { name: 'Wireless ANC Earbuds', keyword: 'earbuds' },
          { name: 'Budget Gaming Laptops', keyword: 'gaming-laptops' },
          { name: 'Foldable Phone Hinge Durability', keyword: 'foldable-phones' }
        ];
      case 'ai-future-tech':
        return [
          { name: 'Local Offline LLMs', keyword: 'local-llm' },
          { name: 'Generative AI Video Generators', keyword: 'ai-video' },
          { name: 'Autonomous Agentic AI Frameworks', keyword: 'agentic-ai' },
          { name: 'Small Language Models & NPU Silicon', keyword: 'slm-npu' }
        ];
      case 'cybersecurity-software':
        return [
          { name: 'Zero-Trust Enterprise Architecture', keyword: 'zero-trust' },
          { name: 'Anti-Ransomware Endpoint Shields', keyword: 'ransomware' },
          { name: 'WireGuard vs OpenVPN Benchmarks', keyword: 'vpn' },
          { name: 'FIDO2 & WebAuthn Passkeys', keyword: 'passkeys' }
        ];
      case 'smart-home-computing':
        return [
          { name: 'Wi-Fi 7 Tri-Band Mesh Routers', keyword: 'mesh-wifi' },
          { name: 'Matter & Thread Smart Hubs', keyword: 'matter-hub' },
          { name: 'Energy-Harvesting Smart Thermostats', keyword: 'thermostats' },
          { name: 'OLED vs Mini-LED 4K Monitors', keyword: 'monitors' }
        ];
      default:
        return [];
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#081c18]/95 backdrop-blur-md border-b border-[#5fdee7]/25 shadow-xl">
      {/* 1. Top Utility Header Tier (like ke.com.pk top bar) */}
      <div className="bg-[#040e0c] border-b border-[#5fdee7]/15 py-1.5 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Official Helpline & Newsroom Hotline */}
          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="tel:03046308630"
              className="flex items-center gap-1.5 text-slate-300 hover:text-[#ffcc00] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#5fdee7]" />
              <span>Newsroom Hotline: <strong className="text-white">03046308630</strong></span>
            </a>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Mail className="w-3 h-3 text-[#5fdee7]" />
              <span>ibrahimtrader019@gmail.com</span>
            </span>
          </div>

          {/* Right: Language Switcher, Compliance & Quick Links */}
          <div className="flex items-center gap-3 text-[11px]">
            {/* Language Toggle (English / Urdu indicator) */}
            <div className="flex items-center bg-[#0b2721] rounded border border-white/10 px-1 py-0.5">
              <button
                onClick={() => setCurrentLang('EN')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                  currentLang === 'EN' ? 'bg-[#5fdee7] text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setCurrentLang('UR')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                  currentLang === 'UR' ? 'bg-[#ffcc00] text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                اردو
              </button>
            </div>

            <button
              onClick={onOpenStandards}
              className="hidden sm:inline hover:text-[#ffcc00] transition-colors cursor-pointer"
            >
              Editorial Standards
            </button>
            <span className="hidden sm:inline text-white/20">|</span>
            <button
              onClick={onOpenContact}
              className="hover:text-[#5fdee7] font-semibold transition-colors cursor-pointer"
            >
              Contact Desk
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar Tier */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & High-Tech Radar */}
        <div 
          onClick={() => {
            onSelectCategory(null);
            setMobileMenuOpen(false);
          }}
          className="cursor-pointer"
        >
          <BrandLogo size="md" showTagline={true} />
        </div>

        {/* Desktop Navigation Links with Dropdown Menus */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Home Feed Button */}
          <button
            onClick={() => {
              onSelectCategory(null);
              setActiveDropdown(null);
            }}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              activeCategory === null
                ? 'bg-[#5fdee7] text-black font-bold shadow-[0_0_12px_rgba(95,222,231,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Home Feed
          </button>

          {/* Category Dropdowns */}
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.slug;
            const sublinks = getCategorySublinks(cat.slug);

            return (
              <div 
                key={cat.slug} 
                className="relative"
                onMouseEnter={() => setActiveDropdown(cat.slug)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => {
                    onSelectCategory(cat.slug);
                    setActiveDropdown(null);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#ffcc00] text-black font-bold shadow-[0_0_15px_rgba(255,204,0,0.4)]'
                      : 'text-slate-300 hover:text-[#5fdee7] hover:bg-white/5'
                  }`}
                >
                  {getCategoryIcon(cat.slug)}
                  <span>{cat.name}</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {/* Dropdown Menu Popover */}
                {activeDropdown === cat.slug && (
                  <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="rounded-xl bg-[#071b17] border border-[#5fdee7]/30 shadow-2xl p-2 space-y-1">
                      <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-[#5fdee7] uppercase tracking-wider border-b border-white/10 flex items-center justify-between">
                        <span>{cat.name}</span>
                        <span className="text-slate-400 font-normal">{cat.count} Reports</span>
                      </div>

                      {sublinks.map((sub, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            onSelectCategory(cat.slug);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-[#ffcc00] hover:bg-white/5 transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span className="truncate">{sub.name}</span>
                          <span className="text-[10px] text-slate-500">→</span>
                        </button>
                      ))}

                      <div className="pt-1 border-t border-white/5">
                        <button
                          onClick={() => {
                            onSelectCategory(cat.slug);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-center py-1.5 text-[11px] font-mono font-bold text-[#5fdee7] hover:underline cursor-pointer"
                        >
                          View All in {cat.name} ({cat.count})
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Editorial & About */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('newsroom')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span>Newsroom</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {activeDropdown === 'newsroom' && (
              <div className="absolute top-full right-0 w-56 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="rounded-xl bg-[#071b17] border border-[#5fdee7]/30 shadow-2xl p-2 space-y-1">
                  <button
                    onClick={() => {
                      onOpenAbout();
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    About The Journal
                  </button>
                  <button
                    onClick={() => {
                      onOpenEditors();
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Editors & Benchmarking Staff
                  </button>
                  <button
                    onClick={() => {
                      onOpenStandards();
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Editorial Standards
                  </button>
                  <button
                    onClick={() => {
                      onOpenContact();
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-[#5fdee7] hover:text-[#ffcc00] hover:bg-white/5 font-bold transition-colors cursor-pointer"
                  >
                    Official Contact & Press Desk
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Auxiliary Actions & Dialog Triggers */}
        <div className="flex items-center gap-2">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0b2721] border border-[#5fdee7]/30 text-xs font-mono text-slate-300 hover:text-white hover:border-[#5fdee7] transition-colors cursor-pointer"
            title="Search Articles (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#5fdee7]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline text-[9px] px-1 py-0.2 rounded bg-black/50 text-slate-400 border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Bookmarks Drawer Trigger */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 rounded-lg bg-[#0b2721] border border-[#5fdee7]/30 text-slate-300 hover:text-[#ffcc00] hover:border-[#ffcc00] transition-colors cursor-pointer"
            title="Saved Reading Vault"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkedCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#ffcc00] text-black text-[10px] font-mono font-bold flex items-center justify-center">
                {bookmarkedCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#0b2721] border border-white/10 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#061411] border-b border-[#5fdee7]/30 p-4 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <button
              onClick={() => {
                onSelectCategory(null);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between ${
                activeCategory === null
                  ? 'bg-[#5fdee7] text-black font-bold'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <span>Home Feed</span>
              <span className="text-[10px]">All Reports</span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => {
                  onSelectCategory(cat.slug);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between ${
                  activeCategory === cat.slug
                    ? 'bg-[#ffcc00] text-black font-bold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  {getCategoryIcon(cat.slug)}
                  {cat.name}
                </span>
                <span className="text-[10px] opacity-70">{cat.count} Articles</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <button
              onClick={() => {
                onOpenAbout();
                setMobileMenuOpen(false);
              }}
              className="py-1.5 rounded bg-[#0b2721] text-slate-300 hover:text-white"
            >
              About
            </button>
            <button
              onClick={() => {
                onOpenEditors();
                setMobileMenuOpen(false);
              }}
              className="py-1.5 rounded bg-[#0b2721] text-slate-300 hover:text-white"
            >
              Editors
            </button>
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="py-1.5 rounded bg-[#0b2721] text-[#5fdee7] font-bold"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
