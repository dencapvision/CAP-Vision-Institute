const EVENTS = new Set(['contact_view', 'contact_start', 'contact_submit', 'generate_lead', 'contact_error', 'cta_click']);
export function trackConversion(event, channel = 'form', target = globalThis.window) {
  if (!target || !EVENTS.has(event) || !['form', 'line', 'phone', 'email', 'consultation'].includes(channel)) return false;
  try {
    if (target.localStorage.getItem('cap_analytics_consent') !== 'granted') return false;
    // Fixed values only: never forward form values, URLs, referrers or query strings.
    const payload = {event, channel};
    target.dataLayer = target.dataLayer || [];
    target.dataLayer.push(payload);
    return true;
  } catch { return false; }
}
