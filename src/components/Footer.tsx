import React from 'react';
import { 
  Phone, Mail, Shield, Radio, ChevronRight, 
  MapPin, Clock, Award, Cpu, Lock, Compass, Home as HomeIcon, CheckCircle2 
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
    <footer className="bg-[#051310] border-t border-[#5fdee7]/25 text-slate-300 relative z-30">
      {/* Top Footer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <BrandLogo size="md" showTagline={false} />

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              ENGINEERING & CONSUMER TECH JOURNAL - PUBLISHED DAILY. Dedicated to objective, empirical hardware bench testing, semiconductor microarchitectures, artificial intelligence reasoning models, and cybersecurity protocols.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Independent Journalistic Editorial Board</span>
            </div>
          </div>

          {/* Categories Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#5fdee7]">
              Technical Coverage
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => onSelectCategory(cat.slug)}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-[#ffcc00] transition-colors cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-[#5fdee7]" />
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-500">({cat.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial & Policies Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#5fdee7]">
              Journal & Ethics
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-[#ffcc00] transition-colors cursor-pointer"
                >
                  About The Publication
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEditors}
                  className="hover:text-[#ffcc00] transition-colors cursor-pointer"
                >
                  Editors & Benchmarking Staff
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStandards}
                  className="hover:text-[#ffcc00] transition-colors cursor-pointer"
                >
                  Editorial Standards & Peer Review
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-[#ffcc00] transition-colors cursor-pointer"
                >
                  Privacy Policy (GDPR / CCPA)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-[#ffcc00] transition-colors cursor-pointer"
                >
                  Terms & Conditions of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Official Contact Info Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#ffcc00]">
              Official Newsroom Desk
            </h4>
            
            <div className="space-y-2.5 text-xs font-mono">
              <a
                href="tel:03069256639"
                className="p-2.5 rounded-lg bg-[#0b2721] border border-white/10 hover:border-[#ffcc00] transition-colors flex items-center gap-2.5 text-white block group"
              >
                <div className="p-1.5 rounded bg-black/40 text-[#ffcc00]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Phone / WhatsApp Desk:</span>
                  <span className="font-bold text-[#ffcc00] group-hover:underline">03069256639</span>
                </div>
              </a>

              <a
                href="mailto:sagheerofficial21dnb@gmail.com"
                className="p-2.5 rounded-lg bg-[#0b2721] border border-white/10 hover:border-[#5fdee7] transition-colors flex items-center gap-2.5 text-white block group"
              >
                <div className="p-1.5 rounded bg-black/40 text-[#5fdee7]">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] text-slate-400 block">Editorial Press Inquiries:</span>
                  <span className="font-bold text-slate-200 truncate block text-[11px] group-hover:underline">
                    sagheerofficial21dnb@gmail.com
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

      {/* Bottom Legal & Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
        <div>
          Copyright © 2026 <strong className="text-slate-300">dailytechrader</strong>. All Rights Reserved.
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Fast Zero-Lag Architecture</span>
          <span>•</span>
          <span>W3C Validated</span>
          <span>•</span>
          <span>SSL 256-Bit Encrypted</span>
        </div>
      </div>
    </footer>
  );
};
