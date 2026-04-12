import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Admin Client — ใช้ service_role key
 * ⚠️ ใช้เฉพาะสำหรับ server-side operations เช่น file upload ที่ต้อง bypass RLS
 * ห้ามใช้ใน queries ที่เกี่ยวกับข้อมูล user เพราะ bypass RLS ทั้งหมด
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseServiceRole = import.meta.env.VITE_SUPABASE_service_role as string;

export const supabaseAdmin = createClient(supabaseUrl ?? '', supabaseServiceRole ?? '', {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
