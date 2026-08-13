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

export function initCircleExpansion() {
    if (prefersReducedMotion()) return;
    const identity = document.querySelector(".identity");
    const regionSection = document.querySelector(".scene-region");
    if (!identity || !regionSection) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                identity.classList.toggle("identity--expanded", entry.isIntersecting);
            });
        },
        { threshold: 0.15 }
    );

    observer.observe(regionSection);
}

export function initTrustCounters() {
    const counters = $$("[data-count]");
    if (!counters.length) return;

    const animate = (el) => {
        const target = parseInt(el.dataset.count, 10);
        const duration = 1600;
        const start = performance.now();
        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animate(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((c) => observer.observe(c));
}
