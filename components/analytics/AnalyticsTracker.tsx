"use client";

import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { firebaseAuth } from "@/lib/firebase";
import {
  identifyUser,
  initMixpanel,
  resetUser,
  setupAnonymousIdentity,
  toEventToken,
  trackEvent,
  trackPageOpen,
} from "@/lib/analytics/mixpanel";

function getUrlFromLocation(path: string) {
  if (typeof window === "undefined") {
    return path;
  }

  return `${window.location.origin}${path}`;
}

function getSectionName(section: Element, index: number) {
  const element = section as HTMLElement;
  const heading = section.querySelector("h1, h2, h3");

  return (
    element.dataset.analyticsSection ||
    element.id ||
    heading?.textContent?.trim() ||
    `${section.tagName.toLowerCase()}_${index + 1}`
  );
}

function getElementLabel(element: HTMLElement) {
  const primaryText =
    element.dataset.analyticsLabel ||
    element.getAttribute("aria-label") ||
    element.getAttribute("title") ||
    element.textContent?.trim() ||
    "(no-label)";

  return primaryText.replace(/\s+/g, " ").slice(0, 120);
}

function getPageName(path: string) {
  const cleanPath = path.split("?")[0] || "/";

  if (cleanPath === "/") {
    return "home";
  }

  return cleanPath
    .split("/")
    .filter(Boolean)
    .join("_");
}

function getElementKind(element: HTMLElement) {
  if (element.dataset.analyticsAction) {
    return element.dataset.analyticsAction;
  }

  if (element.tagName.toLowerCase() === "a") {
    return "link";
  }

  if (element.getAttribute("type") === "submit") {
    return "submit_button";
  }

  if (element.getAttribute("role") === "button") {
    return "role_button";
  }

  return "button";
}

function getComponentName(element: HTMLElement) {
  const componentRoot = element.closest("[data-analytics-component]") as
    | HTMLElement
    | null;

  if (componentRoot?.dataset.analyticsComponent) {
    return componentRoot.dataset.analyticsComponent;
  }

  const sectionRoot = element.closest("section") as HTMLElement | null;
  if (sectionRoot?.id) {
    return sectionRoot.id;
  }

  return "global";
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPageRef = useRef<string>("");
  const lastIdentifiedUserRef = useRef<string | null>(null);

  const routePath = useMemo(() => {
    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    initMixpanel();
    setupAnonymousIdentity();
  }, []);

  useEffect(() => {
    if (!firebaseAuth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      const currentUserId = user?.uid ?? null;

      if (currentUserId && currentUserId !== lastIdentifiedUserRef.current) {
        identifyUser(currentUserId, {
          $email: user.email ?? undefined,
          $name: user.displayName ?? undefined,
        });
        lastIdentifiedUserRef.current = currentUserId;
        return;
      }

      if (!currentUserId && lastIdentifiedUserRef.current) {
        resetUser();
        lastIdentifiedUserRef.current = null;
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fullUrl = getUrlFromLocation(routePath);
    const pageName = getPageName(routePath);

    if (lastTrackedPageRef.current === fullUrl) {
      return;
    }

    trackPageOpen(routePath, fullUrl, pageName);

    trackEvent(`page_opened_${toEventToken(pageName)}`, {
      page_name: pageName,
      page_path: routePath,
      page_url: fullUrl,
    });

    lastTrackedPageRef.current = fullUrl;
  }, [routePath]);

  useEffect(() => {
    const seenSections = new Set<string>();

    const sections = Array.from(
      document.querySelectorAll(
        "section, [data-analytics-section], [id^='section-']"
      )
    );

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const section = entry.target as HTMLElement;
          const sectionName = getSectionName(section, sections.indexOf(section));
          const pageName = getPageName(routePath);
          const dedupeKey = `${routePath}::${sectionName}`;

          if (seenSections.has(dedupeKey)) {
            observer.unobserve(section);
            return;
          }

          seenSections.add(dedupeKey);

          trackEvent("section_viewed", {
            section_name: sectionName,
            section_token: toEventToken(sectionName),
            page_name: pageName,
            page_path: routePath,
            page_url: getUrlFromLocation(routePath),
          });

          trackEvent(
            `section_viewed_${toEventToken(pageName)}_${toEventToken(sectionName)}`,
            {
              section_name: sectionName,
              page_name: pageName,
              page_path: routePath,
            }
          );

          observer.unobserve(section);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -15% 0px",
        threshold: 0.35,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [routePath]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const clickable = target.closest(
        "a, button, [role='button'], input[type='button'], input[type='submit'], summary, [data-analytics-click]"
      );

      if (!(clickable instanceof HTMLElement)) {
        return;
      }

      const href = clickable instanceof HTMLAnchorElement ? clickable.href : null;
      const optionName = getElementLabel(clickable);
      const pageName = getPageName(routePath);
      const actionKind = getElementKind(clickable);
      const componentName = getComponentName(clickable);

      trackEvent("option_clicked", {
        option_name: optionName,
        option_token: toEventToken(optionName),
        action_kind: actionKind,
        component_name: componentName,
        page_name: pageName,
        page_path: routePath,
        page_url: getUrlFromLocation(routePath),
        element_label: optionName,
        element_id: clickable.id || null,
        element_role: clickable.getAttribute("role") || null,
        element_tag: clickable.tagName.toLowerCase(),
        element_classes: clickable.className
          ? clickable.className.split(/\s+/).slice(0, 5)
          : [],
        target_href: href,
      });

      trackEvent(
        `option_clicked_${toEventToken(pageName)}_${toEventToken(actionKind)}_${toEventToken(optionName)}`,
        {
          option_name: optionName,
          action_kind: actionKind,
          component_name: componentName,
          page_name: pageName,
          page_path: routePath,
        }
      );
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [routePath]);

  return null;
}
