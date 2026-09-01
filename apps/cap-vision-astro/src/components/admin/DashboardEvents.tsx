import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

import { Plus, Edit, Trash2, Calendar as CalendarIcon, MapPin, Eye, EyeOff, Loader2 } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  event_date: string;
  location: string;
  link: string;
  is_published: boolean;
  speaker_id: string;
}

const DashboardEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('ไม่สามารถโหลดข้อมูลอีเวนท์ได้');
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    if (!window.confirm('คุณต้องการลบอีเวนท์นี้ใช่หรือไม่?')) return;
    
    try {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
      setEvents(events.filter(e => e.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('เกิดข้อผิดพลาดในการลบข้อมูล');
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ is_published: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      setEvents(events.map(e => e.id === id ? { ...e, is_published: !currentStatus } : e));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('เกิดข้อผิดพลาดในการอัปเดตสถานะ');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#c5a059]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0f3460] nav-font">จัดการอีเวนท์</h1>
          <p className="text-gray-500 font-medium">จัดการตารางงาน สัมมนา และกิจกรรมต่างๆ</p>
        </div>
        <a href="/dashboard/events/new"
          className="bg-[#c5a059] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#e0c58e] hover:text-[#0f3460] transition-colors nav-font shadow-lg"
        >
          <Plus className="w-5 h-5" /> สร้างอีเวนท์ใหม่
        </a>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0f3460] text-white nav-font uppercase tracking-wider text-sm">
              <tr>
                <th className="p-4 pl-6 w-16">สถานะ</th>
                <th className="p-4">หัวข้ออีเวนท์</th>
                <th className="p-4">วันที่ / เวลา</th>
                <th className="p-4">สถานที่</th>
                <th className="p-4 text-right pr-6">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-500">
                    <CalendarIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    ยังไม่มีข้อมูลอีเวนท์
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 pl-6">
                      <button 
                        onClick={() => togglePublish(event.id, event.is_published)}
                        className={`p-2 rounded-xl transition-colors ${
                          event.is_published 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                        title={event.is_published ? "เผยแพร่แล้ว (คลิกเพื่อซ่อน)" : "ซ่อนไว้ (คลิกเพื่อเผยแพร่)"}
                      >
                        {event.is_published ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                    </td>
                    <td className="p-4">
                      <h3 className="font-bold text-[#0f3460] mb-1">{event.title}</h3>
                      {event.link && (
                        <a href={event.link} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">
                          {event.link}
                        </a>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarIcon className="w-4 h-4 text-[#c5a059]" />
                        <span className="font-medium text-sm">
                          {event.event_date ? new Intl.DateTimeFormat('th-TH', { 
                            year: 'numeric', month: 'short', day: 'numeric' 
                          }).format(new Date(event.event_date)) : 'ไม่ระบุวัน'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{event.location || '-'}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <a href={`/dashboard/events/edit/${event.id}`}
                          className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                          title="แก้ไข"
                        >
                          <Edit className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                          title="ลบ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardEvents;
