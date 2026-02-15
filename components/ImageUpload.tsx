import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
    onUploadSuccess: (url: string) => void;
    bucketName?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess, bucketName = 'media' }) => {
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            setStatus('idle');

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);

            if (data?.publicUrl) {
                onUploadSuccess(data.publicUrl);
                setStatus('success');
            }

        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#c5a059] transition-colors relative">
            <input
                type="file"
                accept="image/*"
                onChange={uploadImage}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                {uploading ? (
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f3460]"></div>
                ) : status === 'success' ? (
                    <CheckCircle className="h-12 w-12 text-green-500" />
                ) : status === 'error' ? (
                    <AlertCircle className="h-12 w-12 text-red-500" />
                ) : (
                    <Upload className="h-12 w-12 text-gray-400" />
                )}

                <div>
                    <p className="text-sm font-medium text-gray-900">
                        {uploading ? 'กำลังอัปโหลด...' : status === 'success' ? 'อัปโหลดสำเร็จ!' : 'คลิกหรือลากไฟล์มาที่นี่เพื่ออัปโหลด'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        รองรับไฟล์ PNG, JPG, GIF (ขนาดสูงสุด 5MB)
                    </p>
                </div>

                {status === 'error' && (
                    <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
