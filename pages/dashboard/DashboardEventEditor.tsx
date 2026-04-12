import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

interface Instructor {
  id: string;
  name: string;
}

const DashboardEventEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    event_date: '',
    location: '',
    link: '',
    speaker_id: '',
    is_published: true,
  });

  const [errorObj, setErrorObj] = useState<{title?: string; link?: string}>({});

  useEffect(() => {
    fetchInstructors();
    if (isEditing && id) {
      fetchEvent(id);
    }
  }, [id, isEditing]);

  const fetchInstructors = async () => {
    const { data } = await supabase.from('instructors').select('id, name');
    if (data) setInstructors(data);
  };

  const fetchEvent = async (eventId: string) => {
    try {
      setFetching(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      
      if (data) {
        setFormData({
          title: data.title || '',
          event_date: data.event_date ? new Date(data.event_date).toISOString().slice(0, 16) : '',
          location: data.location || '',
          link: data.link || '',
          speaker_id: data.speaker_id || '',
          is_published: data.is_published ?? true,
        });
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      alert('ไม่พบข้อมูลอีเวนท์');
      navigate('/dashboard/events');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // @ts-ignore
    const checked = type === 'checkbox' ? e.target.checked : undefined;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // clear errors
    if (errorObj[name as keyof typeof errorObj]) {
      setErrorObj(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errs: any = {};
    if (!formData.title.trim()) errs.title = 'กรุณาระบุหัวข้ออีเวนท์';
    if (formData.link && !formData.link.startsWith('http')) errs.link = 'กรุณาระบุ URL ให้ถูกต้อง เช่น https://...';
    
    if (Object.keys(errs).length > 0) {
      setErrorObj(errs);
      return;
    }

    try {
      setLoading(true);
      
      const payload = {
        title: formData.title,
        event_date: formData.event_date || null,
        location: formData.location || null,
        link: formData.link || null,
        speaker_id: formData.speaker_id || null,
        is_published: formData.is_published,
      };

      if (isEditing && id) {
        const { error } = await supabase
          .from('events')
          .update(payload)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('events')
          .insert([payload]);
        if (error) throw error;
      }

      navigate('/dashboard/events');
    } catch (error) {
      console.error('Error saving event:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#c5a059]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/events" className="p-2 bg-white rounded-xl shadow-sm text-gray-500 hover:text-[#0f3460] transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font">
            {isEditing ? 'แก้ไขอีเวนท์' : 'สร้างอีเวนท์ใหม่'}
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#0f3460] nav-font">หัวข้ออีเวนท์ *</label>
            <input 
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]" 
              placeholder="เช่น The Modern Facilitator Workshop" 
            />
            {errorObj.title && <p className="text-red-500 text-sm mt-1">{errorObj.title}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0f3460] nav-font">วันที่และเวลา</label>
              <input 
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
                type="datetime-local" 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0f3460] nav-font">สถานที่</label>
              <input 
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text" 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]" 
                placeholder="เช่น โรงแรมอโนมา แกรนด์ กรุงเทพฯ" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#0f3460] nav-font">ลิงก์ลงทะเบียน / รายละเอียดเพิ่มเติม</label>
            <input 
              name="link"
              value={formData.link}
              onChange={handleChange}
              type="text" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]" 
              placeholder="https://" 
            />
            {errorObj.link && <p className="text-red-500 text-sm mt-1">{errorObj.link}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0f3460] nav-font">วิทยากร (ถ้ามี)</label>
              <select 
                name="speaker_id"
                value={formData.speaker_id}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a059]"
              >
                <option value="">-- ไม่ระบุ --</option>
                {instructors.map(inst => (
                  <option key={inst.id} value={inst.id}>{inst.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2 flex flex-col justify-center pt-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleChange}
                  type="checkbox" 
                  className="w-6 h-6 rounded text-[#c5a059] focus:ring-[#c5a059]" 
                />
                <span className="text-sm font-bold text-[#0f3460] nav-font">แสดงบนเว็บไซต์ (Published)</span>
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <Link 
              to="/dashboard/events" 
              className="px-8 py-4 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition-colors nav-font"
            >
              ยกเลิก
            </Link>
            <button 
              type="submit" 
              disabled={loading}
              className="px-8 py-4 bg-[#0f3460] text-white rounded-xl font-bold hover:bg-[#c5a059] transition-colors flex items-center gap-2 nav-font disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isEditing ? 'อัปเดตข้อมูล' : 'บันทึกข้อมูล'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardEventEditor;
