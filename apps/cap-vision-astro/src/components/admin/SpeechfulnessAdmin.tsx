import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock, 
  CreditCard, 
  FileText, 
  Search,
  Filter,
  MoreVertical,
  Download,
  Mail,
  Phone,
  LayoutDashboard
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Simple date formatter to avoid dependency weight in bundle
const formatDateString = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
  } catch (e) {
    return dateStr;
  }
};

export default function SpeechfulnessAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showSlipModal, setShowSlipModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ceo_bookings')
        .select(`
          *,
          payments:ceo_payments(*),
          profile:profiles(full_name, phone_number)
        `)
        .eq('package_name', 'CEO Speechfulness 3 เดือน')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatus(bookingId: string, status: string) {
    try {
      const { error } = await supabase
        .from('ceo_bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;
      
      // Update local state
      const booking = items.find(item => item.id === bookingId);
      setItems(items.map(item => item.id === bookingId ? { ...item, status } : item));
      
      // Notify via centralized Astro API endpoint
      await fetch('/api/line-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: 'CEO_SPEECHFULNESS',
          formType: 'อัปเดตสถานะการจอง CEO Speechfulness',
          data: {
            'ID การจอง': bookingId,
            'ลูกค้า': booking?.profile?.full_name || booking?.user_email || 'N/A',
            'สถานะใหม่': status === 'confirmed' ? 'ชำระเงินแล้ว (ยืนยัน)' : status,
            'ผู้ดำเนินการ': 'Admin Portal (Astro)'
          }
        })
      });

    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle size={12}/> Confirmed</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1"><XCircle size={12}/> Rejected</span>;
      case 'pending_payment':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1"><Clock size={12}/> Pending Payment</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 text-[#0f3460] mb-2">
            <LayoutDashboard size={24} className="text-[#c5a059]" />
            <h1 className="text-3xl font-black nav-font tracking-tight">CEO Speechfulness Management</h1>
          </div>
          <p className="text-gray-500 font-medium">จัดการคิวสมัคร, ตรวจสอบการชำระเงิน และอนุมัติสิทธิ์เข้าเรียน</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm shadow-sm cursor-pointer">
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Enrolled', value: items.length, icon: <FileText className="text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'Pending Review', value: items.filter(i => i.status === 'pending_payment').length, icon: <Clock className="text-yellow-500" />, bg: 'bg-yellow-50' },
          { label: 'Confirmed', value: items.filter(i => i.status === 'confirmed').length, icon: <CheckCircle className="text-green-500" />, bg: 'bg-green-50' },
          { label: 'Total Revenue', value: '฿' + items.filter(i => i.status === 'confirmed').reduce((acc, curr) => acc + (curr.total_amount || 0), 0).toLocaleString(), icon: <CreditCard className="text-[#c5a059]" />, bg: 'bg-[#c5a059]/10' }
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-[2rem] border border-gray-100 shadow-sm ${stat.bg} flex items-center gap-5`}>
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-[#0f3460] nav-font">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#c5a059] font-medium"
          />
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-6 pr-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#c5a059] font-bold text-[#0f3460] text-sm appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending_payment">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Package & Plan</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Payment</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-medium italic">
                    {loading ? 'Loading data...' : 'No registrations found matching your filters.'}
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#0f3460] text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-blue-900/10">
                          {item.profile?.full_name?.charAt(0) || item.user_email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-black text-[#0f3460] nav-font">{item.profile?.full_name || 'No Name'}</p>
                          <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
                            <Mail size={10} /> {item.user_email}
                          </p>
                          <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
                            <Phone size={10} /> {item.profile?.phone_number || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div>
                        <p className="text-sm font-bold text-[#0f3460] mb-1">{item.package_name}</p>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-2">
                          Date: {formatDateString(item.created_at)}
                        </p>
                        {item.is_vat && (
                          <span className="mt-2 inline-block px-2 py-0.5 bg-[#c5a059]/10 text-[#c5a059] rounded text-[10px] font-black uppercase">TAX INVOICE REQ.</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-black text-[#0f3460] nav-font">฿{item.total_amount?.toLocaleString()}</p>
                        {item.payments && item.payments.length > 0 ? (
                          <button 
                            onClick={() => {
                              setSelectedItem(item);
                              setShowSlipModal(true);
                            }}
                            className="flex items-center gap-2 text-[#c5a059] text-xs font-black uppercase hover:underline cursor-pointer"
                          >
                            <Eye size={12} /> View Slip
                          </button>
                        ) : (
                          <span className="text-[10px] text-red-400 font-bold uppercase">No Slip Uploaded</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleUpdateStatus(item.id, 'confirmed')}
                          className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm cursor-pointer"
                          title="Confirm Enrollment"
                        >
                          <CheckCircle size={20} />
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(item.id, 'rejected')}
                          className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-650 hover:text-white transition-all shadow-sm cursor-pointer"
                          title="Reject / Cancel"
                        >
                          <XCircle size={20} />
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

      {/* Slip Preview Modal */}
      {showSlipModal && selectedItem && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-[#0f3460] text-white">
              <div>
                <h3 className="text-2xl font-black nav-font tracking-tight">Proof of Payment</h3>
                <p className="text-white/60 text-sm font-medium">{selectedItem.profile?.full_name} · ฿{selectedItem.total_amount?.toLocaleString()}</p>
              </div>
              <button onClick={() => setShowSlipModal(false)} className="p-2 hover:bg-white/10 rounded-full cursor-pointer">
                <XCircle size={32} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="bg-gray-100 p-8 flex items-center justify-center min-h-[500px]">
                {selectedItem.payments?.[0]?.slip_url ? (
                  <img 
                    src={selectedItem.payments[0].slip_url} 
                    alt="Payment Slip" 
                    className="max-w-full max-h-[600px] shadow-2xl rounded-2xl border-8 border-white"
                  />
                ) : (
                  <div className="text-gray-400 italic">No slip image available</div>
                )}
              </div>
              
              <div className="p-10 space-y-10 bg-white">
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Verification Details</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-50 pb-4">
                      <span className="text-gray-500 font-medium">Customer Name</span>
                      <span className="text-[#0f3460] font-black">{selectedItem.profile?.full_name}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-4">
                      <span className="text-gray-500 font-medium">Package</span>
                      <span className="text-[#0f3460] font-black">{selectedItem.package_name}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-4">
                      <span className="text-gray-500 font-medium">VAT Request</span>
                      <span className={`font-black ${selectedItem.is_vat ? 'text-[#c5a059]' : 'text-gray-400'}`}>
                        {selectedItem.is_vat ? 'YES (7%)' : 'NO'}
                      </span>
                    </div>
                    {selectedItem.is_vat && (
                      <>
                        <div className="flex justify-between border-b border-gray-50 pb-4">
                          <span className="text-gray-500 font-medium">Tax ID</span>
                          <span className="text-[#0f3460] font-black">{selectedItem.profile?.tax_id}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-gray-500 font-medium text-xs font-black uppercase tracking-widest">Billing Address</span>
                          <span className="text-[#0f3460] font-bold bg-gray-50 p-4 rounded-xl text-sm leading-relaxed">{selectedItem.profile?.address}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verify Action</h4>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        handleUpdateStatus(selectedItem.id, 'confirmed');
                        setShowSlipModal(false);
                      }}
                      className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-green-900/10 hover:bg-green-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle size={20} /> Approve
                    </button>
                    <button 
                      onClick={() => {
                        handleUpdateStatus(selectedItem.id, 'rejected');
                        setShowSlipModal(false);
                      }}
                      className="flex-1 bg-white text-red-650 border-2 border-red-100 py-4 rounded-2xl font-black hover:bg-red-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <XCircle size={20} /> Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
