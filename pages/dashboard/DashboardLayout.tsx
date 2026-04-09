import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
  LayoutDashboard, BookOpen, Users, Sparkles, FileText,
  Briefcase, BarChart3, LogOut, Menu, X, ChevronRight, Library, Crown
} from 'lucide-react';

const NAV = [
  { to: '/dashboard', label: 'ภาพรวม', icon: LayoutDashboard, exact: true },
  { to: '/dashboard/ceo-tier', label: 'CEO Tier', icon: Crown },
  { to: '/dashboard/blog', label: 'บทความ', icon: FileText },
  { to: '/dashboard/resources', label: 'Resources', icon: Library },
  { to: '/dashboard/portfolio', label: 'Portfolio', icon: Briefcase },
  { to: '/dashboard/courses', label: 'หลักสูตร', icon: BookOpen },
  { to: '/dashboard/seo', label: 'SEO Analyzer', icon: BarChart3 },
  { to: '/dashboard/speakers', label: 'วิทยากร', icon: Users },
  { to: '/dashboard/ai-generator', label: 'Course AI', icon: Sparkles },
];

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login', { state: { from: location.pathname }, replace: true });
      } else {
        setEmail(session.user.email ?? '');
        setChecking(false);
      }
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login', { replace: true });
  };

  const isActive = (item: (typeof NAV)[0]) => {
    if (item.exact) return location.pathname === item.to;
    return location.pathname.startsWith(item.to);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0f1623] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const Sidebar = () => (
    <aside className="w-64 bg-[#0f1623] text-white flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 pt-8 pb-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#c5a059] rounded-lg flex items-center justify-center">
            <span className="text-xs font-black text-white">CV</span>
          </div>
          <div>
            <div className="text-xs font-black text-white tracking-widest uppercase">CAP Vision</div>
            <div className="text-[10px] text-white/40 tracking-widest">Admin</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                active
                  ? 'bg-[#c5a059] text-white shadow-lg shadow-[#c5a059]/25'
                  : 'text-white/60 hover:bg-white/8 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-6 py-5 border-t border-white/10">
        <div className="text-xs text-white/40 truncate mb-3">{email}</div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-xs font-bold text-white/50 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          ออกจากระบบ
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:z-30">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-50 flex flex-col w-64">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 gap-4 sticky top-0 z-20">
          <button
            className="lg:hidden text-gray-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <Link
            to="/"
            target="_blank"
            className="text-xs font-bold text-[#0f3460] hover:text-[#c5a059] transition-colors"
          >
            ดูเว็บไซต์
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
