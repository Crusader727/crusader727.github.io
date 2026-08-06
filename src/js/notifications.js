import { $, $$ } from "./utils.js";

export const NOTIFICATIONS = [
    { id: 1, title: "Новая акция — Аптеки", desc: "Скидка 20% на все лекарства до 31 августа", category: "promotions", time: "2 часа назад", read: false, pinned: true },
    { id: 2, title: "Обновлён полис ОМС", desc: "Документ актуален до 15.07.2027", category: "documents", time: "Вчера", read: false, pinned: false },
    { id: 3, title: "Льгота «Транспорт» использована", desc: "Проезд в метро — 08:42", category: "benefits", time: "Сегодня", read: true, pinned: false },
    { id: 4, title: "Запись к врачу подтверждена", desc: "Терапевт, 12 августа, 10:30", category: "services", time: "Вчера", read: true, pinned: false },
    { id: 5, title: "Новый сервис «Парковки»", desc: "Оплата парковки теперь в приложении", category: "services", time: "3 дня назад", read: false, pinned: false },
    { id: 6, title: "Кэшбэк начислен", desc: "+25 бонусов за покупку в кафе", category: "promotions", time: "3 дня назад", read: true, pinned: false },
    { id: 7, title: "Обновление системы", desc: "Resident Card 2.0 — новый интерфейс", category: "system", time: "5 дней назад", read: true, pinned: false },
    { id: 8, title: "Компенсация ЖКХ доступна", desc: "Оформите льготу в разделе «Льготы»", category: "benefits", time: "1 неделю назад", read: false, pinned: false },
    { id: 9, title: "Подтверждение входа", desc: "Новый вход с MacBook Pro", category: "system", time: "1 неделю назад", read: true, pinned: false },
    { id: 10, title: "Студенческий обновлён", desc: "Документ действителен до 06.2027", category: "documents", time: "2 недели назад", read: true, pinned: false },
];

const CATEGORY_LABELS = {
    all: "Все",
    promotions: "Акции",
    documents: "Документы",
    benefits: "Льготы",
    services: "Сервисы",
    system: "Система",
};

function renderNotificationItem(n) {
    return `
        <article class="notification-item${n.read ? "" : " notification-item--unread"}${n.pinned ? " notification-item--pinned" : ""}" data-id="${n.id}" data-category="${n.category}">
            <div class="notification-item__body">
                <div class="notification-item__title">${n.title}</div>
                <div class="notification-item__desc">${n.desc}</div>
                <div class="notification-item__meta">${CATEGORY_LABELS[n.category] ?? n.category} · ${n.time}</div>
            </div>
            <div class="notification-item__actions">
                <button class="chip notification-item__pin" aria-label="${n.pinned ? "Открепить" : "Закрепить"}" aria-pressed="${n.pinned}">${n.pinned ? "📌" : "📍"}</button>
                ${n.read ? "" : `<button class="chip notification-item__read" aria-label="Отметить прочитанным">✓</button>`}
            </div>
        </article>
    `;
}

function sortNotifications(list) {
    return [...list].sort((a, b) => {
        if (a.pinned !== b.pinned) return b.pinned - a.pinned;
        if (a.read !== b.read) return a.read - b.read;
        return a.id - b.id;
    });
}

function bindNotificationEvents(container, data, onUpdate) {
    $$(".notification-item__read", container).forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = Number(btn.closest(".notification-item").dataset.id);
            const item = data.find((n) => n.id === id);
            if (item) item.read = true;
            onUpdate();
        });
    });

    $$(".notification-item__pin", container).forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = Number(btn.closest(".notification-item").dataset.id);
            const item = data.find((n) => n.id === id);
            if (item) item.pinned = !item.pinned;
            onUpdate();
        });
    });
}

function renderList(container, data, filter, query) {
    let filtered = data.filter((n) => filter === "all" || n.category === filter);
    if (query) {
        const q = query.toLowerCase();
        filtered = filtered.filter((n) => `${n.title} ${n.desc}`.toLowerCase().includes(q));
    }
    filtered = sortNotifications(filtered);

    if (!filtered.length) {
        container.innerHTML = `<div class="notification-empty">Нет уведомлений</div>`;
        return;
    }
    container.innerHTML = filtered.map(renderNotificationItem).join("");
}

function updateBadge(data) {
    const unread = data.filter((n) => !n.read).length;
    $$(".notification-badge").forEach((badge) => {
        badge.textContent = unread > 0 ? unread : "";
        badge.hidden = unread === 0;
    });
}

function injectNotificationCenter(data) {
    if ($(".notification-center")) return;

    const el = document.createElement("div");
    el.className = "notification-center";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `
        <div class="notification-center__panel" role="dialog" aria-label="Центр уведомлений">
            <header class="notification-center__header">
                <h2>Уведомления</h2>
                <div class="notification-center__header-actions">
                    <button class="chip" data-action="mark-all-read">Прочитать все</button>
                    <button class="chip notification-center__close" aria-label="Закрыть">✕</button>
                </div>
            </header>
            <input class="notification-center__search" type="search" placeholder="Поиск уведомлений…" aria-label="Поиск" />
            <div class="filter-bar notification-center__filters">
                <button class="chip chip--active" data-filter="all">Все</button>
                <button class="chip" data-filter="promotions">Акции</button>
                <button class="chip" data-filter="documents">Документы</button>
                <button class="chip" data-filter="benefits">Льготы</button>
                <button class="chip" data-filter="services">Сервисы</button>
                <button class="chip" data-filter="system">Система</button>
            </div>
            <div class="notification-list"></div>
            <a href="notifications.html" class="notification-center__link">Открыть все уведомления →</a>
        </div>
    `;
    document.body.appendChild(el);
    return el;
}

export function initNotificationCenter() {
    if (!document.body.dataset.page) return;

    const data = NOTIFICATIONS.map((n) => ({ ...n }));
    const center = injectNotificationCenter(data);
    if (!center) return;

    const list = $(".notification-list", center);
    const searchInput = $(".notification-center__search", center);
    let currentFilter = "all";

    const refresh = () => {
        renderList(list, data, currentFilter, searchInput?.value ?? "");
        bindNotificationEvents(list, data, refresh);
        updateBadge(data);
    };

    refresh();

    const open = () => {
        center.classList.add("is-open");
        center.setAttribute("aria-hidden", "false");
    };
    const close = () => {
        center.classList.remove("is-open");
        center.setAttribute("aria-hidden", "true");
    };

    $$("[aria-label='Уведомления']").forEach((btn) => {
        if (!btn.querySelector(".notification-badge")) {
            const badge = document.createElement("span");
            badge.className = "notification-badge";
            badge.setAttribute("aria-hidden", "true");
            btn.appendChild(badge);
        }
        btn.addEventListener("click", open);
    });

    $(".notification-center__close", center)?.addEventListener("click", close);
    center.addEventListener("click", (e) => {
        if (e.target === center) close();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && center.classList.contains("is-open")) close();
    });

    $("[data-action='mark-all-read']", center)?.addEventListener("click", () => {
        data.forEach((n) => { n.read = true; });
        refresh();
    });

    searchInput?.addEventListener("input", refresh);

    $$(".notification-center__filters .chip", center).forEach((chip) => {
        chip.addEventListener("click", () => {
            $$(".notification-center__filters .chip", center).forEach((c) => c.classList.remove("chip--active"));
            chip.classList.add("chip--active");
            currentFilter = chip.dataset.filter ?? "all";
            refresh();
        });
    });

    updateBadge(data);
}

export function initNotificationsPage() {
    if (document.body.dataset.page !== "notifications") return;

    const data = NOTIFICATIONS.map((n) => ({ ...n }));
    const list = $(".notification-page__list");
    const searchInput = $(".notification-page__search");
    let currentFilter = "all";

    if (!list) return;

    const refresh = () => {
        renderList(list, data, currentFilter, searchInput?.value ?? "");
        bindNotificationEvents(list, data, refresh);
    };

    refresh();

    searchInput?.addEventListener("input", refresh);

    $$(".notification-page__filters .chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            $$(".notification-page__filters .chip").forEach((c) => c.classList.remove("chip--active"));
            chip.classList.add("chip--active");
            currentFilter = chip.dataset.filter ?? "all";
            refresh();
        });
    });

    $("[data-action='mark-all-read']")?.addEventListener("click", () => {
        data.forEach((n) => { n.read = true; });
        refresh();
    });
}
