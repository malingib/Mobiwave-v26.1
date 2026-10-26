export async function submitContactForm(form: HTMLFormElement): Promise<void> {
  const formData = new FormData(form);
  const hasTurnstileKey = Boolean(import.meta.env.VITE_TURNSTILE_SITE_KEY);
  const turnstileToken = String(formData.get('cf-turnstile-response') ?? '').trim();

  if (hasTurnstileKey && !turnstileToken) {
    throw new Error('Please complete the verification challenge.');
  }

  const endpoint = '/api/contact';
  const payload: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === 'string' && key !== 'cf-turnstile-response') {
      payload[key] = value;
    }
  });
  payload.turnstileToken = turnstileToken;

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null;
  if (!response.ok || result?.ok !== true) {
    throw new Error(result?.error || 'The contact form endpoint did not confirm email delivery.');
  }
}
