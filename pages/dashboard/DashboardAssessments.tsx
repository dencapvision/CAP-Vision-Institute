import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
  Target, Search, Filter, Phone, Mail, MessageSquare, Building2, User,
  Calendar, Award, ArrowRight, Sparkles, RefreshCw, Eye, FileText,
  TrendingUp, CheckCircle2, Clock, Layers3, Zap
} from 'lucide-react';
import { CONTACT_INFO } from '../../constants/brand';

interface AssessmentLead {
  id: string;
  created_at: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  line_id: string;
  interest_topic: string;
  source: string;
  status: string;
}

const DashboardAssessments: React.FC = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<AssessmentLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentLead | null>(null);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('source', 'transformation_assessment')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Could not fetch assessment leads from DB, checking all leads:', error);
        const { data: allData } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        setAssessments(allData || []);
      } else {
        setAssessments(data || []);
      }
    } catch (err) {
      console.error('Error loading assessments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProposalFromAssessment = (item: AssessmentLead) => {
    // Navigate to proposals with pre-filled query parameters
    const params = new URLSearchParams({
      name: item.name || '',
      company: item.company || '',
      phone: item.phone || '',
      email: item.email || '',
      topic: 'Transformational Leadership'
    });
    navigate(`/dashboard/proposals?${params.toString()}`);
  };

  const filtered = assessments.filter(a => {
    const q = searchTerm.toLowerCase();
    return (
      (a.name || '').toLowerCase().includes(q) ||
      (a.company || '').toLowerCase().includes(q) ||
      (a.email || '').toLowerCase().includes(q) ||
      (a.interest_topic || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            Organization Transformation Diagnostic Funnel
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font">
            ผลการประเมินองค์กร (Assessments & Diagnostics)
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            รายชื่อผู้บริหารและองค์กรที่ทำแบบประเมิน 4 มิติผ่านระบบ พร้อมคะแนนวินิจฉัยและข้อเสนอแนะ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/assessment"
            target="_blank"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> ดูหน้าแบบประเมินจริง
          </Link>
          <button
            onClick={fetchAssessments}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> รีเฟรชข้อมูล
          </button>
        </div>
      </div>

      {/* Funnel Pipeline KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase">ทำแบบประเมินทั้งหมด</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#111827]">
            {loading ? '—' : assessments.length}
          </div>
          <p className="text-[11px] text-blue-600 font-bold mt-1">องค์กรที่ทำ Diagnostic</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase">รอติดต่อกลับ</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600">
            {loading ? '—' : assessments.filter(a => a.status === 'new' || !a.status).length}
          </div>
          <p className="text-[11px] text-gray-500 font-medium mt-1">ต้องการรายงาน & นัดคุย</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase">ประสานงานแล้ว</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-700">
            {loading ? '—' : assessments.filter(a => a.status === 'contacted').length}
          </div>
          <p className="text-[11px] text-gray-500 font-medium mt-1">อยู่ระหว่าง Consultation</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase">Conversion</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-700">
            {assessments.length ? '100%' : '0%'}
          </div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">Lead Capture Rate</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาชื่อองค์กร, ผู้บริหาร, เบอร์โทร, หรือผลคะแนน..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2563EB] outline-none"
          />
        </div>
      </div>

      {/* Assessment Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-gray-400 font-bold">กำลังโหลดผลการประเมิน...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-500">
          <Target className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-base font-bold text-gray-700">ยังไม่มีข้อมูลผลการประเมิน</p>
          <p className="text-xs text-gray-400 mt-1">เมื่อมีผู้ใช้งานทำแบบประเมินผ่านหน้า /assessment ข้อมูลจะมาปรากฏที่นี่ทันที</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                    Assessment Result
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {new Date(item.created_at).toLocaleDateString('th-TH')}
                  </span>
                </div>

                <h3 className="font-black text-lg text-[#0F2557] nav-font mb-1 line-clamp-1">
                  {item.company || 'ไม่ระบุชื่อองค์กร'}
                </h3>
                <p className="text-xs text-gray-600 font-bold flex items-center gap-1.5 mb-3">
                  <User className="w-3.5 h-3.5 text-[#2563EB]" /> {item.name}
                </p>

                {/* Score & Interest Summary */}
                <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100 mb-4 space-y-2 text-xs">
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {item.interest_topic || 'ต้องการประเมินความพร้อมและวางแผนพัฒนาองค์กร'}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                  {item.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <a href={`tel:${item.phone}`} className="font-bold hover:text-[#2563EB]">{item.phone}</a>
                    </div>
                  )}
                  {item.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      <span className="truncate">{item.email}</span>
                    </div>
                  )}
                  {item.line_id && (
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                      <span>LINE: {item.line_id}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                <button
                  onClick={() => handleCreateProposalFromAssessment(item)}
                  className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  ออกใบเสนอราคา (Create Proposal)
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardAssessments;
