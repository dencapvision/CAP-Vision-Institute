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
    // CAP Vision General Purpose (Contact, Join Us, Resources, Speaker Booking, CEO Tier)
    if (project === 'CONTACT' || project === 'JOIN_US' || project === 'RESOURCES' || project === 'SPEAKER_BOOKING' || project === 'WEB_APP' || project === 'CEO_TIER') {
      const capToken = Deno.env.get("LINE_CHANNEL_ACCESS_TOKEN");
      const capAdminId = Deno.env.get("LINE_USER_ID");
      
      // Check for project-specific override (CEO_TIER)
      const tierToken = Deno.env.get("CEO_TIER_LINE_TOKEN");
      const tierAdminId = Deno.env.get("CEO_TIER_LINE_ADMIN_ID");

      if (project === 'CEO_TIER' && tierToken && tierAdminId) {
        console.log(`[line-notify] Routing CEO_TIER to specific TIER credentials`);
        LINE_TOKEN = tierToken;
        LINE_ADMIN_ID = tierAdminId;
      } else if (!capToken || !capAdminId) {
        console.error(`[${project}] ❌ Missing CAP_VISION secrets! (LINE_CHANNEL_ACCESS_TOKEN or LINE_USER_ID)`);
        // Fallback to CEO_SF if main is missing, but log error
        if (LINE_TOKEN && LINE_ADMIN_ID) {
          console.log(`[${project}] ⚠️ Falling back to CEO_SF credentials`);
        } else {
          return new Response(JSON.stringify({ 
            error: `Missing LINE secrets for project: ${project}`,
            hint: "Ensure LINE_CHANNEL_ACCESS_TOKEN and LINE_USER_ID are set in Supabase Secrets."
          }), {
            status: 500,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
          });
        }
      } else {
        console.log(`[line-notify] Routing ${project} notice to CAP Vision Main OA`);
        LINE_TOKEN = capToken;
        LINE_ADMIN_ID = capAdminId;
      }
    }

    // Dr. So Specific Configuration (Services & Courses)
    if (project === 'DR_SO' || project === 'SUB_SPEAKER') {
      const drsoToken = Deno.env.get("DR_SO_ACCESS_TOKEN");
      const drsoAdminId = Deno.env.get("DR_SO_USER_ID");
      
      console.log(`[DR_SO] DR_SO_ACCESS_TOKEN found: ${!!drsoToken}`);
      console.log(`[DR_SO] DR_SO_USER_ID found: ${!!drsoAdminId}`);
      
      if (!drsoToken || !drsoAdminId) {
        console.error("[DR_SO] ❌ Missing DR_SO secrets! Please set DR_SO_ACCESS_TOKEN and DR_SO_USER_ID in Supabase Edge Function secrets.");
        return new Response(JSON.stringify({ 
          error: "Missing DR_SO LINE secrets. Please configure DR_SO_ACCESS_TOKEN and DR_SO_USER_ID.",
          hint: "Go to Supabase Dashboard > Edge Functions > line-notify > Secrets"
        }), {
          status: 500,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }
      
      LINE_TOKEN = drsoToken;
      LINE_ADMIN_ID = drsoAdminId;
    }

    // Facilitorium OS (FA_OS) Configuration
    if (project === 'FA_OS') {
      // Requested by user: use FA-OS_Access_Token and FA-OS_ID_Channel
      const faOsToken = Deno.env.get("FA-OS_Access_Token") || Deno.env.get("FA_OS_ACCESS_TOKEN");
      const faOsAdminId = Deno.env.get("FA-OS_ID_Channel") || Deno.env.get("FA_OS_ID_CHANNEL");
      
      console.log(`[FA_OS] FA_OS token found: ${!!faOsToken}`);
      
      if (!faOsToken || !faOsAdminId) {
        console.error("[FA_OS] ❌ Missing FA_OS secrets!");
        return new Response(JSON.stringify({ 
          error: "Missing FA_OS LINE secrets.",
        }), {
          status: 500,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }
      
      LINE_TOKEN = faOsToken;
      LINE_ADMIN_ID = faOsAdminId;
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
    if (project === 'CEO_SPEECHFULNESS' || project === 'CEO_TIER' || project === 'CONTACT' || project === 'DR_SO' || project === 'SUB_SPEAKER' || project === 'SPEAKER_BOOKING' || project === 'FA_OS' || project === 'JOIN_US' || project === 'RESOURCES' || project === 'WEB_APP') {
      const isAltProject = project === 'CONTACT' || project === 'DR_SO' || project === 'SUB_SPEAKER' || project === 'SPEAKER_BOOKING' || project === 'FA_OS' || project === 'JOIN_US' || project === 'RESOURCES' || project === 'WEB_APP';
      const primaryColor = isAltProject ? "#0F3460" : "#C5A059";
      let headerText = "👑 NEW REGISTRATION";
      if (project === 'CONTACT') headerText = "✉️ NEW INQUIRY";
      if (project === 'JOIN_US') headerText = "📄 NEW JOB APPLICATION";
      if (project === 'RESOURCES') headerText = "📦 TOOLKIT DOWNLOAD";
      if (project === 'DR_SO') headerText = "💎 DR. SO - SERVICE BOOKING";
      if (project === 'SUB_SPEAKER') headerText = "🧠 SUB-SPEAKER COURSE";
      if (project === 'SPEAKER_BOOKING') headerText = "🎤 SPEAKER BOOKING";
      if (project === 'FA_OS') headerText = "🔮 FA-OS WAITLIST";
      if (project === 'WEB_APP') headerText = "🏢 WEB APP BOOKING";
      
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
                size: "sm"
              }
            ],
            backgroundColor: primaryColor,
            paddingAll: "lg"
          },
          body: {
            type: "box",
            layout: "vertical",
            paddingAll: "xl",
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
                type: "separator",
                margin: "lg"
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
            paddingAll: "lg",
            contents: [
              {
                type: "text",
                text: "CAP Vision Partner © 2026",
                size: "xxs",
                color: "#CBD5E1",
                align: "center"
              }
            ]
          }
        }
      };

      // --- BOOKING CODE TICKET VIBE ---
      if ((project === 'DR_SO' || project === 'SUB_SPEAKER' || project === 'SPEAKER_BOOKING' || project === 'WEB_APP' || project === 'CEO_TIER') && data['Booking Code']) {
        messageObj.contents.body.contents.push({
          type: "box",
          layout: "vertical",
          margin: "xl",
          paddingAll: "lg",
          backgroundColor: "#F8FAFC",
          cornerRadius: "md",
          contents: [
            {
              type: "text",
              text: "BOOKING TICKET CODE",
              size: "xxs",
              color: "#64748B",
              weight: "bold"
            },
            {
              type: "text",
              text: String(data['Booking Code']),
              size: "xxl",
              weight: "bold",
              color: "#0F3460",
              margin: "sm"
            }
          ]
        });
      }

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

    // Helper function to send message to LINE
    async function sendToLine(token: string, recipient: string, obj: any) {
      return await fetch("https://api.line.me/v2/bot/message/push", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: recipient,
          messages: [obj]
        }),
      });
    }

    // Attempt 1: Send with preferred tokens
    let lineResponse = await sendToLine(LINE_TOKEN!, LINE_ADMIN_ID!, messageObj);
    let primaryErrorDetail = "";

    if (!lineResponse.ok) {
      primaryErrorDetail = await lineResponse.text();
      console.error(`Primary LINE API Error:`, primaryErrorDetail);

      // Attempt 2: Fallback to CEO_SF if the primary was different
      const fallbackToken = Deno.env.get("CEO_SF_LINE_TOKEN");
      const fallbackId = Deno.env.get("CEO_SF_LINE_ADMIN_ID");

      if (fallbackToken && fallbackId && (LINE_TOKEN !== fallbackToken || LINE_ADMIN_ID !== fallbackId)) {
        console.log("Attempting fallback to CEO_SF credentials...");
        const fallbackResponse = await sendToLine(fallbackToken, fallbackId, messageObj);
        
        if (fallbackResponse.ok) {
          console.log("Fallback successful.");
          return new Response(JSON.stringify({ 
            success: true, 
            warning: "Primary tokens failed, sent via fallback.",
            primaryError: primaryErrorDetail 
          }), {
            status: 200,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
          });
        }
      }

      // If both fail or no fallback possible
      let hint = "Check if LINE_TOKEN and LINE_ADMIN_ID are valid. Ensure ID starts with 'U'.";
      if (!LINE_ADMIN_ID?.startsWith('U')) {
        hint = "LINE_ADMIN_ID seems invalid. It must be a User ID starting with 'U' (found: " + LINE_ADMIN_ID + ")";
      }

      return new Response(JSON.stringify({ 
        error: "LINE API Error (Both attempts failed)", 
        detail: primaryErrorDetail,
        hint: hint,
        project: project,
        recipient: LINE_ADMIN_ID
      }), {
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

