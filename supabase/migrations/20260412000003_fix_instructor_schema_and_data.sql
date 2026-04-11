-- Migration: Fix instructor schema and update data
-- Description: Adds title column to instructors and corrects Knight Kraiput's name spellings.

-- 1. Add title column to instructors table if it doesn't exist
ALTER TABLE public.instructors ADD COLUMN IF NOT EXISTS title TEXT;

-- 2. Update Knight Kraiput's profile (Correcting spelling from อินทรโยรา to อินทรโยธา and adding title)
UPDATE public.instructors 
SET 
    name = 'ไกรพุฒิ อินทรโยธา (ไนท์)',
    title = 'Expert in Security & Executive Management',
    bio = 'ผู้ช่วยประธานสภาอุตสาหกรรมท่องเที่ยวแห่งประเทศไทย | คณะทำงานรัฐมนตรีกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม'
WHERE slug = 'kraiput-intarayotha';

-- 3. Update Dr. So's title
UPDATE public.instructors
SET 
    title = 'อาจารย์ ดร.พิศลยา บัวแก้ว (Dr. So)'
WHERE slug = 'dr-so';

-- 4. Update Den Master Fa's title
UPDATE public.instructors
SET 
    title = 'Master Facilitator [ครูเด่น]'
WHERE slug = 'den-master-fa' OR slug = 'den-masterfa';
