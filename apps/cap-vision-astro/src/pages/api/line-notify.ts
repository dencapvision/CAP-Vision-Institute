import type { APIRoute } from 'astro';
import { sendLineAlert } from '../../lib/integrations/line';

export const POST: APIRoute = async ({ request }) => {
  // CORS Headers support
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    const { project, formType, data } = await request.json();
    if (!project || !formType || !data) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required parameters: project, formType, and data' 
      }), { status: 400, headers });
    }

    console.log(`[API line-notify] Triggering alert for project: ${project}, type: ${formType}`);
    const result = await sendLineAlert(project, formType, data);
    
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers
    });
  } catch (error: any) {
    console.error('[API line-notify] Request processing error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || 'Internal server error' 
    }), { status: 500, headers });
  }
};
