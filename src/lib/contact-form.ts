export async function submitContactForm(form: HTMLFormElement): Promise<void> {
  const formData = new FormData(form);
  const hasTurnstileKey = Boolean(import.meta.env.VITE_TURNSTILE_SITE_KEY);
  const turnstileToken = String(formData.get('cf-turnstile-response') ?? '').trim();

  if (hasTurnstileKey && !turnstileToken) {
    throw new Error('Please complete the verification challenge.');
  }

  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '/contact.php';
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(payload?.error || 'The contact form endpoint returned an error.');
  }
}
