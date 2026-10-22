import React, { useState } from 'react';
import { InfographicSpec } from '../types/article';
import { Maximize2, Minimize2, Cpu, Activity, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface InfographicHeroProps {
  spec: InfographicSpec;
  isCompact?: boolean;
}

export const InfographicHero: React.FC<InfographicHeroProps> = ({ spec, isCompact = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, subtitle, colorScheme, panels } = spec;

  if (isCompact) {
    return (
      <div 
        className="relative w-full h-48 rounded-lg overflow-hidden border border-[#5fdee7]/20 p-3 flex flex-col justify-between transition-all duration-300 group-hover:border-[#ffcc00]/60"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.bg} 0%, #081c18 100%)`
        }}
      >
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#5fdee7_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none group-hover:opacity-25 group-hover:bg-[radial-gradient(#ffcc00_1px,transparent_1px)] transition-opacity" />
        
        {/* Top Header */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: colorScheme.primary }} />
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#5fdee7] group-hover:text-[#ffcc00] transition-colors">
              INFOGRAPHIC PROTOCOL #{spec.promptNumber}
            </span>
          </div>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/50 border border-[#5fdee7]/30 text-slate-300">
            6 DATA PANELS
          </span>
        </div>

        {/* Center Infographic Title */}
        <div className="relative z-10 my-auto text-center px-2">
          <h4 className="text-sm font-bold tracking-tight text-white group-hover:text-[#ffcc00] font-display uppercase transition-colors line-clamp-1">
            {title}
          </h4>
          <p className="text-[10px] text-slate-300/80 font-mono tracking-tight mt-0.5 line-clamp-1">
            {subtitle}
          </p>
        </div>

        {/* Mini 6-panel grid preview */}
        <div className="relative z-10 grid grid-cols-6 gap-1 pt-1 border-t border-[#5fdee7]/15 group-hover:border-[#ffcc00]/30 transition-colors">
          {panels.map((p, idx) => (
            <div 
              key={idx} 
              className="bg-black/40 rounded p-1 text-center border border-white/5 hover:border-[#ffcc00]/40 transition-colors"
              title={`${p.title}: ${p.desc}`}
            >
              <div className="text-[8px] font-mono font-bold text-[#5fdee7] group-hover:text-[#ffcc00] truncate">
                {p.metric || `#${idx + 1}`}
              </div>
              <div className="text-[7px] text-slate-400 truncate hidden sm:block">
                {p.title.split(' ')[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative rounded-xl overflow-hidden border border-[#5fdee7]/30 transition-all duration-300 shadow-2xl ${
        isExpanded ? 'p-6 md:p-8' : 'p-5 md:p-6'
      }`}
      style={{
        background: `radial-gradient(circle at 50% 0%, ${colorScheme.bg} 0%, #061311 90%)`
      }}
    >
      {/* Dynamic Background Grid & Tech Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#5fdee7_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5fdee7] to-transparent opacity-60" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#5fdee7]/20">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#0b2721] border border-[#5fdee7]/40 shadow-[0_0_12px_rgba(95,222,231,0.3)]">
            <Cpu className="w-5 h-5 text-[#5fdee7]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5fdee7]">
                TECHNICAL INFOGRAPHIC SPECIFICATION #{spec.promptNumber}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-[#5fdee7]/10 text-[#5fdee7] border border-[#5fdee7]/30">
                AI VISUAL BLUEPRINT
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold uppercase font-display text-white tracking-wide mt-0.5">
              {title}
            </h3>
            <p className="text-xs md:text-sm font-mono text-slate-300">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex text-[11px] font-mono text-slate-400 bg-black/40 px-2.5 py-1 rounded border border-white/10">
            Aesthetic: {spec.backgroundTheme.slice(0, 32)}...
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[#0b2721] hover:bg-[#5fdee7]/20 text-[#5fdee7] border border-[#5fdee7]/40 transition-colors cursor-pointer"
            title={isExpanded ? 'Collapse Infographic' : 'Expand Full Blueprint'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            {isExpanded ? 'Compact' : 'Expand 6 Panels'}
          </button>
        </div>
      </div>

      {/* 6 High-Tech Panels Grid */}
      <div className={`relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-5 ${isExpanded ? 'gap-4' : ''}`}>
        {panels.map((panel, idx) => (
          <div
            key={idx}
            className="relative rounded-lg p-3.5 bg-black/50 border border-[#5fdee7]/20 hover:border-[#ffcc00] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,204,0,0.25)] group/panel flex flex-col justify-between"
          >
            {/* Panel Corner Accent */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#5fdee7]/40 group-hover/panel:border-[#ffcc00] transition-colors rounded-tr" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 group-hover/panel:text-[#ffcc00] group-hover/panel:border-[#ffcc00]/30 transition-colors">
                  PANEL 0{idx + 1} // {panel.tag || 'SPEC'}
                </span>
                {panel.metric && (
                  <span className="text-xs font-mono font-bold text-[#5fdee7] group-hover/panel:text-[#ffcc00] transition-colors">
                    {panel.metric}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold font-display uppercase tracking-wide text-white group-hover/panel:text-[#ffcc00] transition-colors mb-1">
                {panel.title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {panel.desc}
              </p>
            </div>

            {panel.metricLabel && (
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{panel.metricLabel}</span>
                <span className="text-[#5fdee7] group-hover/panel:text-[#ffcc00] font-bold">
                  {panel.metric}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Spec Metadata */}
      <div className="relative z-10 mt-5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#5fdee7]">
            <Activity className="w-3.5 h-3.5" /> High-Resolution Vector Blueprint
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Shield className="w-3.5 h-3.5" /> Peer-Reviewed Schema
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>Primary: <span style={{ color: colorScheme.primary }}>{colorScheme.primary}</span></span>
          <span>•</span>
          <span>Accent: <span style={{ color: colorScheme.secondary }}>{colorScheme.secondary}</span></span>
        </div>
      </div>
    </div>
  );
};
