import mixpanel from "mixpanel-browser";

type MixpanelValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | MixpanelValue[]
  | { [key: string]: MixpanelValue };

type EventProperties = Record<string, MixpanelValue>;

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN?.trim();
const MIXPANEL_DEBUG =
  process.env.NEXT_PUBLIC_MIXPANEL_DEBUG?.trim().toLowerCase() === "true";
const MIXPANEL_ANON_ID_KEY = "mvuew-mixpanel-anon-id";

let initialized = false;

function canUseMixpanel() {
  return typeof window !== "undefined" && Boolean(MIXPANEL_TOKEN);
}

function getOrCreateAnonymousId() {
  const existing = window.localStorage.getItem(MIXPANEL_ANON_ID_KEY);
  if (existing) {
    return existing;
  }

  const generated =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `anon_${Math.random().toString(36).slice(2)}_${Date.now()}`;

  window.localStorage.setItem(MIXPANEL_ANON_ID_KEY, generated);
  return generated;
}

function getDeviceContext() {
  const userAgent = navigator.userAgent;
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } })
      .userAgentData?.platform || navigator.platform;
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);

  return {
    device_platform: platform || "unknown",
    device_type: isMobile ? "mobile" : "desktop",
    browser_language: navigator.language,
    user_agent: userAgent,
  } satisfies EventProperties;
}

export function initMixpanel() {
  if (!canUseMixpanel() || initialized) {
    return;
  }

  mixpanel.init(MIXPANEL_TOKEN as string, {
    track_pageview: false,
    persistence: "localStorage",
    debug: MIXPANEL_DEBUG,
  });

  initialized = true;
}

export function setupAnonymousIdentity() {
  if (!canUseMixpanel()) {
    return;
  }

  initMixpanel();

  const anonymousId = getOrCreateAnonymousId();
  const currentDistinctId = mixpanel.get_distinct_id();

  if (currentDistinctId !== anonymousId) {
    mixpanel.identify(anonymousId);
  }

  const deviceContext = getDeviceContext();

  mixpanel.register({
    ...deviceContext,
    auth_state: "anonymous",
  });

  mixpanel.people.set({
    ...deviceContext,
    auth_state: "anonymous",
    anonymous_id: anonymousId,
  } as never);
}

export function trackEvent(eventName: string, properties: EventProperties = {}) {
  if (!canUseMixpanel()) {
    return;
  }

  initMixpanel();

  if (MIXPANEL_DEBUG) {
    console.info("[Mixpanel]", eventName, properties);
  }

  mixpanel.track(eventName, properties as never);
}

export function trackPageOpen(path: string, fullUrl: string, pageName: string) {
  trackEvent("page_opened", {
    page_path: path,
    page_url: fullUrl,
    page_name: pageName,
  });
}

export function identifyUser(userId: string, profile: EventProperties = {}) {
  if (!canUseMixpanel()) {
    return;
  }

  initMixpanel();

  const previousDistinctId = mixpanel.get_distinct_id();
  if (previousDistinctId && previousDistinctId !== userId) {
    try {
      mixpanel.alias(userId, previousDistinctId);
    } catch {
      // Ignore alias errors (e.g. duplicate alias) and continue with identify.
    }
  }

  mixpanel.identify(userId);

  const deviceContext = getDeviceContext();

  mixpanel.register({
    ...deviceContext,
    auth_state: "authenticated",
    user_id: userId,
  });

  mixpanel.people.set(
    {
      ...deviceContext,
      ...profile,
      auth_state: "authenticated",
      user_id: userId,
    } as never
  );
}

export function resetUser() {
  if (!canUseMixpanel()) {
    return;
  }

  initMixpanel();
  mixpanel.reset();
  setupAnonymousIdentity();
}

export function toEventToken(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);
}

export function isMixpanelEnabled() {
  return canUseMixpanel();
}
