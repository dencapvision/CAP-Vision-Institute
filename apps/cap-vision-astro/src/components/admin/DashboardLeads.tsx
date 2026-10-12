import { adminError } from '../../lib/admin-access.mjs';
import { canWriteLeads } from '../../lib/lead-environment';
import React, { useState, useEffect } from 'react';
import { PIPELINE, pipelineStage } from '../../lib/lead-workflow.mjs';
import { supabase } from '../../lib/supabase';
import { MessageSquare, Calendar, Mail, Phone, Building, User, CheckCircle, Clock, Search, Loader2, FileText } from 'lucide-react';

interface Lead {
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
  pipeline_stage: string | null;
  follow_up_at: string | null;
  crm_notes: string | null;
}

const DashboardLeads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setErrorMessage(adminError(error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateLead = async (id: string, changes: Partial<Lead>) => {
    if (!canWriteLeads(window.location.hostname)) { setErrorMessage('เวอร์ชันทดสอบไม่อนุญาตให้แก้ข้อมูลฐาน Production'); return; }
    setSavingId(id);
    setErrorMessage('');
    try {
      const { data, error } = await supabase.from('leads').update(changes).eq('id', id).select('*').single();
      if(error)throw error;
      if(!data)throw new Error('ไม่มีรายการที่บันทึก');
      setLeads(current => current.map(lead => lead.id === id ? data : lead));
    } catch (error) {
      setErrorMessage(adminError(error).message);
    } finally { setSavingId(null); }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (lead.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || pipelineStage(lead) === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'contacted': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'won':
      case 'delivery':
      case 'repeat': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => PIPELINE[status as keyof typeof PIPELINE] || 'รอจัดประเภทจากข้อมูลเดิม';

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#c5a059]" />
      </div>
    );
  }

  if(errorMessage&&leads.length===0)return <div role="alert" className="bg-red-50 border rounded-xl p-5 space-y-3"><p>{errorMessage}</p><button onClick={fetchLeads} className="border rounded p-2">ลองใหม่</button><a href="/admin/system" className="block underline">ตรวจสถานะระบบ</a></div>;
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {errorMessage && <p role="alert" className="bg-red-50 p-4 text-red-700">{errorMessage}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(PIPELINE).map(([stage, label]) => <button key={stage} onClick={() => setStatusFilter(stage)} className="bg-white border rounded-xl p-3 text-left">
          <span className="block text-sm">{label}</span><strong>{leads.filter(l => pipelineStage(l) === stage).length}</strong>
        </button>)}
      </div>
      <p className="text-sm text-gray-600">ผู้สนใจจากฟอร์ม: {leads.filter(l => l.source === 'contact_form').length} · รอติดตาม: {leads.filter(l => l.follow_up_at && new Date(l.follow_up_at) <= new Date() && !['lost', 'repeat'].includes(pipelineStage(l))).length}</p>
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font">Leads & Inquiries</h1>
        <p className="text-gray-500 font-medium">จัดการรายชื่อผู้ที่ติดต่อเข้ามาผ่านเว็บไซต์</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาชื่อ, บริษัท, หรืออีเมล..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a059] outline-none"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {['all', ...Object.keys(PIPELINE)].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-bold nav-font transition-colors ${
                statusFilter === status 
                  ? 'bg-[#0f3460] text-white' 
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {status === 'all' ? 'ทั้งหมด' : getStatusLabel(status)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-[2rem] border border-gray-100">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p>ไม่พบข้อมูลผู้ติดต่อที่ตรงกับเงื่อนไข</p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(pipelineStage(lead))}`}>
                  {getStatusLabel(pipelineStage(lead))}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Intl.DateTimeFormat('th-TH', { 
                    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  }).format(new Date(lead.created_at))}
                </span>
              </div>
              
              <div className="mb-4 flex-1">
                <h3 className="font-black text-xl text-[#0f3460] nav-font mb-1 line-clamp-1">{lead.name}</h3>
                {lead.company && (
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-3">
                    <Building className="w-4 h-4" /> {lead.company}
                  </p>
                )}
                
                <div className="space-y-2 mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                  {lead.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#c5a059]" />
                      <a href={`tel:${lead.phone}`} className="hover:text-[#0f3460] font-medium">{lead.phone}</a>
                    </div>
                  )}
                  {lead.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#c5a059]" />
                      <a href={`mailto:${lead.email}`} className="hover:text-[#0f3460] font-medium truncate">{lead.email}</a>
                    </div>
                  )}
                  {lead.line_id && (
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#c5a059]" />
                      <span className="font-medium">LINE: {lead.line_id}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">ความสนใจ / เรื่องที่ติดต่อ</p>
                  <p className="text-sm text-gray-700 bg-blue-50/50 p-3 rounded-xl border border-blue-100/50 line-clamp-3">
                    {lead.interest_topic || lead.source}
                  </p>
                </div>
              </div>

              <form key={`${lead.id}-${lead.follow_up_at}-${lead.crm_notes}`} className="space-y-2 mb-4" onSubmit={e => {
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                const date = String(form.get('followUp') || '');
                updateLead(lead.id, {follow_up_at: date ? new Date(date).toISOString() : null, crm_notes: String(form.get('notes') || '')});
              }}>
                <label className="block text-xs">นัดติดตาม
                  <input name="followUp" type="datetime-local" defaultValue={lead.follow_up_at ? new Date(new Date(lead.follow_up_at).getTime() - new Date(lead.follow_up_at).getTimezoneOffset() * 60000).toISOString().slice(0,16) : ''} className="block w-full border rounded p-2" />
                </label>
                <label className="block text-xs">บันทึกทีมงาน
                  <textarea name="notes" maxLength={4000} defaultValue={lead.crm_notes || ''} className="block w-full border rounded p-2" />
                </label>
                <button disabled={savingId === lead.id} className="p-2 border rounded text-sm">{savingId === lead.id ? 'กำลังบันทึก...' : 'บันทึกการติดตาม'}</button>
              </form>
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                <a
                  href={`/admin/proposals?name=${encodeURIComponent(lead.name || '')}&company=${encodeURIComponent(lead.company || '')}&phone=${encodeURIComponent(lead.phone || '')}&email=${encodeURIComponent(lead.email || '')}&topic=${encodeURIComponent(lead.interest_topic || '')}`}
                  className="w-full bg-[#2563EB]/10 hover:bg-[#2563EB] text-[#2563EB] hover:text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-center"
                >
                  <FileText className="w-3.5 h-3.5" /> ออกใบเสนอราคา (Proposal)
                </a>
                <select
                  aria-label={`สถานะของ ${lead.name}`}
                  disabled={savingId === lead.id}
                  value={pipelineStage(lead)}
                  onChange={(e) => updateLead(lead.id, {pipeline_stage: e.target.value})}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a059] text-xs font-bold text-[#0f3460] cursor-pointer outline-none"
                >
                  <option value="" disabled>รอจัดประเภทจากข้อมูลเดิม</option>
                  {Object.entries(PIPELINE).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardLeads;
