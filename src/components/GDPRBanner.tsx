import React, { useState, useEffect } from 'react';
import { Shield, Check, X, Settings } from 'lucide-react';

interface GDPRBannerProps {
  onOpenPrivacy: () => void;
}

export const GDPRBanner: React.FC<GDPRBannerProps> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('dailytechrader_gdpr_consent');
    if (!consent) {
      // Delay presentation slightly for clean zero-lag first load
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('dailytechrader_gdpr_consent', 'all');
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('dailytechrader_gdpr_consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-[#061411]/95 backdrop-blur-md border-t border-[#5fdee7]/30 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Banner Copy */}
        <div className="flex items-start gap-3 max-w-3xl">
          <div className="p-2 rounded-lg bg-[#0b2721] border border-[#5fdee7]/40 text-[#5fdee7] shrink-0 mt-0.5">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider flex items-center gap-2">
              <span>GDPR / CCPA Privacy & Cookie Consent Protocol</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#5fdee7]/20 text-[#5fdee7]">
                COMPLIANCE VERIFIED
              </span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">
              dailytechrader uses essential local cookies to store reading preferences (bookmarks, typography, and dark theme states) and authorized digital seller telemetry in full compliance with European Union GDPR (General Data Protection Regulation) and California Consumer Privacy Act (CCPA).
              {' '}
              <button
                onClick={onOpenPrivacy}
                className="text-[#5fdee7] hover:underline font-mono text-[11px] cursor-pointer"
              >
                Review Full Privacy Policy
              </button>.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={handleEssentialOnly}
            className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#0b2721] text-slate-300 hover:text-white border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
          >
            Essential Only
          </button>

          <button
            onClick={handleAcceptAll}
            className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#ffcc00] hover:bg-[#ffd700] text-black shadow-[0_0_15px_rgba(255,204,0,0.4)] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Accept All Cookies</span>
          </button>
        </div>
      </div>
    </div>
  );
};
