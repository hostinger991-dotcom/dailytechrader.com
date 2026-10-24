import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }[size];

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl'
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* High-Tech Precision Radar Emblem */}
      <div className={`relative ${iconDimensions} rounded-xl bg-gradient-to-br from-[#0c2f28] via-[#081c18] to-[#040f0c] border border-[#5fdee7]/60 group-hover:border-[#ffcc00] flex items-center justify-center shadow-[0_0_15px_rgba(95,222,231,0.3)] group-hover:shadow-[0_0_22px_rgba(255,204,0,0.55)] transition-all duration-300 overflow-hidden shrink-0`}>
        {/* Subtle Conic Radar Scan Wedge (Animated) */}
        <div 
          className="absolute inset-0 rounded-xl pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity animate-logo-sweep"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(95,222,231,0.35) 340deg, #5fdee7 360deg)'
          }}
        />

        {/* Embedded Vector Radar Scope Reticle */}
        <svg 
          viewBox="0 0 100 100" 
          className="relative z-10 w-full h-full p-1.5"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Reticle Ring */}
          <circle 
            cx="50" 
            cy="50" 
            r="42" 
            stroke="#5fdee7" 
            strokeWidth="1.2" 
            strokeDasharray="4 2" 
            strokeOpacity="0.4"
            className="group-hover:stroke-[#ffcc00] group-hover:stroke-opacity-60 transition-colors"
          />

          {/* Middle Range Ring */}
          <circle 
            cx="50" 
            cy="50" 
            r="28" 
            stroke="#5fdee7" 
            strokeWidth="1.5" 
            strokeOpacity="0.6"
            className="group-hover:stroke-[#ffcc00] group-hover:stroke-opacity-70 transition-colors"
          />

          {/* Inner Core Ring */}
          <circle 
            cx="50" 
            cy="50" 
            r="14" 
            stroke="#5fdee7" 
            strokeWidth="1.8" 
            strokeOpacity="0.8"
            className="group-hover:stroke-[#ffcc00] transition-colors"
          />

          {/* Crosshair Axes */}
          <line x1="50" y1="8" x2="50" y2="92" stroke="#5fdee7" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="8" y1="50" x2="92" y2="50" stroke="#5fdee7" strokeWidth="1" strokeOpacity="0.3" />

          {/* Stylized DR Tech Monogram Silhouette */}
          <path 
            d="M 36 32 L 36 68 M 36 32 C 48 32, 56 36, 56 44 C 56 52, 48 56, 36 56 M 46 54 L 62 68" 
            stroke="#5fdee7" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="group-hover:stroke-[#ffcc00] transition-colors"
          />

          {/* Radar Signal Ping Blip (Gold) */}
          <circle cx="70" cy="28" r="3.5" fill="#ffcc00" className="animate-pulse" />
          <circle cx="70" cy="28" r="6" stroke="#ffcc00" strokeWidth="1" strokeOpacity="0.5" />
        </svg>

        {/* Central Glowing Laser Node */}
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#ffcc00] shadow-[0_0_8px_#ffcc00] pointer-events-none group-hover:scale-125 transition-transform" />
      </div>

      {/* Professional Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className={`${titleSizes} font-black font-display tracking-tight text-white group-hover:text-white transition-colors leading-none`}>
            dailytech<span className="text-[#5fdee7] group-hover:text-[#ffcc00] transition-colors">rader</span>
          </span>
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-[#0b2721] text-[#5fdee7] group-hover:text-[#ffcc00] border border-[#5fdee7]/30 group-hover:border-[#ffcc00]/50 transition-colors">
            PRO
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1 h-1 rounded-full bg-[#5fdee7] group-hover:bg-[#ffcc00] transition-colors animate-ping" />
            <span className="text-[9px] md:text-[10px] font-mono tracking-wider text-slate-400 group-hover:text-slate-300 uppercase transition-colors">
              Engineering & Consumer Tech Journal
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
