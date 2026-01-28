import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Lock, Mail, User, ArrowRight, Loader2, GraduationCap } from 'lucide-react';

const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as any)?.from || '/lms-profile';

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        },
                    },
                });
                if (error) throw error;
                alert('ลงทะเบียนสมัครสมาชิกเรียบร้อยแล้ว! กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันตัวตน');
                setIsLogin(true);
                setLoading(false);
                return;
            }
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 py-12">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-[#0f3460] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-900/20">
                        <GraduationCap className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-[#0f3460] nav-font">
                        {isLogin ? 'เข้าสู่ระบบเรียนออนไลน์' : 'สมัครสมาชิกใหม่'}
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        {isLogin ? 'เริ่มต้นพัฒนาศักยภาพของคุณตั้งแต่วันนี้' : 'ร่วมเป็นส่วนหนึ่งของสังคมแห่งการเรียนรู้'}
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl border border-blue-100/50 p-8 md:p-10">
                    <form onSubmit={handleAuth} className="space-y-6">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">ชื่อ-นามสกุล</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                    <input
                                        required
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a059] font-medium"
                                        placeholder="ภาษาไทย หรือ English"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">อีเมล</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a059] font-medium"
                                    placeholder="example@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">รหัสผ่าน</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#c5a059] font-medium"
                                    placeholder="ระบุรหัสผ่านของคุณ"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-[#0f3460] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#0b2a4a] transition-all nav-font shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 group"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? 'เข้าสู่ระบบ' : 'ลงทะเบียนตอนนี้'}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-[#0f3460] font-bold text-sm hover:text-[#c5a059] transition-colors nav-font"
                        >
                            {isLogin ? 'ยังไม่มีบัญชี? สมัครสมาชิกที่นี่' : 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
