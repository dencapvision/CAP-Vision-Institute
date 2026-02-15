import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import ImageUpload from '../components/ImageUpload';
import SEO from '../components/SEO';
import { Trash2, Copy, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface MediaFile {
    name: string;
    id: string;
    updated_at: string;
    created_at: string;
    last_accessed_at: string;
    metadata: any;
}

const MediaManager: React.FC = () => {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [bucketExists, setBucketExists] = useState(true);

    const fetchFiles = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.storage.from('media').list();

            if (error) {
                if (error.message.includes('not found')) {
                    setBucketExists(false);
                }
                throw error;
            }

            setFiles(data as MediaFile[]);
        } catch (error) {
            console.error('Error fetching files:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const deleteFile = async (name: string) => {
        if (!window.confirm('คุณต้องการลบไฟล์นี้ใช่หรือไม่?')) return;

        try {
            const { error } = await supabase.storage.from('media').remove([name]);
            if (error) throw error;
            fetchFiles();
        } catch (error) {
            alert('ไม่สามารถลบไฟล์ได้ กรุณาลองใหม่อีกครั้ง');
        }
    };

    const copyUrl = (name: string) => {
        const { data } = supabase.storage.from('media').getPublicUrl(name);
        if (data?.publicUrl) {
            navigator.clipboard.writeText(data.publicUrl);
            alert('คัดลอก URL เรียบร้อยแล้ว!');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
            <SEO title="Media Manager" description="จัดการรูปภาพและไฟล์สื่อสำหรับเว็บไซต์" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0f3460] nav-font">คลังสื่อ (Media Manager)</h1>
                        <p className="text-gray-600 mt-2">อัปโหลดและจัดการรูปภาพสำหรับใช้งานในเว็บไซต์</p>
                    </div>
                </div>

                {!bucketExists ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-800">
                        <h3 className="font-bold flex items-center gap-2 mb-2">
                            <AlertCircle className="h-5 w-5" />
                            ไม่พบบร็อกเก็ต 'media'
                        </h3>
                        <p>กรุณาสร้าง Bucket ชื่อ <strong>'media'</strong> ใน Supabase Storage และตั้งค่าเป็น <strong>Public</strong> เพื่อใช้งานระบบนี้</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Upload Section */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
                                <h3 className="text-lg font-bold text-[#0f3460] mb-4 nav-font">อัปโหลดภาพใหม่</h3>
                                <ImageUpload onUploadSuccess={() => fetchFiles()} />
                            </div>
                        </div>

                        {/* Gallery Section */}
                        <div className="lg:col-span-2">
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f3460]"></div>
                                </div>
                            ) : files.length === 0 ? (
                                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
                                    <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                    <p>ยังไม่มีไฟล์ในคลังสื่อ เริ่มต้นด้วยการอัปโหลดภาพด้านข้าง</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {files.map((file) => {
                                        const { data } = supabase.storage.from('media').getPublicUrl(file.name);
                                        return (
                                            <div key={file.id} className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                                                <div className="aspect-square bg-gray-100 overflow-hidden">
                                                    <img
                                                        src={data.publicUrl}
                                                        alt={file.name}
                                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                    />
                                                </div>
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                    <button
                                                        onClick={() => copyUrl(file.name)}
                                                        className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50"
                                                        title="คัดลอก URL"
                                                    >
                                                        <Copy size={18} />
                                                    </button>
                                                    <a
                                                        href={data.publicUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-white rounded-full text-green-600 hover:bg-green-50"
                                                        title="เปิดหน้าต่างใหม่"
                                                    >
                                                        <ExternalLink size={18} />
                                                    </a>
                                                    <button
                                                        onClick={() => deleteFile(file.name)}
                                                        className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                                                        title="ลบไฟล์"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                                <div className="p-2 text-[10px] text-gray-500 truncate bg-white">
                                                    {file.name}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaManager;

const AlertCircle = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
);
