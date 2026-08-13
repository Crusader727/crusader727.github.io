import { initCursor, initIdentityParallax, initCardTilt, initTileParallax } from "./cursor.js";
import { initReveal, initSceneReveal, initCircleExpansion, initTrustCounters } from "./animation.js";
import { initNavigation, initCommandPalette } from "./navigation.js";
import { initSections } from "./sections.js";
import { initSpotlightSearch } from "./search.js";
import { initNotificationCenter, initNotificationsPage } from "./notifications.js";
import { initSettingsPage } from "./settings.js";
import { initPolish } from "./polish.js";
import { initSmoothScroll } from "./scroll.js";

document.addEventListener("DOMContentLoaded", () => {
    initCursor();
    initIdentityParallax();
    initCardTilt();
    initTileParallax();
    initReveal();
    initSceneReveal();
    initCircleExpansion();
    initTrustCounters();
    initNavigation();
    initCommandPalette();
    initSpotlightSearch();
    initNotificationCenter();
    initNotificationsPage();
    initSettingsPage();
    initSections();
    initPolish();
    initSmoothScroll();
});
