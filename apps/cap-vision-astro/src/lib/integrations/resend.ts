export interface EmailAddress {
  email: string;
  name?: string;
}

export interface TransactionalEmail {
  to: string | string[];
  from?: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(email: TransactionalEmail) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[Resend Email] Missing RESEND_API_KEY in environment');
    return { success: false, error: 'Missing Resend key' };
  }

  // Support multiple recipients or single email string
  const toList = Array.isArray(email.to) ? email.to : [email.to];
  const fromEmail = email.from || import.meta.env.RESEND_FROM_EMAIL || 'CAP Vision Institute <info@capvision-institute.com>';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toList,
        subject: email.subject,
        html: email.html,
        text: email.text
      })
    });

    const result = await response.json();
    return { success: response.ok, result };
  } catch (error: any) {
    console.error('[Resend Email] Network Error:', error);
    return { success: false, error: error.message };
  }
}
