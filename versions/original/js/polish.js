import { $, $$, prefersReducedMotion } from "./utils.js";

/** Skip link + main landmark for keyboard users */
export function initAccessibility() {
    const target = document.querySelector(".app, .section-page, main, .section");

    if (target && !target.id) {
        target.id = "main-content";
    }

    if (!$(".skip-link")) {
        const skip = document.createElement("a");
        skip.href = "#main-content";
        skip.className = "skip-link";
        skip.textContent = "Перейти к содержимому";
        document.body.prepend(skip);
    }
}

/** Lazy-load images and defer off-screen content */
export function initLazyLoading() {
    $$("img:not([loading])").forEach((img) => {
        img.loading = "lazy";
        img.decoding = "async";
    });
}

/** Brief skeleton state on dashboard widgets */
export function initSkeletonLoaders() {
    const grid = $(".dashboard-widgets");
    if (!grid || prefersReducedMotion()) return;

    const widgets = $$(".widget-link.reveal, .dashboard-widgets > .widget.reveal", grid);
    if (!widgets.length) return;

    grid.classList.add("is-loading");

    widgets.forEach((widget, i) => {
        const sk = document.createElement("div");
        sk.className = "glass-panel widget skeleton skeleton--card";
        sk.setAttribute("aria-hidden", "true");
        sk.style.animationDelay = `${i * 80}ms`;
        grid.appendChild(sk);
    });

    requestAnimationFrame(() => {
        setTimeout(() => {
            grid.classList.remove("is-loading");
            $$(".widget.skeleton", grid).forEach((el) => el.remove());
        }, 450);
    });
}

export function initPolish() {
    initAccessibility();
    initLazyLoading();
    initSkeletonLoaders();
}
