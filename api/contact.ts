type ContactPayload = {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  service?: string;
  product?: string;
  subject?: string;
  inquiryType?: string;
  formType?: string;
  message?: string;
  turnstileToken?: string;
};

type VercelRequest = {
  method?: string;
  body?: ContactPayload | string;
  headers: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): VercelResponse;
  json(body: unknown): void;
};

const clean = (value: unknown, max = 500): string =>
  String(value ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let data: ContactPayload;
  try {
    data = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
  } catch {
    return res.status(400).json({ ok: false, error: "Invalid form submission" });
  }

  const name = clean(data.name) || [clean(data.firstName), clean(data.lastName)].filter(Boolean).join(" ");
  const email = clean(data.email, 254);
  const phone = clean(data.phone);
  const service = clean(data.service);
  const product = clean(data.product);
  const subject = clean(data.subject);
  const inquiryType = clean(data.inquiryType);
  const formType = clean(data.formType, 80) || "website";
  const message = String(data.message ?? "").trim();
  const turnstileToken = clean(data.turnstileToken, 4096);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(422).json({ ok: false, error: "Name and a valid email are required." });
  }
  if (message.length > 10000) {
    return res.status(422).json({ ok: false, error: "Message is too long." });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const from = process.env.CONTACT_MAIL_FROM || "no-reply@mobiwave.co.ke";
  const to = process.env.CONTACT_MAIL_TO || "info@mobiwave.co.ke";
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || process.env.CF_TURNSTILE_SECRET_KEY;

  if (!apiKey) {
    console.error("Contact form configuration error: BREVO_API_KEY is missing.");
    return res.status(503).json({ ok: false, error: "Email delivery is temporarily unavailable. Please email info@mobiwave.co.ke directly." });
  }

  // If the public form uses Turnstile, verification must also be enabled server-side.
  if (process.env.TURNSTILE_SECRET_KEY || process.env.CF_TURNSTILE_SECRET_KEY || process.env.VITE_TURNSTILE_SITE_KEY || process.env.CF_TURNSTILE_SITE_KEY) {
    if (!turnstileSecret) {
      console.error("Contact form configuration error: Turnstile secret is missing.");
      return res.status(503).json({ ok: false, error: "Form verification is temporarily unavailable. Please email info@mobiwave.co.ke directly." });
    }
    if (!turnstileToken) {
      return res.status(403).json({ ok: false, error: "Please complete the verification challenge." });
    }
    try {
      const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: turnstileSecret, response: turnstileToken }),
      });
      const result = await verification.json() as { success?: boolean };
      if (!verification.ok || !result.success) {
        return res.status(403).json({ ok: false, error: "Verification failed. Please try again." });
      }
    } catch (error) {
      console.error("Turnstile verification request failed:", error);
      return res.status(503).json({ ok: false, error: "Form verification is temporarily unavailable." });
    }
  }

  const body = [
    `Form: ${formType}`,
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    service ? `Service: ${service}` : "",
    product ? `Product: ${product}` : "",
    subject ? `Subject: ${subject}` : "",
    inquiryType ? `Inquiry type: ${inquiryType}` : "",
    "",
    "Message:",
    message || "No message provided.",
  ].filter((line) => line !== "").join("\n");

  try {
    const delivery = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "MobiWave Website", email: from },
        to: [{ email: to, name: "MobiWave Enquiries" }],
        replyTo: { email, name },
        subject: `[MobiWave website] ${subject || service || product || "Website enquiry"}`,
        textContent: body,
        htmlContent: `<div style="font-family:Arial,sans-serif;line-height:1.6;white-space:pre-wrap">${body.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>`,
      }),
    });

    if (!delivery.ok) {
      const detail = (await delivery.text()).slice(0, 500);
      console.error("Brevo rejected contact form email:", delivery.status, detail);
      return res.status(502).json({ ok: false, error: "We could not deliver your message right now. Please email info@mobiwave.co.ke directly." });
    }
    const result = await delivery.json().catch(() => ({})) as { messageId?: string };
    console.info("MobiWave contact email accepted by Brevo", { messageId: result.messageId ?? "accepted", formType });
    return res.status(200).json({ ok: true, message: "Your message has been accepted for delivery." });
  } catch (error) {
    console.error("Contact form email delivery failed:", error);
    return res.status(502).json({ ok: false, error: "We could not deliver your message right now. Please email info@mobiwave.co.ke directly." });
  }
}
