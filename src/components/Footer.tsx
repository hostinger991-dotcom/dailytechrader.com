import React from 'react';
import { 
  Phone, Mail, Shield, ChevronRight, 
  MapPin, Clock, Award, Cpu, Lock, Compass, Home as HomeIcon, CheckCircle2,
  Globe, FileText, ArrowRight, Map, ExternalLink, Download
} from 'lucide-react';
import { categories } from '../data/articles';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectCategory: (slug: string | null) => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenEditors: () => void;
  onOpenStandards: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenSitemap: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenAbout,
  onOpenContact,
  onOpenEditors,
  onOpenStandards,
  onOpenPrivacy,
  onOpenTerms,
  onOpenSitemap
}) => {
  return (
    <footer className="bg-[#030d0b] border-t border-[#5fdee7]/25 text-slate-300 relative z-30">
      {/* 1. Pre-Footer Quick Service & Hotline Bar */}
      <div className="bg-[#051613] border-b border-white/5 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#0b2721] border border-[#ffcc00]/40 text-[#ffcc00]">
              <Phone className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase">
                24/7 Editorial Newsroom Desk
              </div>
              <div className="text-xs font-mono text-slate-400">
                Call or WhatsApp Hotline: <span className="text-[#ffcc00] font-bold">03046308630</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenSitemap}
              className="px-4 py-2 rounded-lg bg-[#0b2721] hover:bg-[#5fdee7] hover:text-black text-[#5fdee7] border border-[#5fdee7]/40 font-mono font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Map className="w-3.5 h-3.5 text-[#ffcc00]" />
              <span>Interactive Sitemap</span>
            </button>

            <button
              onClick={onOpenContact}
              className="px-4 py-2 rounded-lg bg-[#5fdee7] hover:bg-[#ffcc00] text-black font-mono font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Contact Press Office</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenStandards}
              className="px-4 py-2 rounded-lg bg-[#0b2721] hover:bg-white/10 text-white border border-white/10 font-mono text-xs transition-colors cursor-pointer"
            >
              Editorial Standards
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main 4-Column Corporate Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Organization Overview */}
          <div className="space-y-4">
            <BrandLogo size="md" showTagline={false} />

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              ENGINEERING & CONSUMER TECH JOURNAL - PUBLISHED DAILY. Dedicated to objective, empirical hardware bench testing, semiconductor microarchitectures, artificial intelligence reasoning models, and cybersecurity protocols.
            </p>

            <div className="space-y-2 pt-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Independent Journalistic Board</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Shield className="w-3.5 h-3.5 text-[#5fdee7] shrink-0" />
                <span>AdSense Quality & GDPR Compliant</span>
              </div>
              <button
                onClick={onOpenSitemap}
                className="flex items-center gap-1.5 text-[#ffcc00] hover:underline cursor-pointer pt-1"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Browse All 22 Reports in Sitemap</span>
              </button>
            </div>
          </div>

          {/* Column 2: Technical Coverage & Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#5fdee7]">
              Technical Coverage
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <button
                  onClick={() => onSelectCategory(null)}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-[#ffcc00] transition-colors cursor-pointer text-left group"
                >
                  <ChevronRight className="w-3 h-3 text-[#5fdee7] group-hover:translate-x-0.5 transition-transform" />
                  <span>All Engineering Reports</span>
                  <span className="text-[10px] text-slate-500">(22)</span>
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => onSelectCategory(cat.slug)}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-[#ffcc00] transition-colors cursor-pointer text-left group"
                  >
                    <ChevronRight className="w-3 h-3 text-[#5fdee7] group-hover:translate-x-0.5 transition-transform" />
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-500">({cat.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Official Site Pages & Governance (All Pages Listed & Clickable) */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#5fdee7]">
              Official Site Pages
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-[#ffcc00] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#5fdee7]" />
                  <span>About The Publication</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEditors}
                  className="hover:text-[#ffcc00] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#5fdee7]" />
                  <span>Editors & Technical Staff</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStandards}
                  className="hover:text-[#ffcc00] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#5fdee7]" />
                  <span>Editorial Standards & Peer Review</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-[#ffcc00] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#5fdee7]" />
                  <span>Privacy Policy (GDPR / CCPA)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-[#ffcc00] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#5fdee7]" />
                  <span>Terms & Conditions of Service</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#ffcc00] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#5fdee7]" />
                  <span>Contact Editorial Newsroom</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSitemap}
                  className="hover:text-[#ffcc00] text-[#ffcc00] font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Map className="w-3 h-3 text-[#ffcc00]" />
                  <span>HTML Sitemap & Directory</span>
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#5fdee7] text-slate-400 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3 h-3 text-[#5fdee7]" />
                  <span>XML Sitemap (Raw / Index)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsroom Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#ffcc00]">
              Official Newsroom Desk
            </h4>
            
            <div className="space-y-2.5 text-xs font-mono">
              <a
                href="tel:03046308630"
                className="p-2.5 rounded-lg bg-[#0b2721] border border-white/10 hover:border-[#ffcc00] transition-colors flex items-center gap-2.5 text-white block group"
              >
                <div className="p-1.5 rounded bg-black/40 text-[#ffcc00]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Phone / WhatsApp Desk:</span>
                  <span className="font-bold text-[#ffcc00] group-hover:underline">03046308630</span>
                </div>
              </a>

              <a
                href="mailto:ibrahimtrader019@gmail.com"
                className="p-2.5 rounded-lg bg-[#0b2721] border border-white/10 hover:border-[#5fdee7] transition-colors flex items-center gap-2.5 text-white block group"
              >
                <div className="p-1.5 rounded bg-black/40 text-[#5fdee7]">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] text-slate-400 block">Editorial Press Inquiries:</span>
                  <span className="font-bold text-slate-200 truncate block text-[11px] group-hover:underline">
                    ibrahimtrader019@gmail.com
                  </span>
                </div>
              </a>

              <button
                onClick={onOpenContact}
                className="w-full py-2 rounded-lg bg-[#5fdee7] hover:bg-[#ffcc00] text-black font-mono font-bold text-xs transition-colors cursor-pointer text-center"
              >
                Open Newsroom Contact Form
              </button>

              <button
                onClick={onOpenSitemap}
                className="w-full py-1.5 rounded-lg bg-[#0b2721] hover:bg-white/10 text-[#ffcc00] border border-[#ffcc00]/30 font-mono text-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <Map className="w-3 h-3" />
                <span>View All 22 Articles in Sitemap</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Comprehensive Site Pages Quick Navigation Bar */}
      <div className="bg-[#020907] border-b border-white/5 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[10px] uppercase tracking-widest text-[#5fdee7] font-bold">
            All Site Pages:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-slate-400">
            <button onClick={() => onSelectCategory(null)} className="hover:text-white transition-colors cursor-pointer">
              Home Feed
            </button>
            <span>•</span>
            <button onClick={onOpenAbout} className="hover:text-white transition-colors cursor-pointer">
              About Us
            </button>
            <span>•</span>
            <button onClick={onOpenEditors} className="hover:text-white transition-colors cursor-pointer">
              Editorial Board
            </button>
            <span>•</span>
            <button onClick={onOpenStandards} className="hover:text-white transition-colors cursor-pointer">
              Editorial Standards
            </button>
            <span>•</span>
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={onOpenTerms} className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={onOpenContact} className="hover:text-white transition-colors cursor-pointer">
              Contact Desk
            </button>
            <span>•</span>
            <button onClick={onOpenSitemap} className="text-[#ffcc00] hover:underline font-bold transition-colors cursor-pointer">
              HTML Sitemap
            </button>
            <span>•</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-[#5fdee7] hover:underline transition-colors">
              XML Sitemap
            </a>
          </div>
        </div>
      </div>

      {/* 4. Bottom Sub-Footer Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          Copyright © 2026 <strong className="text-slate-300">dailytechrader</strong>. All Rights Reserved.
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <span>Fast Zero-Lag Architecture</span>
          <span>•</span>
          <span>W3C Validated</span>
          <span>•</span>
          <span>SSL 256-Bit Encrypted</span>
          <span>•</span>
          <button onClick={onOpenSitemap} className="hover:text-[#ffcc00] text-slate-400">
            Sitemap Index
          </button>
          <span>•</span>
          <button onClick={onOpenPrivacy} className="hover:text-slate-400">
            GDPR Compliance
          </button>
        </div>
      </div>
    </footer>
  );
};
