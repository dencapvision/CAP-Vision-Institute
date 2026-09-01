import React from 'react';

import { ArrowRight, Building2, Briefcase, Award } from 'lucide-react';
import type { Portfolio } from '../lib/services/portfolio';
import { IconGoldCrestStar } from './icons/CapBrandIcons';

interface Props {
  item: Portfolio;
}

const CATEGORY_COLORS: Record<string, string> = {
  Leadership: 'bg-blue-50 text-[#2563EB] border-blue-200',
  Team: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Communication: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Mindset: 'bg-amber-50 text-amber-800 border-amber-200',
  'Work Skills': 'bg-teal-50 text-teal-700 border-teal-200',
};

export const PortfolioCard: React.FC<Props> = ({ item }) => {
  const colorClass = CATEGORY_COLORS[item.category] ?? 'bg-gray-50 text-gray-700 border-gray-200';

  return (
    <a href={`/portfolio/${item.slug}`}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:border-[#2563EB]/40 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col"
    >
      {/* Cover Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {item.cover_image ? (
          <img
            src={item.cover_image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#111827] to-[#0F2557] flex flex-col items-center justify-center gap-2 text-white">
            <Briefcase className="w-10 h-10 text-white/30" />
            <span className="text-white/50 text-[11px] font-bold uppercase tracking-widest">Case Study</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-transparent to-transparent opacity-80" />

        {/* Category Badge */}
        <span className={`absolute top-4 left-4 text-[11px] font-black px-3 py-1 rounded-full border shadow-xs backdrop-blur-md ${colorClass}`}>
          {item.category}
        </span>
      </div>

      {/* Content Container */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        {/* Organization Name */}
        <div className="flex items-center gap-2 mb-2.5">
          <Building2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider truncate">
            {item.organization}
          </span>
        </div>

        {/* Case Title */}
        <h3 className="text-lg sm:text-xl font-black text-[#0F2557] mb-2.5 nav-font leading-snug group-hover:text-[#2563EB] transition-colors">
          {item.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2 flex-1 font-light">
          {item.description_short}
        </p>

        {/* Result Highlight Callout */}
        {item.result && (
          <div className="bg-amber-50/60 border border-amber-200/80 px-3.5 py-2.5 rounded-2xl mb-4 flex items-start gap-2">
            <IconGoldCrestStar className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-[10px] font-black text-amber-800 uppercase tracking-wider mb-0.5">Key Impact</p>
              <p className="text-xs font-bold text-[#0F2557] line-clamp-2 leading-tight">{item.result}</p>
            </div>
          </div>
        )}

        {/* Action Link */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
          <span className="text-xs font-black text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors nav-font flex items-center gap-1.5">
            อ่านบทเรียนความสำเร็จ
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>

          <span className="text-[11px] text-gray-400 font-medium">In-house Training</span>
        </div>
      </div>
    </a>
  );
};

export default PortfolioCard;
