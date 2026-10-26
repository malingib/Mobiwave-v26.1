export async function submitContactForm(form: HTMLFormElement): Promise<void> {
  // cPanel serves the PHP endpoint as a real server-side script.
  const formData = new FormData(form);

  const endpoint = String(import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '/contact.php').trim();
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  });

  const result = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null;
  if (!response.ok || result?.ok !== true) {
    throw new Error(result?.error || `Your message could not be sent (HTTP ${response.status}). Please try again or email info@mobiwave.co.ke.`);
  }
}
