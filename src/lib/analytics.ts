// Lightweight analytics wrapper. Calls window.gtag if present, otherwise no-op.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(category: string, action: string, label?: string, value?: number) {
  try {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: action, category, label, value });
    if (typeof window.gtag === "function") {
      window.gtag("event", action, { event_category: category, event_label: label, value });
    }
  } catch {
    /* never break UI on analytics */
  }
}
