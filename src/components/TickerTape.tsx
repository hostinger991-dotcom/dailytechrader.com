import React from 'react';
import { tickerHeadlines } from '../data/articles';
import { Radio, Zap, Flame, ChevronRight } from 'lucide-react';

interface TickerTapeProps {
  onSelectArticleById: (id: string) => void;
}

export const TickerTape: React.FC<TickerTapeProps> = ({ onSelectArticleById }) => {
  // Duplicate list to create a seamless infinite marquee loop
  const repeatedHeadlines = [...tickerHeadlines, ...tickerHeadlines];

  return (
    <div className="relative w-full bg-[#061411] border-y border-[#5fdee7]/25 overflow-hidden py-2 select-none z-20">
      {/* Side Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#081c18] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#081c18] to-transparent z-10 pointer-events-none" />

      {/* Static Left Indicator */}
      <div className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0b2721] border border-[#5fdee7] shadow-[0_0_12px_rgba(95,222,231,0.35)] text-[#5fdee7] text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider">
        <span className="w-2 h-2 rounded-full bg-[#5fdee7] animate-ping" />
        <Radio className="w-3.5 h-3.5 text-[#5fdee7]" />
        <span>LIVE RADAR</span>
      </div>

      {/* Marquee Container */}
      <div className="flex animate-ticker pl-32 md:pl-40 items-center">
        {repeatedHeadlines.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelectArticleById(item.link)}
            className="group/item flex items-center gap-2.5 mx-4 text-xs font-mono text-slate-200 hover:text-[#ffcc00] transition-colors whitespace-nowrap cursor-pointer text-left"
          >
            {/* Glowing Tag with Dynamic Accent Border #5fdee7 */}
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border border-[#5fdee7] bg-[#0b2721]/80 text-[#5fdee7] shadow-[0_0_8px_rgba(95,222,231,0.25)] group-hover/item:border-[#ffcc00] group-hover/item:text-[#ffcc00] group-hover/item:shadow-[0_0_12px_rgba(255,204,0,0.4)] transition-all duration-200">
              {item.tag}
            </span>

            <span className="tracking-tight font-sans text-slate-300 group-hover/item:text-[#ffcc00] transition-colors">
              {item.text}
            </span>

            <ChevronRight className="w-3.5 h-3.5 text-[#5fdee7] opacity-60 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:text-[#ffcc00] transition-all" />

            <span className="text-[#5fdee7]/40 select-none ml-2">•</span>
          </button>
        ))}
      </div>
    </div>
  );
};
