export function generateCourseAssets(courseName: string) {
  const baseUrl = "https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/Course/";

  // 1. Generate slug
  const slug = courseName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  // 2. Generate file name + image URL
  const fileName = `cap-vision-${slug}-course.png`;
  const image = `${baseUrl}${fileName}`;

  // 3. Generate SEO metadata (Title & Alt Text)
  const altText = `${courseName} หลักสูตรพัฒนาทักษะเชิงกลยุทธ์ สร้างผลลัพธ์จริงในองค์กร โดย CAP Vision Institute`;
  const description = `เรียนรู้ ${courseName} เพื่อยกระดับศักยภาพการทำงาน และสร้างความแตกต่างอย่างเหนือระดับในสายอาชีพ`;

  return {
    slug,
    image,
    altText,
    description,
    fileName
  };
}

/**
 * Generates a SQL UPDATE statement for the Supabase courses table
 */
export function generateUpdateSQL(courseName: string, originalTitle: string) {
  const assets = generateCourseAssets(courseName);
  
  return `UPDATE public.courses
SET 
    slug = '${assets.slug}',
    image = '${assets.image}',
    alt_text = '${assets.altText.replace(/'/g, "''")}',
    description = '${assets.description.replace(/'/g, "''")}',
    updated_at = now()
WHERE title = '${originalTitle.replace(/'/g, "''")}' OR title ILIKE '%${courseName.replace(/'/g, "''")}%';`;
}
