import { $, $$ } from "./utils.js";

/** Единый источник правды для dock-навигации */
export const DOCK_ITEMS = [
    { page: "dashboard.html", slug: "dashboard", label: "Главная", icon: "🏠" },
    { page: "cards.html", slug: "cards", label: "Карты", icon: "💳" },
    { page: "benefits.html", slug: "benefits", label: "Льготы", icon: "🎁" },
    { page: "promotions.html", slug: "promotions", label: "Акции", icon: "🔥" },
    { page: "services.html", slug: "services", label: "Сервисы", icon: "🧭" },
    { page: "documents.html", slug: "documents", label: "Документы", icon: "📄" },
    { page: "profile.html", slug: "profile", label: "Профиль", icon: "👤" },
];

function renderDock() {
    const dock = $(".dock");
    if (!dock) return;

    const currentPage = document.body.dataset.page;

    dock.innerHTML = DOCK_ITEMS.map(({ page, slug, label, icon }) => {
        const isActive = currentPage === slug || currentPage === page.replace(".html", "");
        return `
            <div
                class="dock-item${isActive ? " dock-item--active" : ""}"
                data-page="${page}"
                role="link"
                tabindex="0"
                aria-label="${label}"
                ${isActive ? 'aria-current="page"' : ""}
            >${icon}</div>
        `;
    }).join("");
}

function bindDockItems() {
    $$(".dock-item").forEach((item) => {
        const navigate = () => {
            const page = item.dataset.page;
            if (page) window.location.href = page;
        };

        item.addEventListener("click", navigate);
        item.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate();
            }
        });
    });
}

/** Кликабельные элементы shell, общие для всех product-страниц */
function bindShellLinks() {
    $$(".user-pill").forEach((pill) => {
        if (pill.closest("a")) return;
        pill.style.cursor = "pointer";
        pill.setAttribute("role", "link");
        pill.setAttribute("tabindex", "0");
        pill.setAttribute("aria-label", "Профиль");
        const go = () => { window.location.href = "profile.html"; };
        pill.addEventListener("click", go);
        pill.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                go();
            }
        });
    });

    $$("[data-nav]").forEach((el) => {
        el.addEventListener("click", () => {
            const target = el.dataset.nav;
            if (target) window.location.href = target;
        });
    });
}

export function initNavigation() {
    if (!document.body.dataset.page) return;

    renderDock();
    bindDockItems();
    bindShellLinks();
}

export function initCommandPalette() {
    const overlay = $(".command-palette");
    if (!overlay) return;

    const input = $(".command-palette__input", overlay);
    const open = () => {
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        input?.focus();
    };
    const close = () => {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
    };

    document.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault();
            open();
        }
        if (e.key === "Escape") close();
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    $$("[aria-label='Поиск (Cmd+K)'], [aria-label='Поиск — Cmd+K']").forEach((btn) => {
        btn.addEventListener("click", open);
    });
}
