import { useEffect, useRef, useState } from 'react';

interface TurnstileWidgetProps {
  className?: string;
  onError?: (message: string) => void;
  onSuccess?: () => void;
}

export function TurnstileWidget({ className = '', onError, onSuccess }: TurnstileWidgetProps) {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (!siteKey || typeof document === 'undefined') {
      return;
    }

    const turnstile = (window as Window & {
      turnstile?: {
        render: (element: HTMLElement, config: Record<string, unknown>) => string;
        remove: (widgetId: string) => void;
      };
    }).turnstile;

    const setWidgetError = (message: string) => {
      setStatusMessage(message);
      onError?.(message);
    };

    const bootstrap = () => {
      if (!containerRef.current || !turnstile || widgetIdRef.current) {
        return;
      }

      const widgetId = turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: 'light',
        size: 'normal',
        callback: () => {
          setStatusMessage('');
          onSuccess?.();
          onError?.('');
        },
        'error-callback': () => {
          setWidgetError('Please complete the captcha challenge and try again.');
        },
        'expired-callback': () => {
          setWidgetError('Your captcha expired. Please complete it again.');
        },
        'timeout-callback': () => {
          setWidgetError('Captcha timed out. Please complete it again.');
        },
      });

      widgetIdRef.current = widgetId;

      const checkRenderTimer = window.setTimeout(() => {
        const hasWidget = !!containerRef.current?.querySelector('iframe, input, canvas');
        if (!hasWidget) {
          const localhostMessage = 'Turnstile is not enabled for this domain. Add localhost and 127.0.0.1 to the widget settings in Cloudflare, then refresh the page.';
          setWidgetError(localhostMessage);
        }
      }, 2500);

      return () => window.clearTimeout(checkRenderTimer);
    };

    let script = document.querySelector<HTMLScriptElement>('script[data-turnstile-script="true"]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-turnstile-script', 'true');
      script.addEventListener('load', bootstrap, { once: true });
      document.head.appendChild(script);
    }

    if (turnstile) {
      bootstrap();
    }

    return () => {
      if (widgetIdRef.current && turnstile) {
        turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onError, onSuccess]);

  if (!siteKey) {
    return (
      <div className={className}>
        <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Bot protection is disabled until a valid Turnstile site key is configured.
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div ref={containerRef} />
      {statusMessage && (
        <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {statusMessage}
        </div>
      )}
    </div>
  );
}
