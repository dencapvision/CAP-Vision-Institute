// supabase/functions/web-app-notify/index.ts
// CAP Vision System — Legacy Bridge for Web App Notifications
// This function forwards requests to 'line-notify' to ensure old site versions still work.

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const body = await req.json();
    
    // Force project context for centralized routing
    body.project = body.project || 'WEB_APP';
    if (!body.formType) body.formType = 'Web App Booking (Legacy)';

    console.log(`[web-app-notify] Bridge triggered. Forwarding to line-notify for project: ${body.project}`);

    // Call the centralized line-notify function
    // We use the internal service role or the request's own auth
    const authHeader = req.headers.get('Authorization');
    
    const response = await fetch('https://nheppvjayzxlblkeanxs.supabase.co/functions/v1/line-notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader || '',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      status: response.status,
    });

  } catch (err) {
    console.error(`[web-app-notify] Bridge Error:`, err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
