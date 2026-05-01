import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Briefcase } from 'lucide-react';
import type { Portfolio } from '../services/portfolio';

interface Props {
  item: Portfolio;
}

const CATEGORY_COLORS: Record<string, string> = {
  Leadership: 'bg-blue-50 text-blue-700',
  Team: 'bg-emerald-50 text-emerald-700',
  Communication: 'bg-purple-50 text-purple-700',
  Mindset: 'bg-orange-50 text-orange-700',
  'Work Skills': 'bg-teal-50 text-teal-700',
};

const PortfolioCard: React.FC<Props> = ({ item }) => {
  const colorClass = CATEGORY_COLORS[item.category] ?? 'bg-gray-100 text-gray-600';

  return (
    <Link
      to={`/portfolio/${item.slug}`}
      className="group bg-white rounded-[2rem] overflow-hidden shadow-md border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 flex flex-col"
    >
      {/* Cover image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {item.cover_image ? (
          <img
            src={item.cover_image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0f3460] to-[#1a4a8a] flex flex-col items-center justify-center gap-3">
            <Briefcase className="w-10 h-10 text-white/30" />
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Case Study</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className={`absolute top-4 left-4 text-xs font-black px-3 py-1.5 rounded-xl ${colorClass}`}>
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="w-4 h-4 text-[#c5a059] shrink-0" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider truncate">
            {item.organization}
          </span>
        </div>

        <h3 className="text-xl font-black text-[#0f3460] mb-3 nav-font leading-tight group-hover:text-[#c5a059] transition-colors">
          {item.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
          {item.description_short}
        </p>

        {/* Result highlight */}
        {item.result && (
          <div className="bg-[#f8fafc] border-l-4 border-[#c5a059] px-4 py-3 rounded-r-xl mb-5">
            <p className="text-xs font-black text-[#c5a059] uppercase tracking-wider mb-0.5">ผลลัพธ์</p>
            <p className="text-sm font-bold text-[#0f3460] leading-snug">{item.result}</p>
          </div>
        )}

        {/* Keywords */}
        {item.keywords?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {item.keywords.slice(0, 3).map((kw) => (
              <span key={kw} className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                {kw}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-sm font-black text-[#0f3460] group-hover:text-[#c5a059] transition-colors nav-font mt-auto">
          อ่าน Case Study
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default PortfolioCard;
