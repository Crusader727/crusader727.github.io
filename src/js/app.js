import { initCursor, initIdentityParallax, initCardTilt, initTileParallax } from "./cursor.js";
import { initReveal, initSceneReveal } from "./animation.js";
import { initNavigation, initCommandPalette } from "./navigation.js";
import { initSmoothScroll } from "./scroll.js";

document.addEventListener("DOMContentLoaded", () => {
    initCursor();
    initIdentityParallax();
    initCardTilt();
    initTileParallax();
    initReveal();
    initSceneReveal();
    initNavigation();
    initCommandPalette();
    initSmoothScroll();
});
