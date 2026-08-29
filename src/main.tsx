import { Component, StrictMode, type ErrorInfo, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initializeAnalytics } from './lib/analytics'

const sentryDsn = import.meta.env.VITE_SENTRY_DSN

class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (!sentryDsn) return
    void import('@sentry/react').then((Sentry) => {
      Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } })
    })
  }

  render() {
    if (this.state.hasError) return <p>Something went wrong.</p>
    return this.props.children
  }
}

if (sentryDsn) {
  void import('@sentry/react').then((Sentry) => {
    Sentry.init({
      dsn: sentryDsn,
      environment: import.meta.env.MODE,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    })
  })
}

initializeAnalytics()

// Defer the non-critical chat widget until the browser is idle.
if (typeof window !== 'undefined') {
  const loadWidget = () => {
    if (document.querySelector('script[data-mobiwave-chat-widget]')) return;
    const script = document.createElement('script');
    script.src = 'https://mobiwaveai.co.ke/widget.js';
    script.async = true;
    script.dataset.businessId = 'db8e269c-e502-49d0-564dc92b52e1';
    script.dataset.mobiwaveChatWidget = 'true';
    document.body.appendChild(script);
  };
  if ('requestIdleCallback' in window) window.requestIdleCallback(loadWidget, { timeout: 4000 });
  else globalThis.setTimeout(loadWidget, 2500);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
)
