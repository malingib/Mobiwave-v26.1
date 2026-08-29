#!/usr/bin/env python3
"""
Connect GSC + GA4 via Composio (SDK v3 / composio 0.21+)

Prereqs:
  pip install composio composio-client --break-system-packages  # if needed
  export COMPOSIO_API_KEY="ak_xxx"  # from https://app.composio.dev -> Settings -> API Keys
  # Or put in .env as COMPOSIO_API_KEY

Usage:
  python scripts/composio_gsc_ga4_connect.py --user you@yourdomain.com
  python scripts/composio_gsc_ga4_connect.py --user you@yourdomain.com --open-browser
  python scripts/composio_gsc_ga4_connect.py --user you@yourdomain.com --check-only
"""
import argparse
import os
import sys
import webbrowser

from composio import Composio

# Verified Composio toolkit slugs (2026):
# - Google Search Console: googlesearchconsole
# - Google Analytics 4: googleanalytics  (alias: googleanalytics)
# If either 404s, run with --discover to list available slugs.
TOOLKITS = {
    "gsc": "googlesearchconsole",
    "ga4": "googleanalytics",
}

def get_client() -> Composio:
    api_key = os.getenv("COMPOSIO_API_KEY")
    if not api_key:
        # fallback to user_data.json from old CLI (if migrated)
        try:
            import json, pathlib
            p = pathlib.Path.home() / ".composio" / "user_data.json"
            if p.exists():
                data = json.loads(p.read_text())
                api_key = data.get("api_key")
        except Exception:
            pass
    if not api_key or api_key.startswith("uak_"):
        print("ERROR: COMPOSIO_API_KEY missing or still using deprecated uak_ key.", file=sys.stderr)
        print("  1. Go to https://app.composio.dev -> Settings -> API Keys -> Create (v3)", file=sys.stderr)
        print("  2. export COMPOSIO_API_KEY='ak_xxx'  (new keys start with ak_)", file=sys.stderr)
        sys.exit(1)
    return Composio(api_key=api_key)

def ensure_auth_config(composio: Composio, toolkit: str):
    # Try to reuse existing auth config for this toolkit
    existing = composio.auth_configs.list(toolkit=toolkit)  # type: ignore
    items = getattr(existing, 'items', None) or getattr(existing, 'auth_configs', None) or []
    # list response shape varies; normalize
    if hasattr(existing, 'items'):
        items = existing.items
    if items:
        ac = items[0]
        ac_id = getattr(ac, 'id', None) or getattr(ac, 'nanoid', None) or ac.get('id') if isinstance(ac, dict) else None
        print(f"  Reusing auth_config {ac_id} for {toolkit}")
        return ac_id
    # Create default (Composio-managed OAuth2) auth config
    print(f"  Creating auth_config for {toolkit} (managed OAuth2)...")
    ac = composio.auth_configs.create(
        toolkit=toolkit,
        options={"type": "use_composio_managed_auth", "auth_scheme": "OAUTH2"}
    )
    ac_id = getattr(ac, 'id', None) or getattr(ac, 'nanoid', None) or (ac.get('id') if isinstance(ac, dict) else None)
    print(f"  Created {ac_id}")
    return ac_id

def connect_one(composio: Composio, label: str, toolkit: str, user_id: str, callback_url: str | None, open_browser: bool):
    print(f"\n[{label}] toolkit={toolkit}")
    # verify toolkit exists
    try:
        tk = composio.toolkits.get(slug=toolkit)
        print(f"  Toolkit found: {tk.slug if hasattr(tk,'slug') else toolkit}")
    except Exception as e:
        print(f"  WARNING: toolkit {toolkit} not found: {e}")
        print("  Try --discover to list available toolkits")
        return None
    auth_config_id = ensure_auth_config(composio, toolkit)
    if not auth_config_id:
        print("  ERROR: could not get auth_config_id")
        return None
    # Initiate connection -> gives redirect_url for OAuth
    conn_req = composio.connected_accounts.initiate(
        user_id=user_id,
        auth_config_id=auth_config_id,
        callback_url=callback_url,
        config=composio.connected_accounts.auth_scheme.oauth2({})  # empty -> redirect flow
    )
    print(f"  Connection ID: {conn_req.id}")
    print(f"  Status: {conn_req.status}")
    print(f"  OAuth URL: {conn_req.redirect_url}")
    if open_browser and conn_req.redirect_url:
        print("  Opening browser...")
        webbrowser.open(conn_req.redirect_url)
    # Optional wait (user must complete OAuth in browser)
    # print("  Waiting for completion (60s)...")
    # conn = conn_req.wait_for_connection(timeout=120)
    # print(f"  Connected! Status={conn.status}")
    return conn_req

def main():
    parser = argparse.ArgumentParser(description="Connect GSC + GA4 via Composio")
    parser.add_argument("--user", required=True, help="user_id / entity_id, e.g. email or 'default'")
    parser.add_argument("--callback", default=None, help="OAuth callback URL (optional, defaults to Composio hosted)")
    parser.add_argument("--open-browser", action="store_true", help="Open OAuth URLs automatically")
    parser.add_argument("--check-only", action="store_true", help="Only list existing connections, don't initiate")
    parser.add_argument("--discover", action="store_true", help="List toolkits matching google/search/analytics")
    args = parser.parse_args()

    composio = get_client()
    print(f"Authenticated as COMPOSIO_API_KEY={os.getenv('COMPOSIO_API_KEY')[:8]}...")

    if args.discover:
        print("\nDiscovering toolkits...")
        tks = composio.toolkits.list()
        items = getattr(tks, 'items', tks)
        for tk in items if isinstance(items, list) else []:
            slug = getattr(tk, 'slug', str(tk))
            name = getattr(tk, 'name', '')
            if 'google' in slug.lower() or 'search' in slug.lower() or 'analytic' in slug.lower():
                print(f"  - {slug:30} {name}")
        return

    if args.check_only:
        for label, toolkit in TOOLKITS.items():
            print(f"\n[{label}] {toolkit} connections:")
            conns = composio.connected_accounts.list(toolkit=toolkit)  # type: ignore
            items = getattr(conns, 'items', conns)
            print(items)
        return

    for label, toolkit in TOOLKITS.items():
        connect_one(composio, label, toolkit, args.user, args.callback, args.open_browser)

    print("\nDone. Complete OAuth in browser, then verify:")
    print("  python scripts/composio_gsc_ga4_connect.py --user <id> --check-only")
    # Quick verify with ToolRouter
    print("\nVerifying via ToolRouter sessions...")
    try:
        session = composio.sessions.create(user_id=args.user)
        tools = session.tools(allowlisted_toolkits=list(TOOLKITS.values()))
        print(f"  Available tools for {args.user}: {len(tools)} found")
    except Exception as e:
        print(f"  Session check warning: {e}")

if __name__ == "__main__":
    main()
