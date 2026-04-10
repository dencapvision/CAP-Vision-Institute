// supabase/functions/line-notify/index.ts
// CAP Vision System — LINE Messaging API Webhook
// Deploy: supabase functions deploy line-notify

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Creates a premium key-value row for Flex Message
 */
const createInfoRow = (label: string, value: any) => {
  if (!value) return null;
  return {
    type: "box",
    layout: "baseline",
    spacing: "sm",
    contents: [
      { type: "text", text: label, color: "#64748B", size: "sm", flex: 2 },
      { type: "text", text: String(value), wrap: true, color: "#1E293B", size: "sm", flex: 4 }
    ]
  };
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
    
    // Support for CONTACT specific if needed
    if (project === 'CONTACT') {
      const contactToken = Deno.env.get("CONTACT_LINE_TOKEN") || Deno.env.get("CEO_SF_LINE_TOKEN");
      const contactAdminId = Deno.env.get("CONTACT_LINE_ADMIN_ID") || Deno.env.get("CEO_SF_LINE_ADMIN_ID");
      if (contactToken) LINE_TOKEN = contactToken;
      if (contactAdminId) LINE_ADMIN_ID = contactAdminId;
    }
    
    if (!LINE_TOKEN || !LINE_ADMIN_ID) {
      console.error("Missing LINE_TOKEN or LINE_ADMIN_ID");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    let messageObj: any = null;
    const altText = `แจ้งเตือนใหม่: ${formType}`;

    // --- TEMPLATE LOGIC ---
    if (project === 'CEO_SPEECHFULNESS' || project === 'CEO_TIER' || project === 'CONTACT') {
      const primaryColor = (project === 'CONTACT') ? "#0F3460" : "#C5A059";
      const headerText = project === 'CONTACT' ? "✉️ NEW INQUIRY" : "👑 NEW REGISTRATION";
      
      const contents = Object.entries(data)
        .map(([key, value]) => createInfoRow(key, value))
        .filter(row => row !== null);

      messageObj = {
        type: "flex",
        altText: altText,
        contents: {
          type: "bubble",
          header: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: headerText,
                weight: "bold",
                color: "#FFFFFF",
                size: "sm",
                letterSpacing: "0.1em"
              }
            ],
            backgroundColor: primaryColor
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: formType,
                weight: "bold",
                size: "xl",
                color: "#0F3460",
                wrap: true
              },
              {
                type: "box",
                layout: "vertical",
                margin: "lg",
                spacing: "sm",
                contents: contents
              }
            ]
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              {
                type: "text",
                text: "CAP Vision Partner © 2024",
                size: "xxs",
                color: "#CBD5E1",
                align: "center"
              }
            ]
          }
        }
      };

      // Special handling for slip images if present
      const slipUrl = data['สลิปโอนเงิน'] || data['Slip URL'] || data['slip_url'];
      if (slipUrl && messageObj.contents.footer) {
        messageObj.contents.footer.contents.unshift({
          type: "button",
          style: "primary",
          height: "sm",
          color: primaryColor,
          action: {
            type: "uri",
            label: "ดูหลักฐานการโอน",
            uri: slipUrl
          }
        });
      }
    } else {
      // Fallback to text message
      let messageText = `🔔 การแจ้งเตือนใหม่: ${formType}\n`;
      messageText += `──────────────────\n`;
      for (const [key, value] of Object.entries(data)) {
        if (value) messageText += `▪️ ${key}: ${value}\n`;
      }
      messageText += `──────────────────`;
      
      messageObj = {
        type: "text",
        text: messageText
      };
    }

    // Send to LINE
    const targetRecipient = to || LINE_ADMIN_ID;
    const lineResponse = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LINE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: targetRecipient,
        messages: [messageObj]
      }),
    });

    if (!lineResponse.ok) {
      const errorText = await lineResponse.text();
      console.error(`LINE API Error:`, errorText);
      return new Response(JSON.stringify({ error: errorText }), {
        status: 502,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Handler error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
});

