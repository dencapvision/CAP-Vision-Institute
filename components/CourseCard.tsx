import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight } from 'lucide-react';

interface CourseCardProps {
    id: string;
    title: string;
    instructor: string;
    image: string;
    duration?: string;
    level?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ id, title, instructor, image, duration = '1 วัน', level = 'ทุกระดับ' }) => {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-5 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-50 text-[#0f3460] text-xs font-bold px-2.5 py-1 rounded-full">{level}</span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {duration}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-[#0f3460] mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-[#c5a059] transition-colors">
                    {title}
                </h3>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    โดย {instructor}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                            {/* Placeholder for instructor avatar if available */}
                            <Users className="w-full h-full p-1.5 text-gray-400" />
                        </div>
                        <span className="text-xs font-semibold text-gray-600">{instructor.split(' ')[0]}</span>
                    </div>

                    <Link
                        to={`/courses/${id}`}
                        className="text-[#c5a059] text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                        ดูรายละเอียด <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
