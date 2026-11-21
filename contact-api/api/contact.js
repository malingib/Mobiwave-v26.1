export const config = { runtime: 'edge' };

const ALLOWED_ORIGINS = new Set([
  'https://mobiwave.co.ke',
  'https://www.mobiwave.co.ke',
  'http://localhost:5173',
  'http://localhost:4174',
]);

const DEFAULT_MAIL_TO = 'sales@mobiwave.co.ke';
const DEFAULT_MAIL_FROM = 'no-reply@mobiwave.co.ke';
const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 10000;

export default async function handler(request, env) {
  const headers = corsHeaders(request);

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed' }, 405, headers);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'We could not read your submission. Please try again.' }, 400, headers);
  }

  const field = (key) => String(form.get(key) ?? '').trim();

  // Honeypot: bots fill every field, humans never see this one.
  if (field('website') !== '') {
    return json({ ok: true }, 200, headers);
  }

  const firstName = field('firstName');
  const lastName = field('lastName');
  const email = field('email');
  const phone = field('phone');
  const service = field('service');
  const subject = field('subject');
  const inquiryType = field('inquiryType');
  const message = field('message');
  const formType = field('formType') || 'website';

  // The homepage form sends a single `name` field; the contact page sends
  // `firstName` + `lastName`. Accept both so neither form is rejected.
  const name = field('name') || [firstName, lastName].filter(Boolean).join(' ');

  if (name === '' || !EMAIL_PATTERN.test(email)) {
    return json({ ok: false, error: 'Name and a valid email are required' }, 422, headers);
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return json({ ok: false, error: 'Message is too long' }, 422, headers);
  }

  const apiKey = readSetting(env, 'BREVO_API_KEY');
  if (!apiKey) {
    console.error('contact form: BREVO_API_KEY is not set');
    return json({ ok: false, error: 'Email service is not configured on this server.' }, 500, headers);
  }

  const toAddress = readSetting(env, 'CONTACT_MAIL_TO') || DEFAULT_MAIL_TO;
  const fromAddress = readSetting(env, 'CONTACT_MAIL_FROM') || DEFAULT_MAIL_FROM;
  const mailSubject = `[MobiWave website] ${subject || inquiryType || service || 'Website enquiry'}`;

  const details = [
    ['Form', formType],
    ['Name', name],
    ['Email', email],
    phone ? ['Phone', phone] : null,
    service ? ['Service', service] : null,
    inquiryType ? ['Inquiry type', inquiryType] : null,
  ].filter(Boolean);

  const body = {
    sender: { name: 'MobiWave Website', email: fromAddress },
    to: [{ email: toAddress, name: 'MobiWave Sales' }],
    replyTo: { email, name },
    subject: mailSubject,
    htmlContent: [
      ...details.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`),
      '<p><strong>Message:</strong></p>',
      `<p>${escapeHtml(message || 'No message provided.')}</p>`,
    ].join(''),
    textContent: [
      ...details.map(([label, value]) => `${label}: ${value}`),
      '',
      'Message:',
      message || 'No message provided.',
    ].join('\n'),
  };

  let response;
  try {
    response = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error('contact form: Brevo request failed', error);
    return json({ ok: false, error: unavailableMessage() }, 503, headers);
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    console.error(`contact form: Brevo responded ${response.status}: ${detail}`);
    if (response.status === 400) {
      // Brevo rejects unverified senders and malformed payloads with 400.
      return json({ ok: false, error: 'Email service is not configured on this server.' }, 500, headers);
    }
    return json({ ok: false, error: unavailableMessage() }, 503, headers);
  }

  return json({ ok: true }, 200, headers);
}

function readSetting(env, name) {
  const fromEnv = env && typeof env[name] === 'string' ? env[name] : '';
  const fromProcess = typeof process !== 'undefined' && process.env ? process.env[name] : '';
  return String(fromEnv || fromProcess || '').trim();
}

function unavailableMessage() {
  return 'The mail server is currently unavailable. Please email sales@mobiwave.co.ke directly.';
}

function corsHeaders(request) {
  const origin = request.headers.get('origin') || '';
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(payload, status, headers) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
