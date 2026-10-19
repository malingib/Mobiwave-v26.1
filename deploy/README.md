# Deploying MobiWave

Target: `https://mobiwave.co.ke` on `95.217.230.115` (Hetzner VPS, nginx 1.18 / Ubuntu).

The site is a **static build**. `dist/` is the deployable artifact; nothing at
runtime needs Node.

## Why the site went down

nginx was reverse-proxying `mobiwave.co.ke` to a `vite dev`/`vite preview`
process. Vite rejects unknown `Host` headers by default, so every request —
including `/robots.txt` and every sitemap URL — returned:

```
403  Blocked request. This host ("mobiwave.co.ke") is not allowed.
```

Two independent things must both be fixed:

1. `vite.config.ts` now lists `mobiwave.co.ke` in `allowedHosts` (stops that
   class of outage, and is required for `npm run preview` behind a proxy).
2. nginx must serve `dist/` **statically**, which is the actual production
   setup. See `deploy/nginx/mobiwave.co.ke.conf`.

> `dist/.htaccess` and `dist/_redirects` do nothing on nginx. The rewrite rules
> they contain are translated into the vhost config.

## Build

```bash
npm ci
npm run build:deploy      # build + prerender + validate
```

`build:deploy` runs three steps:

| Step | Script | Purpose |
|---|---|---|
| 1 | `npm run build` | `tsc && vite build` → `dist/` shell, assets, PHP endpoint |
| 2 | `npm run prerender` | renders every sitemap route to static HTML with Playwright |
| 3 | `npm run validate:production` | asserts prerender coverage and asset integrity |

Step 2 needs a browser, which CI images often lack:

```bash
npx playwright install --with-deps chromium
```

Step 3 is the safety net that was missing. It fails the build when a
prerendered page references an asset that is not in `dist/assets/` — the exact
defect found in the committed `dist/`, where 26 of the referenced bundles did
not exist. Without it, a partially-built `dist/` ships and every page renders
blank.

## Ship

```bash
# From the build machine, publish the built artifact.
rsync -az --delete dist/ deploy@95.217.230.115:/var/www/mobiwave/dist/
```

`--delete` matters: stale prerendered routes and old hashed bundles must not
survive a deploy.

## Configure nginx (once)

```bash
sudo cp deploy/nginx/mobiwave.co.ke.conf /etc/nginx/sites-available/mobiwave.co.ke
sudo ln -sf /etc/nginx/sites-available/mobiwave.co.ke /etc/nginx/sites-enabled/mobiwave.co.ke
sudo nginx -t && sudo systemctl reload nginx
```

Then remove the vhost that proxied to Vite — otherwise it will shadow this one:

```bash
ls /etc/nginx/sites-enabled/
# confirm the vite proxy_pass entry is gone
```

Checklist before reloading:

- `root /var/www/mobiwave/dist;` points at the deployed `dist/` directory.
- Certificates exist at `/etc/letsencrypt/live/mobiwave.co.ke/`.
- `contact.php` upstream (port `8000`) is running, or drop that `location`.
- Any process running `vite preview`/`vite dev` in production is stopped and
  disabled so it cannot come back after a reboot.

## Deploy-time gotchas

- **Never deploy the `dist/` in git.** `dist/` is in `.gitignore`, yet parts of
  it are force-committed and out of sync with its own `assets/` manifest.
  Always build fresh.
- `npm run prerender` writes HTML against a live preview server started on
  `4174 + pid % 1000`. A stale preview process on that port can serve old HTML
  with hashes from a previous build, which is how the committed `dist/` became
  inconsistent.
- `dist/contact.php` reads `.env` from `dirname(__DIR__)` and
  `dirname(__DIR__, 2)`, so the deployed tree must keep that layout with a
  populated `.env`.

## Verify after deploy

```bash
curl -sI https://mobiwave.co.ke/ | head -3            # expect 200
curl -s  https://mobiwave.co.ke/robots.txt | head -3  # expect 200
curl -so /dev/null -w '%{http_code}\n' https://mobiwave.co.ke/guides/otp-sms-kenya   # expect 200

# Every sitemap URL must be 200.
while read -r u; do
  printf '%s %s\n' "$(curl -so /dev/null -w '%{http_code}' -L "$u")" "$u"
done < <(grep -o 'https://mobiwave.co.ke[^<]*' dist/sitemap.xml)
```

Then spot-check a prerendered page in a browser with JavaScript disabled: the
content must still be present, and the `<title>` must be page-specific rather
than the generic shell title.
