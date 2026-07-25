import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img
        src="https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/about%20us/cap%20vision%20logo.png"
        alt="CAP Vision Institute Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;
