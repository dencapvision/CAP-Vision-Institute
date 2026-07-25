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

export async function sendLineAlert(project: string, formType: string, data: any) {
  // Get tokens from Environment
  let LINE_TOKEN = import.meta.env.CEO_SF_LINE_TOKEN;
  let LINE_ADMIN_ID = import.meta.env.CEO_SF_LINE_ADMIN_ID;

  if (['CONTACT', 'JOIN_US', 'RESOURCES', 'SPEAKER_BOOKING', 'WEB_APP', 'CEO_TIER', 'ONBOARDING'].includes(project)) {
    const capToken = import.meta.env.LINE_CHANNEL_ACCESS_TOKEN;
    const capAdminId = import.meta.env.LINE_USER_ID;
    
    const tierToken = import.meta.env.CEO_TIER_LINE_TOKEN;
    const tierAdminId = import.meta.env.CEO_TIER_LINE_ADMIN_ID;

    if (project === 'CEO_TIER' && tierToken && tierAdminId) {
      LINE_TOKEN = tierToken;
      LINE_ADMIN_ID = tierAdminId;
    } else if (capToken && capAdminId) {
      LINE_TOKEN = capToken;
      LINE_ADMIN_ID = capAdminId;
    }
  }

  if (project === 'DR_SO' || project === 'SUB_SPEAKER') {
    const drsoToken = import.meta.env.DR_SO_ACCESS_TOKEN;
    const drsoAdminId = import.meta.env.DR_SO_USER_ID;
    if (drsoToken && drsoAdminId) {
      LINE_TOKEN = drsoToken;
      LINE_ADMIN_ID = drsoAdminId;
    }
  }

  if (project === 'FA_OS') {
    const faOsToken = import.meta.env.FA_OS_ACCESS_TOKEN || import.meta.env.FA_OS_Access_Token;
    const faOsAdminId = import.meta.env.FA_OS_ID_CHANNEL || import.meta.env.FA_OS_ID_Channel;
    if (faOsToken && faOsAdminId) {
      LINE_TOKEN = faOsToken;
      LINE_ADMIN_ID = faOsAdminId;
    }
  }

  if (!LINE_TOKEN || !LINE_ADMIN_ID) {
    console.error(`[Line Alert] Missing credentials for project: ${project}`);
    return { success: false, error: 'Missing line secrets' };
  }

  const isAltProject = ['CONTACT', 'DR_SO', 'SUB_SPEAKER', 'SPEAKER_BOOKING', 'FA_OS', 'JOIN_US', 'RESOURCES', 'WEB_APP', 'ONBOARDING'].includes(project);
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
  if (project === 'ONBOARDING') headerText = "🚀 NEW PROJECT ONBOARDING";

  const contents = Object.entries(data)
    .map(([key, value]) => createInfoRow(key, value))
    .filter(row => row !== null);

  const altText = `แจ้งเตือนใหม่: ${formType}`;
  
  const messageObj: any = {
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

  // --- Add Ticket Code Vibe ---
  if (['DR_SO', 'SUB_SPEAKER', 'SPEAKER_BOOKING', 'WEB_APP', 'CEO_TIER'].includes(project) && data['Booking Code']) {
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

  // --- Add Demo Button ---
  const demoUrl = data['Demo URL'] || data['DEMO'];
  if (demoUrl && messageObj.contents.footer) {
    const bizName = data['ธุรกิจ'] || 'ลูกค้า';
    messageObj.contents.footer.contents.unshift({
      type: "button",
      style: "secondary",
      height: "sm",
      color: "#F1F5F9",
      margin: "sm",
      action: {
        type: "uri",
        label: `🔮 ดู Demo ${bizName}`,
        uri: demoUrl
      }
    });
  }

  // --- Add Slip Image URL ---
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

  try {
    const lineResponse = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LINE_TOKEN}`
      },
      body: JSON.stringify({
        to: LINE_ADMIN_ID,
        messages: [messageObj]
      })
    });

    const result = await lineResponse.json();
    return { success: lineResponse.ok, result };
  } catch (error: any) {
    console.error('[Line Alert] Network Error:', error);
    return { success: false, error: error.message };
  }
}
