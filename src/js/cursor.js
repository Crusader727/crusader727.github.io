import { $, prefersReducedMotion } from "./utils.js";

export function initCursor() {
    if (prefersReducedMotion()) return;

    const light = $(".cursor-light");
    if (!light) return;

    window.addEventListener("mousemove", (e) => {
        light.style.left = `${e.clientX}px`;
        light.style.top = `${e.clientY}px`;
    });
}

export function initIdentityParallax() {
    if (prefersReducedMotion()) return;

    const identity = $(".identity");
    if (!identity) return;

    document.addEventListener("mousemove", (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 45;
        const y = (window.innerHeight / 2 - e.clientY) / 45;
        identity.style.transform = `rotateY(${-x}deg) rotateX(${y}deg) translateY(-8px)`;
    });
}

export function initCardTilt() {
    if (prefersReducedMotion()) return;

    const card = $(".hero-card");
    if (!card) return;

    document.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = (x - rect.width / 2) / 18;
        const rotateX = -(y - rect.height / 2) / 18;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0)";
    });
}

export function initTileParallax() {
    if (prefersReducedMotion()) return;

    const tiles = document.querySelectorAll(".ecosystem-tile");
    if (!tiles.length) return;

    document.addEventListener("mousemove", (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;

        tiles.forEach((tile, i) => {
            const depth = (i % 3 + 1) * 8;
            tile.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
        });
    });
}
