# MobiWave contact API

A single serverless function that relays website contact-form submissions to
[Brevo](https://www.brevo.com/) over its transactional email API.

It replaces the old PHP endpoint (`public/api/contact.php`), which required a
PHP runtime on the web server and shipped its own source into the published
`dist/` tree.

```
browser ──POST multipart──▶ /api/contact ──▶ POST https://api.brevo.com/v3/smtp/email
```

The browser calls this endpoint directly, so nothing on the web server has to
route, proxy or execute anything.

## One-time setup (Vercel)

1. Create a new project from the `Mobiwave-v26.1` repository.
2. Set **Root Directory** to `contact-api` and the framework preset to **Other**.
3. Leave the build command and output directory as configured in `vercel.json`
   (empty build, `public` output).
4. Add the environment variables:
   - `BREVO_API_KEY` — required. Brevo → SMTP & API → API keys.
   - `CONTACT_MAIL_TO` — optional, defaults to `sales@mobiwave.co.ke`.
   - `CONTACT_MAIL_FROM` — optional, defaults to `no-reply@mobiwave.co.ke`.
5. Deploy. The endpoint is then `https://<project>.vercel.app/api/contact`.

The frontend default lives in `src/lib/contact-form.ts` as
`DEFAULT_ENDPOINT`. If Vercel assigns a different project name, update that
constant.

## Brevo prerequisites

The sending identity must be verified in Brevo, otherwise the API rejects the
send with a 400 and the form reports "Email service is not configured on this
server.":

- Verify `no-reply@mobiwave.co.ke` as a sender, or
- verify the `mobiwave.co.ke` domain (SPF + DKIM records at the DNS provider)
  and send from any address on it.

`sales@mobiwave.co.ke` must be a verified recipient as well.

`no-reply@mobiwave.co.ke` is confirmed working: the relay was run end to end
against the live Brevo API and the send was accepted.

## Behaviour

- `POST` only; `OPTIONS` answers the CORS preflight.
- Only allowlisted origins receive `Access-Control-Allow-Origin`:
  `https://mobiwave.co.ke`, `https://www.mobiwave.co.ke`,
  `http://localhost:5173`, `http://localhost:4174`.
- Accepts both form field shapes: a single `name`, or `firstName` + `lastName`.
- The `website` field is a honeypot: when filled, the request is answered with
  `{ "ok": true }` and no mail is sent.
- Responses are always JSON: `{ "ok": true }` or `{ "ok": false, "error": "..." }`.

## Local testing

```bash
npx vercel dev          # from this directory, with BREVO_API_KEY in .env.local
curl -i -X POST http://localhost:3000/api/contact \
  -F 'name=Test User' -F 'email=test@example.com' -F 'message=Hello'
```
