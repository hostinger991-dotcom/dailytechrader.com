import React from 'react';
import { 
  Phone, Mail, Shield, ChevronRight, 
  MapPin, Clock, Award, Cpu, Lock, Compass, Home as HomeIcon, CheckCircle2,
  Globe, FileText, ArrowRight
} from 'lucide-react';
import { categories } from '../data/articles';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectCategory: (slug: string) => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenEditors: () => void;
  onOpenStandards: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenAbout,
  onOpenContact,
  onOpenEditors,
  onOpenStandards,
  onOpenPrivacy,
  onOpenTerms
}) => {
  return (
    <footer className="bg-[#030d0b] border-t border-[#5fdee7]/25 text-slate-300 relative z-30">
      {/* 1. Pre-Footer Quick Service & Hotline Bar (like ke.com.pk pre-footer) */}
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

          <div className="flex items-center gap-3">
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
            </div>
          </div>

          {/* Column 2: Technical Coverage & Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#5fdee7]">
              Technical Coverage
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
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

          {/* Column 3: Corporate Governance & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#5fdee7]">
              Governance & Policies
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
                  <span>Peer Review & Standards</span>
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
                  <span>Terms & Conditions</span>
                </button>
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
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Sub-Footer Bar */}
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
          <button onClick={onOpenPrivacy} className="hover:text-slate-400">GDPR Compliance</button>
        </div>
      </div>
    </footer>
  );
};
