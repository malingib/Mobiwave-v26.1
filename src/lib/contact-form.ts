const DEFAULT_ENDPOINT = 'https://mobiwave-contact-dwaynes-projects-c48061a4.vercel.app/api/contact';

const REQUEST_TIMEOUT_MS = 20000;

// Radix renders a hidden native <select> for its dropdowns. Native validation
// on that hidden element blocks the submit with no visible feedback, so the
// dropdowns are validated here instead and reported in the form.
export const CONTACT_CHOICE_MESSAGES: Record<string, string> = {
  service: 'Please choose a service.',
  product: 'Please choose a product.',
  subject: 'Please choose a subject.',
  inquiryType: 'Please choose an inquiry type.',
};

export function findMissingChoice(
  form: HTMLFormElement,
  candidates: Record<string, string> = CONTACT_CHOICE_MESSAGES,
): string | null {
  const data = new FormData(form);
  for (const [name, message] of Object.entries(candidates)) {
    if (!form.elements.namedItem(name)) continue;
    if (!String(data.get(name) ?? '').trim()) return message;
  }
  return null;
}

function resolveEndpoint(): string {
  const configured = String(import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? '').trim();
  // Only an absolute URL may override the default. A relative value baked in by
  // a stale .env on the build machine would silently break the form.
  return /^https?:\\/\\//i.test(configured) ? configured : DEFAULT_ENDPOINT;
}

export async function submitContactForm(form: HTMLFormElement): Promise<void> {
  const endpoint = resolveEndpoint();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });

    const result = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null;
    if (!response.ok || result?.ok !== true) {
      throw new Error(result?.error || `Your message could not be sent (HTTP ${response.status}). Please try again or email info@mobiwave.co.ke.`);
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('The request timed out. Please try again or email info@mobiwave.co.ke.');
    }
    if (error instanceof TypeError) {
      throw new Error('We could not reach the mail service. Please try again or email info@mobiwave.co.ke.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
