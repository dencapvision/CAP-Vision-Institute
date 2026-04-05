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
    const LINE_CHANNEL_ACCESS_TOKEN = Deno.env.get("LINE_CHANNEL_ACCESS_TOKEN");
    const LINE_ADMIN_USER_ID = Deno.env.get("LINE_ADMIN_USER_ID"); // User ID, Group ID, or Room ID
    
    if (!LINE_CHANNEL_ACCESS_TOKEN || !LINE_ADMIN_USER_ID) {
      console.error("Missing LINE_CHANNEL_ACCESS_TOKEN or LINE_ADMIN_USER_ID");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const { formType, data } = await req.json();

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
    const lineResponse = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: LINE_ADMIN_USER_ID,
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
      return new Response(JSON.stringify({ error: "Failed to send LINE notification" }), {
        status: 502, // Bad Gateway
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
