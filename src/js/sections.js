import { $, $$ } from "./utils.js";

/** Filter catalog cards by category chip */
export function initFilterBar() {
    $$(".filter-bar").forEach((bar) => {
        const chips = $$(".chip", bar);
        const grid = bar.nextElementSibling?.classList.contains("catalog-grid")
            ? bar.nextElementSibling
            : bar.parentElement?.querySelector(".catalog-grid");
        if (!grid) return;

        chips.forEach((chip) => {
            chip.addEventListener("click", () => {
                chips.forEach((c) => c.classList.remove("chip--active"));
                chip.classList.add("chip--active");

                const filter = chip.dataset.filter ?? chip.textContent.trim().toLowerCase();
                $$(".catalog-card, .promo-row__item", grid).forEach((card) => {
                    if (card.querySelector(".doc-card__name")?.textContent === "Новый документ") {
                        card.hidden = filter !== "all" && filter !== "все";
                        return;
                    }

                    const category = (card.dataset.category ?? "all").toLowerCase();
                    const isFavorite = card.dataset.favorite === "true" ||
                        card.querySelector(".catalog-card__fav.is-favorite");

                    let match =
                        filter === "все" ||
                        filter === "all" ||
                        category.split(/\s+/).includes(filter) ||
                        category.includes(filter);

                    if (filter === "favorite" || filter === "избранное") {
                        match = isFavorite;
                    }

                    card.hidden = !match;
                    card.classList.toggle("is-filtered-out", !match);
                });

                const empty = $(".empty-state", grid.parentElement);
                const visible = $$(".catalog-card:not(.is-filtered-out)", grid).filter((c) => !c.hidden);
                if (empty) empty.hidden = visible.length > 0;

                $$("[data-filter-reset]", grid.parentElement).forEach((btn) => {
                    btn.hidden = visible.length > 0;
                });
            });
        });

        $$("[data-filter-reset]", bar.parentElement).forEach((btn) => {
            btn.addEventListener("click", () => {
                const allChip = chips.find((c) => (c.dataset.filter ?? "") === "all") ?? chips[0];
                allChip?.click();
            });
        });
    });
}

/** In-scene card switching on Cards page */
export function initCardSwitcher() {
    const switcher = $(".card-switcher");
    const display = $(".card-display");
    if (!switcher || !display) return;

    const cards = {
        main: {
            number: "•••• 4589",
            name: "Александр",
            label: "Resident Card",
            status: "● Активна",
            statusClass: "badge--success",
            since: "Активна с 2024",
        },
        student: {
            number: "•••• 7821",
            name: "Александр",
            label: "Студенческая",
            status: "● Подключена",
            statusClass: "badge--primary",
            since: "Дополнительная",
        },
        family: {
            number: "•••• 3012",
            name: "Семейная",
            label: "Resident Card",
            status: "○ Не активна",
            statusClass: "badge--muted",
            since: "Доступна для подключения",
        },
    };

    $$(".card-switcher__item", switcher).forEach((item) => {
        item.addEventListener("click", () => {
            const key = item.dataset.card;
            const data = cards[key];
            if (!data) return;

            $$(".card-switcher__item", switcher).forEach((i) => i.classList.remove("card-switcher__item--active"));
            item.classList.add("card-switcher__item--active");

            $(".card-display__number", display).textContent = data.number;
            $(".card-display__name", display).textContent = data.name;
            $(".card-display__label", display).textContent = data.label;
            const badge = $(".card-display__badge", display);
            badge.textContent = data.status;
            badge.className = `badge ${data.statusClass} card-display__badge`;

            $$(".catalog-card[data-card-id]", switcher.closest(".section-page")).forEach((card) => {
                card.classList.toggle("catalog-card--selected", card.dataset.cardId === key);
            });

            $$(".card-switcher__item", switcher).forEach((i) => {
                i.setAttribute("aria-selected", i.dataset.card === key ? "true" : "false");
            });
        });
    });

    $$(".catalog-card[data-card-id]", switcher.closest(".section-page")).forEach((card) => {
        card.addEventListener("click", () => {
            const tab = $(`.card-switcher__item[data-card="${card.dataset.cardId}"]`, switcher);
            tab?.click();
        });
    });
}

/** Toggle favorite on catalog cards */
export function initFavorites() {
    $$(".catalog-card[data-favoritable]").forEach((card) => {
        const btn = $(".catalog-card__fav", card);
        if (!btn) return;

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isFav = btn.classList.toggle("is-favorite");
            btn.textContent = isFav ? "★" : "☆";
            btn.setAttribute("aria-pressed", String(isFav));
            btn.setAttribute("aria-label", isFav ? "Убрать из избранного" : "В избранное");
            card.dataset.favorite = isFav ? "true" : "false";
        });

        if (btn.classList.contains("is-favorite")) {
            card.dataset.favorite = "true";
        }
    });
}

/** QR overlay for cards and documents */
export function initQrOverlay() {
    const overlay = $(".qr-overlay");
    if (!overlay) return;

    const title = $(".qr-overlay__title", overlay);
    const close = () => {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
    };

    $$("[data-action='show-qr']").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (title) title.textContent = btn.dataset.qrTitle ?? "QR-код";
            overlay.classList.add("is-open");
            overlay.setAttribute("aria-hidden", "false");
        });
    });

    $(".qr-overlay__close", overlay)?.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
    });
}

function initDivisionCards() {
    $$("[data-filter-target]").forEach((card) => {
        card.addEventListener("click", (e) => {
            const target = card.dataset.filterTarget;
            const chip = $(`.filter-bar .chip[data-filter="${target}"]`);
            if (chip) {
                chip.click();
                chip.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    });
}

export function initSections() {
    initFilterBar();
    initCardSwitcher();
    initFavorites();
    initQrOverlay();
    initDivisionCards();
}
