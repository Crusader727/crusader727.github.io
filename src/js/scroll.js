import { prefersReducedMotion } from "./utils.js";

export function initSmoothScroll() {
    const behavior = prefersReducedMotion() ? "auto" : "smooth";

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const href = anchor.getAttribute("href");
            if (!href || href === "#") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior });
            }
        });
    });
}
