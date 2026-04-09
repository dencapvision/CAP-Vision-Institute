// supabase/functions/line-notify/index.ts
// CAP Vision System — LINE Messaging API Webhook
// Deploy: supabase functions deploy line-notify

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

 Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const { formType, data, to, project } = await req.json();

    // Default to SF (Speechfulness) or Main project
    let LINE_TOKEN = Deno.env.get("CEO_SF_LINE_TOKEN");
    let LINE_ADMIN_ID = Deno.env.get("CEO_SF_LINE_ADMIN_ID");

    // Override if project-specific variables exist
    if (project === 'CEO_TIER') {
      const tierToken = Deno.env.get("CEO_TIER_LINE_TOKEN");
      const tierAdminId = Deno.env.get("CEO_TIER_LINE_ADMIN_ID");
      if (tierToken) LINE_TOKEN = tierToken;
      if (tierAdminId) LINE_ADMIN_ID = tierAdminId;
    }
    
    if (!LINE_TOKEN || !LINE_ADMIN_ID) {
      const missing = [];
      if (!LINE_TOKEN) missing.push("LINE_TOKEN (CEO_TIER or CEO_SF)");
      if (!LINE_ADMIN_ID) missing.push("LINE_ADMIN_ID (CEO_TIER or CEO_SF)");
      
      console.error(`Missing secrets: ${missing.join(", ")}`);
      return new Response(JSON.stringify({ 
        error: `Server configuration error: Missing ${missing.join(", ")}` 
      }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    if (!formType || !data) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // Format the message for LINE
    let messageText = `🔔 การแจ้งเตือนใหม่: ${formType}\n`;
    messageText += `──────────────────\n`;
    
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        messageText += `▪️ ${key}: ${value}\n`;
      }
    }
    messageText += `──────────────────`;

    // Send to LINE Messaging API (Push Message)
    const targetRecipient = to || LINE_ADMIN_ID;
    console.log(`Attempting to send LINE notification to: ${targetRecipient}`);
    console.log(`Message Content:\n${messageText}`);

    const lineResponse = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LINE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: targetRecipient,
        messages: [
          {
            type: "text",
            text: messageText
          }
        ]
      }),
    });

    if (!lineResponse.ok) {
      const errorText = await lineResponse.text();
      console.error(`LINE API Error (${lineResponse.status}):`, errorText);
      return new Response(JSON.stringify({ 
        error: `LINE API Error: ${errorText}`,
        status: lineResponse.status
      }), {
        status: 502,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // Success response
    return new Response(JSON.stringify({ success: true, message: "Notification sent via Messaging API" }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Handler error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
});
