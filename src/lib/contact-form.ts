export async function submitContactForm(form: HTMLFormElement): Promise<void> {
  const formData = new FormData(form);
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '/contact.php';
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error('The contact form endpoint returned an error.');
  }
}
