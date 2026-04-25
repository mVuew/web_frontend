import { initMixpanel, trackEvent } from "./lib/analytics/mixpanel";

try {
  initMixpanel();
} catch {
  // Ignore instrumentation errors to avoid impacting app startup.
}

export function onRouterTransitionStart(
  url: string,
  navigationType: "push" | "replace" | "traverse",
) {
  trackEvent("route_transition_start", {
    url,
    navigation_type: navigationType,
  });
}
