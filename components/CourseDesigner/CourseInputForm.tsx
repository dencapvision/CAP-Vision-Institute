import React, { useState } from 'react';
import { Target, Search, Sparkles, Send } from 'lucide-react';

interface CourseInputFormProps {
  onSubmit: (data: CourseFormData) => void;
  initialData?: Partial<CourseFormData>;
  isLoading?: boolean;
}

export interface CourseFormData {
  topic: string;
  target_audience: string;
  pain_point: string;
  expected_outcome: string;
}

const CourseInputForm: React.FC<CourseInputFormProps> = ({ onSubmit, initialData = {}, isLoading = false }) => {
  const [formData, setFormData] = useState<CourseFormData>({
    topic: initialData.topic || '',
    target_audience: initialData.target_audience || '',
    pain_point: initialData.pain_point || '',
    expected_outcome: initialData.expected_outcome || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.topic && formData.target_audience && formData.pain_point && formData.expected_outcome;

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <Target className="w-5 h-5 text-[#1D4ED8]" />
        </div>
        <h2 className="text-xl font-black text-[#0f3460] nav-font">Course Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Topic */}
        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
            Topic Name
          </label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="เช่น: Creative Problem Solving"
            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4ED8] transition-all font-medium text-gray-700 placeholder:text-gray-300"
          />
        </div>

        {/* Target Audience */}
        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
            Target Audience
          </label>
          <input
            type="text"
            name="target_audience"
            value={formData.target_audience}
            onChange={handleChange}
            placeholder="เช่น: Manager / Staff ทุกระดับ"
            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4ED8] transition-all font-medium text-gray-700 placeholder:text-gray-300"
          />
        </div>

        {/* Pain Point */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
            Pain Point (ปัญหาที่พบ)
          </label>
          <textarea
            name="pain_point"
            rows={3}
            value={formData.pain_point}
            onChange={handleChange}
            placeholder="เช่น: ทีมงานแก้ปัญหาไม่เป็น คิดไม่เป็นระบบ หรือชอบใช้วิธีเดิมๆ"
            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4ED8] transition-all font-medium text-gray-700 placeholder:text-gray-300 resize-none"
          />
        </div>

        {/* Expected Outcome */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
            Expected Outcome (ผลที่คาดหวัง)
          </label>
          <textarea
            name="expected_outcome"
            rows={3}
            value={formData.expected_outcome}
            onChange={handleChange}
            placeholder="เช่น: มี Framework ที่ใช้แก้ปัญหาได้จริง และกล้าคิดทางเลือกใหม่"
            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4ED8] transition-all font-medium text-gray-700 placeholder:text-gray-300 resize-none"
          />
        </div>
      </div>

      <button
        onClick={() => onSubmit(formData)}
        disabled={!isFormValid || isLoading}
        className={`w-full py-5 rounded-2xl font-black nav-font uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
          isFormValid && !isLoading
            ? 'bg-[#1D4ED8] text-white shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-95'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating Course...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Course Outline ✨
          </>
        )}
      </button>
    </div>
  );
};

export default CourseInputForm;
