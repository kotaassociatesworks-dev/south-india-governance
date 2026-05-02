import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import "./lib/i18n";

// PWA registration — guarded against Lovable preview iframes.
// Only registers in production builds, on real (non-preview) hostnames, top-level window.
const isInIframe = (() => {
  try { return window.self !== window.top; } catch { return true; }
})();
const isPreviewHost =
  typeof window !== "undefined" &&
  (window.location.hostname.includes("lovableproject.com") ||
   window.location.hostname.includes("lovable.app") ||
   window.location.hostname.includes("id-preview--"));

if (import.meta.env.PROD && !isInIframe && !isPreviewHost) {
  import("virtual:pwa-register").then(({ registerSW }) => {
    registerSW({ immediate: true });
  }).catch(() => { /* PWA optional */ });
} else if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
  // Clean up any SW registered in preview/iframe contexts
  navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister())).catch(() => {});
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
