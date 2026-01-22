import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGradientLogo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0c58e" />
            <stop offset="100%" stopColor="#c5a059" />
          </linearGradient>
          <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="1" dy="1.5" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Navy Ring Segment (Context & Care) */}
        <path 
          d="M82 35 C75 18 50 12 30 25 C10 42 12 75 35 88 C55 98 85 90 92 65" 
          fill="none" 
          stroke="#0f3460" 
          strokeWidth="11" 
          strokeLinecap="round"
          filter="url(#logoShadow)"
        />

        {/* Gold Checkmark (Vision & Success) */}
        <path 
          d="M32 52 L52 75 L95 18" 
          fill="none" 
          stroke="url(#goldGradientLogo)" 
          strokeWidth="11" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          filter="url(#logoShadow)"
        />
        
        {/* Growth Dot (Human Potential) */}
        <circle 
          cx="32" 
          cy="52" 
          r="6" 
          fill="url(#goldGradientLogo)"
        />
      </svg>
    </div>
  );
};

export default Logo;