import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, Calendar, ShieldCheck, Clock, 
  ChevronRight, MessageSquare, Download,
  Settings, LogOut, LayoutDashboard,
  Star, Lock, BookOpen, Users, Bell
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const CEOMemberDashboard: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      // Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(profileData);

      // Fetch Bookings
      const { data: bookingsData } = await supabase
        .from('ceo_bookings')
        .select(`
          *,
          ceo_payments (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setBookings(bookingsData || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070715] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070715] text-white selection:bg-[#c5a059]/30">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col border-r border-white/5 bg-[#0a0a1a]">
        <div className="flex flex-col flex-grow pt-10 px-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-[#c5a059] rounded-xl flex items-center justify-center text-[#0a0a1a]">
              <Crown className="w-6 h-6" />
            </div>
            <span className="text-xl font-black nav-font tracking-tight">CEO MEMBER</span>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem icon={<LayoutDashboard />} label="Dashboard" active />
            <NavItem icon={<Calendar />} label="Sessions" />
            <NavItem icon={<BookOpen />} label="Exclusive Content" />
            <NavItem icon={<Users />} label="Community" />
            <NavItem icon={<Settings />} label="Preferences" />
          </nav>

          <div className="pb-10">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 text-white/30 hover:text-red-400 transition-colors font-bold text-sm"
            >
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-8 lg:px-12 sticky top-0 bg-[#070715]/80 backdrop-blur-xl z-30 border-b border-white/5">
           <div className="flex items-center gap-4 lg:hidden">
              <div className="w-8 h-8 bg-[#c5a059] rounded-lg flex items-center justify-center text-[#0a0a1a]">
                <Crown className="w-5 h-5" />
              </div>
           </div>
           
           <div className="flex-1" />

           <div className="flex items-center gap-6">
              <button className="relative p-2 text-white/40 hover:text-white transition-colors">
                 <Bell className="w-6 h-6" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#070715]"></span>
              </button>
              <div className="flex items-center gap-3 border-l border-white/10 pl-6 cursor-pointer group">
                 <div className="text-right hidden sm:block">
                    <div className="text-sm font-black text-white">{profile?.full_name || 'CEO Member'}</div>
                    <div className="text-[10px] text-[#c5a059] font-black uppercase tracking-widest">{profile?.position || 'Executive'}</div>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 overflow-hidden">
                    {/* Profile Image could go here */}
                 </div>
              </div>
           </div>
        </header>

        <main className="p-8 lg:p-12 space-y-12">
          {/* Hero / Welcome */}
          <section className="relative overflow-hidden p-10 lg:p-16 rounded-[3.5rem] bg-gradient-to-br from-[#0a0a20] to-[#070715] border border-white/5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/30 px-4 py-1.5 rounded-full">
                    <Star className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.2em]">Diamond Tier Access</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black nav-font leading-tight">
                    Welcome back, <br className="hidden sm:block" /> {profile?.full_name?.split(' ')[0] || 'Member'}
                  </h1>
                  <p className="text-white/40 text-lg font-medium">ทุกการตัดสินใจของคุณ... จะมีความหมายมากขึ้นที่นี่</p>
               </div>
               
               <div className="flex gap-4">
                  <button className="bg-[#c5a059] text-[#0a0a1a] px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 hover:translate-y-[-2px] transition-all shadow-lg shadow-[#c5a059]/20">
                    Book Next Session <ChevronRight className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <StatCard 
               icon={<Calendar className="w-6 h-6" />}
               label="Next Session"
               value="Waiting Confirmation"
               desc="Check your LINE for updates"
             />
             <StatCard 
               icon={<ShieldCheck className="w-6 h-6" />}
               label="Membership Status"
               value="Active"
               desc="Access valid until 2024-12-31"
             />
             <StatCard 
               icon={<Clock className="w-6 h-6" />}
               label="Sessions Attended"
               value={bookings.length.toString()}
               desc="Keep growing, Leader"
             />
          </section>

          {/* Bookings & Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
             {/* Recent Bookings */}
             <div className="xl:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-black nav-font">Booking History</h2>
                   <button className="text-[#c5a059] text-xs font-black uppercase tracking-widest hover:underline">View All</button>
                </div>
                
                <div className="space-y-4">
                  {bookings.length > 0 ? bookings.map((booking) => (
                    <div key={booking.id} className="glass-panel border-white/5 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-white/[0.03] transition-all group">
                       <div className="flex items-center gap-6">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                            booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 
                            booking.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-white/5 text-white/20'
                          }`}>
                            <ShieldCheck className="w-7 h-7" />
                          </div>
                          <div>
                             <div className="font-black text-lg text-white group-hover:text-[#c5a059] transition-colors">{booking.session_date || 'Individual Session'}</div>
                             <div className="text-xs text-white/30 font-bold uppercase tracking-widest mt-1">ID: {booking.booking_code}</div>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-8">
                          <div className="text-right">
                             <div className={`text-sm font-black uppercase tracking-widest ${
                                booking.status === 'confirmed' ? 'text-green-500' : 'text-yellow-500'
                             }`}>{booking.status}</div>
                             <div className="text-[10px] text-white/20 font-bold mt-1">Status</div>
                          </div>
                          <button className="p-3 bg-white/5 rounded-xl text-white/30 hover:bg-white/10 hover:text-white transition-all">
                             <Download className="w-5 h-5" />
                          </button>
                       </div>
                    </div>
                  )) : (
                    <div className="text-center py-20 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/5">
                       <Clock className="w-12 h-12 text-white/10 mx-auto mb-4" />
                       <p className="text-white/30 font-bold">No bookings found</p>
                    </div>
                  )}
                </div>
             </div>

             {/* Exclusive Sidebar */}
             <div className="space-y-8">
                <h2 className="text-2xl font-black nav-font">Private Library</h2>
                <div className="space-y-4">
                   <ContentCard 
                     title="Decision Making under Pressure"
                     type="Exclusive PDF"
                     locked={false}
                   />
                   <ContentCard 
                     title="CEO 2024 Market Forecast"
                     type="Private Analysis"
                     locked={true}
                   />
                   <ContentCard 
                     title="Roundtable #01 Highlights"
                     type="Video Recording"
                     locked={true}
                   />
                </div>

                <div className="p-8 rounded-[2.5rem] bg-[#c5a059]/10 border border-[#c5a059]/20 relative overflow-hidden group cursor-pointer">
                   <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#c5a059]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                   <MessageSquare className="w-10 h-10 text-[#c5a059] mb-6" />
                   <h3 className="text-xl font-black text-white nav-font mb-2">Need Assistance?</h3>
                   <p className="text-white/50 text-sm font-bold leading-relaxed mb-6">ติดต่อหัวหน้าทีมดูแล CEO ของคุณได้โดยตรงผ่านช่องทางพิเศษ</p>
                   <button className="w-full py-4 bg-[#c5a059] text-[#0a0a1a] rounded-xl font-black text-xs uppercase tracking-[.2em]">Contact Advisor</button>
                </div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Sub-components
const NavItem = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <button className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-black text-sm transition-all group ${
    active ? 'bg-[#c5a059]/10 text-[#c5a059]' : 'text-white/40 hover:bg-white/5 hover:text-white'
  }`}>
    <div className={`transition-transform group-hover:scale-110 ${active ? 'text-[#c5a059]' : 'text-inherit'}`}>
      {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
    </div>
    {label}
  </button>
);

const StatCard = ({ icon, label, value, desc }: { icon: any, label: string, value: string, desc: string }) => (
  <div className="p-8 rounded-[2.5rem] bg-[#0a0a1a] border border-white/5 hover:border-[#c5a059]/30 transition-all group">
    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#c5a059] mb-6 group-hover:scale-110 group-hover:bg-[#c5a059]/10 transition-all">
       {icon}
    </div>
    <div className="text-xs text-white/30 font-black uppercase tracking-[0.2em] mb-2">{label}</div>
    <div className="text-2xl font-black text-white group-hover:text-[#c5a059] transition-colors mb-2">{value}</div>
    <div className="text-[10px] text-white/20 font-bold uppercase tracking-wider">{desc}</div>
  </div>
);

const ContentCard = ({ title, type, locked }: { title: string, type: string, locked: boolean }) => (
  <div className={`p-6 rounded-3xl border transition-all flex items-center justify-between group ${
    locked ? 'bg-white/[0.01] border-white/5 cursor-not-allowed grayscale' : 'bg-white/[0.03] border-white/10 hover:border-[#c5a059]/40 cursor-pointer'
  }`}>
    <div className="flex items-center gap-4">
       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${locked ? 'bg-white/5 text-white/20' : 'bg-[#c5a059]/10 text-[#c5a059]'}`}>
          {locked ? <Lock className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
       </div>
       <div>
          <div className="font-black text-sm text-white">{title}</div>
          <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mt-1">{type}</div>
       </div>
    </div>
    {!locked && <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-[#c5a059] transition-all" />}
  </div>
);

export default CEOMemberDashboard;
