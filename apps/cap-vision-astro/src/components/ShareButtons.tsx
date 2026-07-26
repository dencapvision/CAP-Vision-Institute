import React, { useState } from 'react';
import { Facebook, MessageCircle, Share2, Check, Linkedin } from 'lucide-react';

interface ShareButtonsProps {
  url?: string;
  title?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const [copied, setCopied] = useState(false);
  
  // Safe evaluation for SSR
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = title || (typeof document !== 'undefined' ? document.title : 'CAP Vision Insight');

  const shareToFacebook = () => {
    if (!shareUrl) return;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToLine = () => {
    if (!shareUrl) return;
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    if (!shareUrl) return;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleGeneralShare = async () => {
    if (!shareUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="bg-gray-50 rounded-[3rem] p-12 text-center border border-gray-100 shadow-inner relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000 rotate-12">
        <Share2 className="w-32 h-32" />
      </div>
      
      <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] mb-8 nav-font relative z-10">Knowledge Sharing</p>
      
      <div className="flex justify-center gap-6 relative z-10">
        {/* Facebook */}
        <button 
          onClick={shareToFacebook}
          className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all group/btn border border-gray-50 cursor-pointer"
          title="Share on Facebook"
        >
          <Facebook className="w-7 h-7" />
        </button>
        
        {/* LinkedIn */}
        <button
          onClick={shareToLinkedIn}
          className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#0A66C2] shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all group/btn border border-gray-50 cursor-pointer"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-6 h-6" />
        </button>

        {/* LINE */}
        <button
          onClick={shareToLine}
          className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#06C755] shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all group/btn border border-gray-50 cursor-pointer"
          title="Share on LINE"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
        
        {/* General Share / Copy */}
        <button 
          onClick={handleGeneralShare}
          className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center ${copied ? 'text-green-500' : 'text-amber-500'} shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all group/btn border border-gray-50 cursor-pointer`}
          title={copied ? "Copied!" : "Share Link"}
        >
          {copied ? <Check className="w-7 h-7" /> : <Share2 className="w-7 h-7" />}
        </button>
      </div>

      {copied && (
        <div className="mt-4 text-[10px] font-black text-green-500 uppercase tracking-widest nav-font animate-in fade-in slide-in-from-top-1 duration-300">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default ShareButtons;
