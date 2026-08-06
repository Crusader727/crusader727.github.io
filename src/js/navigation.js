import { $, $$ } from "./utils.js";

export function initNavigation() {
    const dockItems = $$(".dock-item");
    const currentPage = document.body.dataset.page;

    dockItems.forEach((item) => {
        if (item.dataset.page === currentPage || item.dataset.page === `${currentPage}.html`) {
            item.classList.add("dock-item--active");
            item.setAttribute("aria-current", "page");
        }

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
