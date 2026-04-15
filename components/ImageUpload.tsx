import React, { useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Upload, X, CheckCircle, AlertCircle, ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    onUploadSuccess: (url: string) => void;
    bucketName?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess, bucketName = 'media' }) => {
    const [uploading, setUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [preview, setPreview] = useState<string | null>(null);

    const processUpload = async (file: File) => {
        try {
            setUploading(true);
            setStatus('idle');
            setErrorMessage('');

            // Generate preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file, { cacheControl: '604800', upsert: false }); // 7 days

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);

            if (data?.publicUrl) {
                onUploadSuccess(data.publicUrl);
                setStatus('success');
            }

        } catch (error: any) {
            console.error('Upload error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'เกิดข้อผิดพลาดในการอัปโหลด');
            setPreview(null);
        } finally {
            setUploading(false);
        }
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) processUpload(file);
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            processUpload(file);
        } else {
            setStatus('error');
            setErrorMessage('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
        }
    }, []);

    return (
        <div 
            className={`w-full max-w-md mx-auto transition-all duration-500 rounded-[2rem] p-1 
                ${isDragging ? 'bg-gradient-to-tr from-[#c5a059] to-[#0f3460] shadow-2xl scale-[1.02]' : 'bg-transparent'}`}
        >
            <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative group h-64 w-full rounded-[1.8rem] border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-500 
                    ${isDragging 
                        ? 'bg-white/90 backdrop-blur-xl border-white ring-4 ring-white/20' 
                        : 'bg-gray-50/50 border-gray-200 hover:border-[#c5a059] hover:bg-white/80'}`}
            >
                {/* Traditional Input (Still needed for mobile/accessibility) */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                {/* Upload UI Content */}
                <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 z-0 pointer-events-none">
                    {preview ? (
                        <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500 mb-2">
                            <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
                            {uploading && (
                                <div className="absolute inset-0 bg-[#0f3460]/60 backdrop-blur-sm flex items-center justify-center">
                                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={`p-6 rounded-3xl transition-all duration-500 
                            ${isDragging ? 'bg-[#c5a059]/10 scale-110' : 'bg-white shadow-lg shadow-gray-100 group-hover:shadow-[#c5a059]/10'}`}>
                            {uploading ? (
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0f3460]"></div>
                            ) : status === 'success' ? (
                                <CheckCircle className="h-10 w-10 text-green-500" />
                            ) : status === 'error' ? (
                                <AlertCircle className="h-10 w-10 text-red-500" />
                            ) : (
                                <Upload className={`h-10 w-10 transition-colors duration-500 ${isDragging ? 'text-[#c5a059]' : 'text-gray-400 group-hover:text-[#c5a059]'}`} />
                            )}
                        </div>
                    )}

                    <div className="space-y-1">
                        <p className={`text-sm font-black nav-font uppercase tracking-widest transition-colors duration-300
                            ${isDragging ? 'text-[#c5a059]' : 'text-[#0f3460]'}`}>
                            {uploading ? 'UPLOADING...' : status === 'success' ? 'UPLOAD SUCCESS!' : isDragging ? 'DROP TO UPLOAD' : 'UPLOAD IMAGE'}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                            {status === 'error' ? errorMessage : 'Drag & drop or click to browse'}
                        </p>
                    </div>

                    {status === 'success' && (
                        <div className="px-4 py-1 bg-green-50 rounded-full border border-green-100 animate-bounce">
                            <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">New asset added</span>
                        </div>
                    )}
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059]/20 to-transparent"></div>
            </div>
        </div>
    );
};

export default ImageUpload;
