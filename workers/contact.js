export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
    }

    const contentType = request.headers.get('content-type') || '';
    let payload;

    if (contentType.includes('application/json')) {
      payload = await request.json().catch(() => ({}));
    } else {
      payload = Object.fromEntries(await request.formData());
    }

    const honeypot = String(payload.website ?? '').trim();
    if (honeypot !== '') {
      return Response.json({ ok: true }, { status: 200 });
    }

    const firstName = String(payload.firstName ?? '').trim();
    const lastName = String(payload.lastName ?? '').trim();
    const email = String(payload.email ?? '').trim();
    const phone = String(payload.phone ?? '').trim();
    const service = String(payload.service ?? '').trim();
    const subject = String(payload.subject ?? '').trim();
    const message = String(payload.message ?? '').trim();
    const formType = String(payload.formType ?? 'website').trim();
    const name = `${firstName} ${lastName}`.trim();

    if (name === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: 'Name and a valid email are required' }, { status: 422 });
    }

    if (message.length > 10000) {
      return Response.json({ ok: false, error: 'Message is too long' }, { status: 422 });
    }

    const apiKey = env.BREVO_API_KEY || '';
    if (!apiKey) {
      return Response.json({ ok: false, error: 'Email service is not configured on this server.' }, { status: 500 });
    }

    const toAddress = env.CONTACT_MAIL_TO || 'sales@mobiwave.co.ke';
    const fromAddress = env.CONTACT_MAIL_FROM || 'no-reply@mobiwave.co.ke';
    const mailSubject = `[MobiWave website] ${subject || (service || 'Website enquiry')}`;

    const body = {
      sender: { name: 'MobiWave Website', email: fromAddress },
      to: [{ email: toAddress, name: 'MobiWave Sales' }],
      replyTo: { email, name: name || email },
      subject: mailSubject,
      htmlContent: [
        `<p><strong>Form:</strong> ${escapeHtml(formType)}</p>`,
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : '',
        service ? `<p><strong>Service:</strong> ${escapeHtml(service)}</p>` : '',
        `<p><strong>Message:</strong></p><p>${escapeHtml(message || 'No message provided.')}</p>`,
      ].filter(Boolean).join(''),
      textContent: [
        `Form: ${formType}`,
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : '',
        service ? `Service: ${service}` : '',
        '',
        'Message:',
        message || 'No message provided.',
      ].filter(Boolean).join('\n'),
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      return Response.json({ ok: false, error: 'The mail server is currently unavailable. Please email sales@mobiwave.co.ke directly.' }, { status: 503 });
    }

    return Response.json({ ok: true }, { status: 200 });
  },
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
