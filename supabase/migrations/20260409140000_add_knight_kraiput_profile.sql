-- Migration: Add Knight Kraiput Profile
-- Date: 2026-04-09
INSERT INTO public.instructors (slug, name, bio, image)
VALUES (
    'kraiput-intarayotha',
    'ไกรพุฒิ อินทรโยรา (ไนท์)',
    'ผู้ช่วยประธานสภาอุตสาหกรรมท่องเที่ยวแห่งประเทศไทย | คณะทำงานรัฐมนตรีกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม',
    'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Kraiput%20Gallery/Kraiput%20Intarayotha.jpg'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    bio = EXCLUDED.bio,
    image = EXCLUDED.image;
