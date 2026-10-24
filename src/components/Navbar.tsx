import React, { useState } from 'react';
import { 
  Search, Bookmark, Menu, X, Radio, Shield, 
  Cpu, Lock, Home as HomeIcon, Info, Mail, Users, Compass
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
  bookmarkedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-40 bg-[#081c18]/95 backdrop-blur-md border-b border-[#5fdee7]/25">
      {/* Top Banner Tagline */}
      <div className="bg-[#051310] border-b border-[#5fdee7]/15 py-1 px-4 text-center">
        <p className="text-[10px] md:text-xs font-mono font-semibold tracking-widest text-[#5fdee7] uppercase flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5fdee7] animate-pulse" />
          <span>ENGINEERING & CONSUMER TECH JOURNAL - PUBLISHED DAILY</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#5fdee7] animate-pulse" />
        </p>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Identity: glowing high-tech radar icon + name */}
        <div 
          onClick={() => {
            onSelectCategory(null);
            setMobileMenuOpen(false);
          }}
          className="cursor-pointer"
        >
          <BrandLogo size="md" showTagline={true} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              activeCategory === null
                ? 'bg-[#5fdee7] text-black font-bold shadow-[0_0_12px_rgba(95,222,231,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Home Feed
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeCategory === cat.slug
                  ? 'bg-[#ffcc00] text-black font-bold shadow-[0_0_15px_rgba(255,204,0,0.4)]'
                  : 'text-slate-300 hover:text-[#5fdee7] hover:bg-white/5'
              }`}
            >
              {getCategoryIcon(cat.slug)}
              <span>{cat.name}</span>
            </button>
          ))}
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

          {/* Desktop Editorial Links */}
          <div className="hidden xl:flex items-center gap-1 pl-2 border-l border-white/10">
            <button
              onClick={onOpenAbout}
              className="px-2 py-1 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={onOpenEditors}
              className="px-2 py-1 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Editors
            </button>
            <button
              onClick={onOpenContact}
              className="px-2 py-1 text-xs font-mono text-[#5fdee7] hover:text-[#ffcc00] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

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

      {/* Mobile Menu Dropdown */}
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
              <span className="text-[10px]">20 Reports</span>
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
                <span className="text-[10px] opacity-70">5 Articles</span>
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
