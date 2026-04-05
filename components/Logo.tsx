import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img
        src="https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/about%20us/cap%20vision%20logo.png"
        alt="CAP Vision Institute Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;