/** Meta Pixel + Google Ads events (same behaviour as the landing pages). */
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
  if (typeof window !== "undefined" && window.gtag && eventName === "Lead") {
    window.gtag("event", "conversion", {
      send_to: "AW-17225009147",
      value: 1000,
      currency: "EUR",
    });
  }
}
