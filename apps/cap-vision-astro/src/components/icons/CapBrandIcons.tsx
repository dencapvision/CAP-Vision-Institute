import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  variant?: 'blue' | 'gold' | 'emerald' | 'purple' | 'navy';
}

// 1. Leadership Transformation Emblem (Crown + North Star Compass)
export const IconLeadership: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="leadGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="50%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
      <linearGradient id="goldAccent" x1="6" y1="4" x2="18" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    {/* Base Heraldic Crown / Crest */}
    <path
      d="M3 18L5 7L9 11L12 4L15 11L19 7L21 18H3Z"
      stroke="url(#leadGrad)"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V18H3V18Z"
      fill="url(#leadGrad)"
      fillOpacity="0.15"
      stroke="url(#leadGrad)"
      strokeWidth="1.75"
    />
    {/* Central Vision Core */}
    <circle cx="12" cy="13" r="2" fill="url(#goldAccent)" />
    <path d="M12 2V4M12 17V19" stroke="url(#goldAccent)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 6.5C5.55228 6.5 6 6.05228 6 5.5C6 4.94772 5.55228 4.5 5 4.5C4.44772 4.5 4 4.94772 4 5.5C4 6.05228 4.44772 6.5 5 6.5Z" fill="url(#goldAccent)" />
    <path d="M19 6.5C19.5523 6.5 20 6.05228 20 5.5C20 4.94772 19.5523 4.5 19 4.5C18.4477 4.5 18 4.94772 18 5.5C18 6.05228 18.4477 6.5 19 6.5Z" fill="url(#goldAccent)" />
  </svg>
);

// 2. People & Team Synergy Emblem (Harmonic Interlocking Tri-Nexus)
export const IconTeamSynergy: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="teamGrad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#818CF8" />
        <stop offset="50%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#0F2557" />
      </linearGradient>
      <linearGradient id="cyanGrad" x1="12" y1="6" x2="18" y2="18" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
    </defs>
    {/* Interlocking Rings of Unity */}
    <circle cx="9" cy="9" r="4.5" stroke="url(#teamGrad)" strokeWidth="1.75" />
    <circle cx="15" cy="9" r="4.5" stroke="url(#cyanGrad)" strokeWidth="1.75" />
    <circle cx="12" cy="15" r="4.5" stroke="url(#teamGrad)" strokeWidth="1.75" />
    {/* Central Core Connection */}
    <circle cx="12" cy="11" r="1.5" fill="#F59E0B" />
    <path
      d="M7 19C7 17.5 9 16 12 16C15 16 17 17.5 17 19"
      stroke="url(#cyanGrad)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// 3. Organization Culture & Growth Mindset Emblem (Ascending Helix Prism)
export const IconGrowthCulture: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="cultureGrad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D97706" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
    </defs>
    {/* Ascending Momentum Wave */}
    <path
      d="M3 17L8.5 11.5L12.5 15.5L20.5 7.5"
      stroke="url(#cultureGrad)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 7.5H20.5V13"
      stroke="url(#cultureGrad)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Growth Nodes */}
    <circle cx="3" cy="17" r="1.75" fill="#D97706" />
    <circle cx="8.5" cy="11.5" r="1.75" fill="#F59E0B" />
    <circle cx="12.5" cy="15.5" r="1.75" fill="#F59E0B" />
    <circle cx="20.5" cy="7.5" r="2.25" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
    {/* Shading area */}
    <path
      d="M3 17L8.5 11.5L12.5 15.5L20.5 7.5V20H3V17Z"
      fill="url(#cultureGrad)"
      fillOpacity="0.08"
    />
  </svg>
);

// 4. Creative Problem Solving (CPS) & Innovation Emblem (Catalytic Diamond Spark)
export const IconCreativeCPS: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="cpsGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="50%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="sparkGold" x1="12" y1="4" x2="20" y2="12" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    {/* Geometric 6D Faceted Diamond */}
    <path
      d="M12 2L21 8.5L18 19L12 22L6 19L3 8.5L12 2Z"
      stroke="url(#cpsGrad)"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M12 2V22M3 8.5H21M6 19L12 8.5L18 19"
      stroke="url(#cpsGrad)"
      strokeWidth="1.2"
      strokeOpacity="0.6"
    />
    {/* Center Catalytic Spark */}
    <path
      d="M12 6L13.5 10.5L18 12L13.5 13.5L12 18L10.5 13.5L6 12L10.5 10.5L12 6Z"
      fill="url(#sparkGold)"
    />
  </svg>
);

// 5. Customized In-House Architecture Emblem (Compass & Strategic Blueprint)
export const IconCustomArchitecture: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="archGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#0F2557" />
      </linearGradient>
    </defs>
    {/* Blueprint Layers */}
    <rect x="3" y="3" width="8" height="8" rx="2" stroke="url(#archGrad)" strokeWidth="1.75" />
    <rect x="13" y="3" width="8" height="8" rx="2" stroke="url(#archGrad)" strokeWidth="1.75" />
    <rect x="3" y="13" width="8" height="8" rx="2" stroke="url(#archGrad)" strokeWidth="1.75" />
    {/* Core Target Activation */}
    <rect x="13" y="13" width="8" height="8" rx="2" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.75" />
    <circle cx="17" cy="17" r="1.75" fill="#F59E0B" />
    <path d="M7 7L17 17M17 7L7 17" stroke="url(#archGrad)" strokeWidth="1" strokeOpacity="0.4" />
  </svg>
);

// 6. Transformative Facilitator Catalyst (MasterFa Nexus)
export const IconFacilitatorMastery: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="facGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
    </defs>
    {/* Central Catalyst Head & Aura */}
    <circle cx="12" cy="7" r="3.5" stroke="url(#facGrad)" strokeWidth="1.75" />
    <circle cx="12" cy="7" r="1.5" fill="#F59E0B" />
    {/* Dynamic Learning Flow Arms */}
    <path
      d="M4 20C4 16.5 7.5 14 12 14C16.5 14 20 16.5 20 20"
      stroke="url(#facGrad)"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
    <path
      d="M2 13C3.5 11 5.5 10 8 10.5M22 13C20.5 11 18.5 10 16 10.5"
      stroke="#F59E0B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// 7. Gold Star Crest Badge (Replaces generic emoji ⭐)
export const IconGoldCrestStar: React.FC<IconProps> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="starGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="25%" stopColor="#FDE68A" />
        <stop offset="75%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <path
      d="M12 2L14.8 8.6L22 9.3L16.5 14.2L18.2 21.3L12 17.6L5.8 21.3L7.5 14.2L2 9.3L9.2 8.6L12 2Z"
      fill="url(#starGrad)"
      stroke="#B45309"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" fillOpacity="0.8" />
  </svg>
);

// 8. 18+ Years Institute Trust Shield Crest
export const IconInstituteShield: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="shieldGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#0F2557" />
      </linearGradient>
    </defs>
    <path
      d="M12 2L3 6V12C3 17.5 7 21.5 12 23C17 21.5 21 17.5 21 12V6L12 2Z"
      stroke="url(#shieldGrad)"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M12 5V20M6 10L12 15L18 10"
      stroke="#F59E0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
