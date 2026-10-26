export async function submitContactForm(form: HTMLFormElement): Promise<void> {
  // cPanel serves the PHP endpoint as a real server-side script.
  // Keep FormData so PHP receives the same fields, including Turnstile's token.
  const formData = new FormData(form);
  const hasTurnstileKey = Boolean(import.meta.env.VITE_TURNSTILE_SITE_KEY);
  const turnstileToken = String(formData.get('cf-turnstile-response') ?? '').trim();

  if (hasTurnstileKey && !turnstileToken) {
    throw new Error('Please complete the verification challenge.');
  }

  const response = await fetch('/contact.php', {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  });

  const result = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null;
  if (!response.ok || result?.ok !== true) {
    throw new Error(result?.error || 'Your message could not be sent. Please try again or email info@mobiwave.co.ke.');
  }
}
