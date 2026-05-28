import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID, isGoogleAnalyticsEnabled } from "@/lib/analytics";

export function GoogleAnalyticsProvider() {
  if (!isGoogleAnalyticsEnabled()) return null;
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
