declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export function initializeGoogleAnalytics(): void {
  if (!measurementId || window.gtag) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });
}

export function trackScreen(screenName: string): void {
  if (!measurementId || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_title: screenName,
    page_path: `/${screenName}`,
  });
}
