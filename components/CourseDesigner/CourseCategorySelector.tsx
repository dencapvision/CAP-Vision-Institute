import React from 'react';
import { Users, Briefcase, MessageSquare, Award, Star } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  tags: string[];
  color: string;
}

export const COURSE_CATEGORIES: Category[] = [
  {
    id: 'people_skills',
    name: 'People Skills',
    icon: <Users className="w-5 h-5" />,
    tags: ['Service Mind', 'Personality', 'Mindset'],
    color: 'blue'
  },
  {
    id: 'work_skills',
    name: 'Work Skills',
    icon: <Briefcase className="w-5 h-5" />,
    tags: ['Team Building', 'Creative Thinking', 'Problem Solving'],
    color: 'amber'
  },
  {
    id: 'communication_skills',
    name: 'Communication Skills',
    icon: <MessageSquare className="w-5 h-5" />,
    tags: ['DISC', 'Feedback', 'Communication'],
    color: 'indigo'
  },
  {
    id: 'leader_skills',
    name: 'Leader Skills',
    icon: <Award className="w-5 h-5" />,
    tags: ['Leadership', 'Strategy', 'Decision Making'],
    color: 'yellow'
  }
];

interface CourseCategorySelectorProps {
  selectedCategoryId: string;
  onSelect: (categoryId: string) => void;
}

const CourseCategorySelector: React.FC<CourseCategorySelectorProps> = ({ selectedCategoryId, onSelect }) => {
  return (
    <div className="w-full space-y-2">
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-4">
        หลักสูตร In-house Training
      </h3>
      <div className="space-y-1">
        {COURSE_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
              selectedCategoryId === category.id
                ? 'bg-[#1D4ED8] text-white shadow-lg shadow-blue-200'
                : 'text-gray-600 hover:bg-blue-50 hover:text-[#1D4ED8]'
            }`}
          >
            <div className={`${
              selectedCategoryId === category.id ? 'text-white' : 'text-gray-400 group-hover:text-[#1D4ED8]'
            }`}>
              {category.icon}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold uppercase tracking-wide">{category.name}</p>
              <p className={`text-[10px] font-medium opacity-70 ${
                selectedCategoryId === category.id ? 'text-blue-100' : 'text-gray-400'
              }`}>
                {category.tags.join(' • ')}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseCategorySelector;
