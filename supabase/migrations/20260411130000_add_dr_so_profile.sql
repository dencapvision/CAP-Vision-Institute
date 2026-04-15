-- Migration: Add Dr. So Profile
-- Date: 2026-04-11
INSERT INTO public.instructors (slug, name, bio, image)
VALUES (
    'dr-so',
    'อาจารย์ ดร.พิศลยา บัวแก้ว (Dr. So)',
    'วิทยากรพลังจิตใต้สำนึก | ปลดล็อกศักยภาพ สื่อสารอย่างทรงพลังจากภายใน',
    'https://pub-49b9ffb9f2f8472e9f4b3eb5944bf728.r2.dev/media/dr.so_healing/dr.so.jpg'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    bio = EXCLUDED.bio,
    image = EXCLUDED.image;
