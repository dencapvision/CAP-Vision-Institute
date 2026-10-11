// Preview builds must not write through the inherited production client fallback.
export function canWriteLeads(hostname: string): boolean {
  if (['capvisionpartner.com', 'www.capvisionpartner.com'].includes(hostname)) return true;
  const stagingUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  return import.meta.env.PUBLIC_ENABLE_STAGING_LEAD_WRITES === 'true'
    && !!stagingUrl && new URL(stagingUrl).hostname !== 'nheppvjayzxlblkeanxs.supabase.co';
}
