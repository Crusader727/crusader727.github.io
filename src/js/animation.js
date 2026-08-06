import { $$, prefersReducedMotion } from "./utils.js";

export function initReveal() {
    if (prefersReducedMotion()) {
        $$(".reveal").forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    $$(".reveal").forEach((el) => observer.observe(el));
}

export function initSceneReveal() {
    if (prefersReducedMotion()) return;

    const panels = document.querySelectorAll(".dashboard-reveal .glass-panel");
    if (!panels.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    panels.forEach((panel, i) => {
                        setTimeout(() => {
                            panel.classList.add("is-visible");
                        }, i * 120);
                    });
                    observer.disconnect();
                }
            });
        },
        { threshold: 0.3 }
    );

    const scene = document.querySelector(".dashboard-reveal");
    if (scene) observer.observe(scene);
}
