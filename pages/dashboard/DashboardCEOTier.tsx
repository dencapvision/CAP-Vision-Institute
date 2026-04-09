import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { 
  TrendingUp, Users, CreditCard, Clock, 
  Search, Filter, ChevronRight, CheckCircle2, 
  XCircle, MoreVertical, Eye, Download,
  ArrowUpRight, ArrowDownRight, Building2,
  Mail, Phone, Briefcase, Crown
} from 'lucide-react';

interface CEOBooking {
  id: string;
  booking_code: string;
  type: string;
  status: string;
  created_at: string;
  profiles: {
    full_name: string;
    company: string;
    email: string;
    phone: string;
    revenue_range: string;
    challenge: string;
  };
  ceo_payments: {
    amount: number;
    status: string;
    paid_at: string;
  }[];
}

const DashboardCEOTier: React.FC = () => {
  const [bookings, setBookings] = useState<CEOBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeMembers: 0,
    pendingBookings: 0,
    completionRate: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ceo_bookings')
        .select(`
          *,
          profiles:user_id (*),
          ceo_payments (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedData = data as any[];
      setBookings(formattedData);

      // Calculate stats
      const completedPayments = formattedData.reduce((acc, b) => {
        const paid = b.ceo_payments?.filter((p: any) => p.status === 'completed') || [];
        return acc + paid.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
      }, 0);

      const active = formattedData.filter(b => b.status === 'confirmed').length;
      const pending = formattedData.filter(b => b.status === 'pending').length;

      setStats({
        totalRevenue: completedPayments,
        activeMembers: active,
        pendingBookings: pending,
        completionRate: formattedData.length > 0 ? (active / formattedData.length) * 100 : 0
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.profiles?.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.booking_code?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || b.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('ceo_bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      fetchData(); // Refresh
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in text-[#0f3460]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0f3460] mb-2 uppercase tracking-tight">CEO Tier Management</h1>
          <p className="text-gray-500 text-sm font-medium">จัดการข้อมูลผู้สมัครและยอดรายได้สมาชิก VIP</p>
        </div>
        <button 
          onClick={fetchData}
          className="bg-white border border-gray-200 text-[#0f3460] px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          รีเฟรชข้อมูล
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="ยอดรายได้ทั้งหมด" 
          value={`${stats.totalRevenue.toLocaleString()} ฿`} 
          icon={<TrendingUp className="w-6 h-6" />}
          trend="+12.5% vs last month"
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard 
          title="สมาชิกปัจจุบัน" 
          value={stats.activeMembers} 
          icon={<Users className="w-6 h-6" />}
          trend={`${stats.activeMembers} Active Seats`}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard 
          title="รายการรอการยืนยัน" 
          value={stats.pendingBookings} 
          icon={<Clock className="w-6 h-6" />}
          trend="Need immediate review"
          color="bg-amber-50 text-amber-600"
        />
        <StatCard 
          title="อัตราการตอบรับ" 
          value={`${stats.completionRate.toFixed(1)}%`} 
          icon={<CheckCircle2 className="w-6 h-6" />}
          trend="Quality screening active"
          color="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="ค้นหาชื่อ, บริษัท, รหัสการจอง..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#c5a059]/20 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-[#c5a059]/20"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">ทุกสถานะ</option>
              <option value="pending">รอการตรวจสอบ (Pending)</option>
              <option value="confirmed">ยืนยันแล้ว (Confirmed)</option>
              <option value="rejected">ปฏิเสธ (Rejected)</option>
              <option value="cancelled">ยกเลิก (Cancelled)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Applicant</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Company & Revenue</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Type</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center font-bold text-gray-500 uppercase">
                        {booking.profiles?.full_name?.substring(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0f3460]">{booking.profiles?.full_name}</div>
                        <div className="text-[11px] text-gray-400 font-medium">{booking.booking_code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div>
                      <div className="text-sm font-medium text-gray-600">{booking.profiles?.company}</div>
                      <div className="text-[11px] font-bold text-[#c5a059] uppercase tracking-wider">{booking.profiles?.revenue_range}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${
                      booking.type === 'membership' ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {booking.type}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-xs text-gray-500 font-medium">
                      {new Date(booking.created_at).toLocaleDateString('th-TH', { 
                        day: 'numeric', month: 'short', year: '2-digit' 
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <button 
                        onClick={() => updateStatus(booking.id, 'confirmed')}
                        disabled={booking.status === 'confirmed'}
                        className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors disabled:opacity-30"
                        title="Confirm"
                       >
                         <CheckCircle2 className="w-4 h-4" />
                       </button>
                       <button 
                        onClick={() => updateStatus(booking.id, 'rejected')}
                        disabled={booking.status === 'rejected'}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-30"
                        title="Reject"
                       >
                         <XCircle className="w-4 h-4" />
                       </button>
                       <button 
                        className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors"
                        title="View Details"
                        onClick={() => alert(`Challenges: ${booking.profiles?.challenge}`)}
                       >
                         <Eye className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredBookings.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium">ไม่พบข้อมูลผู้สมัครที่ค้นหา</p>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 duration-500 ${color}`}>
        {icon}
      </div>
      {trend.includes('+') ? (
        <span className="text-emerald-500 text-[10px] font-bold flex items-center gap-0.5">
          <ArrowUpRight className="w-3 h-3" />
          {trend.split(' ')[0]}
        </span>
      ) : (
        <span className="text-gray-400 text-[10px] font-bold">
          {trend}
        </span>
      )}
    </div>
    <div className="text-2xl font-black text-[#0f3460] mb-1">{value}</div>
    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">{title}</div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    pending: 'bg-amber-50 text-amber-600 border-amber-100',
    confirmed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    rejected: 'bg-red-50 text-red-600 border-red-100',
    cancelled: 'bg-gray-50 text-gray-500 border-gray-100',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border tracking-widest ${styles[status] || styles.pending}`}>
      {status}
    </span>
  );
};

export default DashboardCEOTier;
