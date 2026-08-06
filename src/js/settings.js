import { $, $$ } from "./utils.js";

const CATEGORIES = [
    { id: "account", label: "Аккаунт", icon: "👤" },
    { id: "security", label: "Безопасность", icon: "🔐" },
    { id: "cards", label: "Карты", icon: "💳" },
    { id: "interface", label: "Интерфейс", icon: "🎨" },
    { id: "notifications", label: "Уведомления", icon: "🔔" },
    { id: "privacy", label: "Конфиденциальность", icon: "🔒" },
];

export function initSettingsPage() {
    if (document.body.dataset.page !== "settings") return;

    const panels = $$(".settings-panel");
    const navItems = $$(".settings-nav__item");

    const activate = (id) => {
        navItems.forEach((item) => {
            const active = item.dataset.category === id;
            item.classList.toggle("settings-nav__item--active", active);
            item.setAttribute("aria-selected", String(active));
        });
        panels.forEach((panel) => {
            panel.hidden = panel.dataset.category !== id;
        });
        history.replaceState(null, "", `#${id}`);
    };

    navItems.forEach((item) => {
        item.addEventListener("click", () => activate(item.dataset.category));
    });

    $$(".toggle").forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const pressed = toggle.getAttribute("aria-pressed") === "true";
            toggle.setAttribute("aria-pressed", String(!pressed));
            toggle.classList.toggle("toggle--on", !pressed);
        });
    });

    const hash = sessionStorage.getItem("rc-settings-hash") || location.hash.slice(1) || "account";
    sessionStorage.removeItem("rc-settings-hash");
    const valid = CATEGORIES.some((c) => c.id === hash) ? hash : "account";
    activate(valid);

    window.addEventListener("hashchange", () => {
        const h = location.hash.slice(1);
        if (CATEGORIES.some((c) => c.id === h)) activate(h);
    });
}
