import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message/push";
const LINE_TOKEN = Deno.env.get("WEB_AI_LINE_TOKEN");
const ADMIN_ID = Deno.env.get("WEB_AI_LINE_USER_ID");

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const body = await req.json();
    const { 
      name, 
      phone, 
      line_id, 
      package_name, 
      amount, 
      booking_code, 
      payment_method,
      slip_url 
    } = body;

    if (!LINE_TOKEN || !ADMIN_ID) {
      console.error("Missing WEB_AI_LINE_TOKEN or WEB_AI_LINE_USER_ID");
      throw new Error("Server configuration error");
    }

    // Prepare Flex Message for a premium look
    const flexMessage = {
      type: "bubble",
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "📢 NEW WEB APP BOOKING",
            weight: "bold",
            color: "#FFFFFF",
            size: "sm"
          }
        ],
        backgroundColor: "#0F172A"
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: `แพ็กเกจ: ${package_name}`,
            weight: "bold",
            size: "xl",
            color: "#1E293B"
          },
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            spacing: "sm",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  { type: "text", text: "ลูกค้า", color: "#64748B", size: "sm", flex: 1 },
                  { type: "text", text: name || "-", wrap: true, color: "#1E293B", size: "sm", flex: 4 }
                ]
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  { type: "text", text: "เบอร์โทร", color: "#64748B", size: "sm", flex: 1 },
                  { type: "text", text: phone || "-", wrap: true, color: "#1E293B", size: "sm", flex: 4 }
                ]
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  { type: "text", text: "LINE ID", color: "#64748B", size: "sm", flex: 1 },
                  { type: "text", text: line_id || "-", wrap: true, color: "#1E293B", size: "sm", flex: 4 }
                ]
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  { type: "text", text: "ยอดเงิน", color: "#64748B", size: "sm", flex: 1 },
                  { type: "text", text: `฿${amount?.toLocaleString() || "0"}`, wrap: true, color: "#0F766E", weight: "bold", size: "md", flex: 4 }
                ]
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  { type: "text", text: "ช่องทาง", color: "#64748B", size: "sm", flex: 1 },
                  { type: "text", text: payment_method === 'stripe' ? 'บัตรเครดิต' : 'โอนเงิน', wrap: true, color: "#1E293B", size: "sm", flex: 4 }
                ]
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  { type: "text", text: "รหัสจอง", color: "#64748B", size: "sm", flex: 1 },
                  { type: "text", text: booking_code || "-", wrap: true, color: "#7C3AED", weight: "bold", size: "sm", flex: 4 }
                ]
              }
            ]
          }
        ]
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          ...(slip_url ? [
            {
              type: "button",
              style: "primary",
              height: "sm",
              color: "#0F172A",
              action: {
                type: "uri",
                label: "ดูหลักฐานการโอน",
                uri: slip_url
              }
            }
          ] : [
            {
              type: "text",
              text: "⚠️ รอการแจ้งโอน/ตรวจสอบ",
              size: "xs",
              color: "#EF4444",
              align: "center"
            }
          ]),
          {
            type: "button",
            style: "link",
            height: "sm",
            action: {
              type: "uri",
              label: "แชทหาลูกค้า",
              uri: line_id ? `https://line.me/ti/p/~${line_id}` : "https://line.me"
            }
          }
        ],
        flex: 0
      }
    };

    console.log("Sending LINE notification to:", ADMIN_ID);
    const response = await fetch(LINE_MESSAGING_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LINE_TOKEN}`,
      },
      body: JSON.stringify({
        to: ADMIN_ID,
        messages: [
          {
            type: "flex",
            altText: `มีผู้สมัครใหม่: ${name} (${package_name})`,
            contents: flexMessage
          }
        ],
      }),
    });

    const result = await response.json();
    console.log("LINE API Response:", JSON.stringify(result));

    if (!response.ok) {
        console.error("LINE API Error:", result);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      status: response.status,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
