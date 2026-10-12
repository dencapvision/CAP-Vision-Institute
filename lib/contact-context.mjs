// URL context is a navigation hint, never authentication or a trusted attribution signal.
export const SERVICE_LABELS = {
  leadership: 'Leadership Transformation',
  'people-team': 'People & Team Synergy',
  culture: 'Organization Culture & Growth Mindset',
  customized: 'Customized In-house Training',
  coaching: 'Executive Coaching', facilitator: 'Modern Facilitator Training', other: 'อื่นๆ'
};
export function readContactContext(search = '') {
  const params = new URLSearchParams(search);
  const candidate = params.get('service') || '';
  const service = Object.hasOwn(SERVICE_LABELS, candidate) ? candidate : '';
  const intent = params.get('intent') === 'proposal' ? 'proposal' : 'consultation';
  const source = params.get('source') === 'home' ? 'home' : '';
  return {service, intent, source};
}
export function contactHref(service = '', intent = 'consultation') {
  const context = readContactContext(new URLSearchParams({service, intent, source: 'home'}).toString());
  const params = new URLSearchParams({source: 'home', intent: context.intent});
  if (context.service) params.set('service', context.service);
  return `/contact?${params}`;
}
export function contactSource(data) {
  return data.source === 'home' ? (data.intent === 'proposal' ? 'home_proposal' : 'home_consultation') : 'contact_form';
}
