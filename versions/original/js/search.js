import { $, $$ } from "./utils.js";

/** Global searchable items across the product */
export const SEARCH_INDEX = [
    { title: "Dashboard", desc: "Главный экран", category: "Разделы", url: "dashboard.html", keywords: ["главная", "home"] },
    { title: "Карты", desc: "Управление картами жителя", category: "Разделы", url: "cards.html", keywords: ["карта", "qr", "nfc"] },
    { title: "Льготы", desc: "Каталог льгот региона", category: "Разделы", url: "benefits.html", keywords: ["benefits"] },
    { title: "Акции", desc: "Предложения партнёров", category: "Разделы", url: "promotions.html", keywords: ["скидки", "promotions"] },
    { title: "Сервисы", desc: "Библиотека сервисов", category: "Разделы", url: "services.html", keywords: ["services"] },
    { title: "Документы", desc: "Цифровой кошелёк", category: "Разделы", url: "documents.html", keywords: ["паспорт", "снилс"] },
    { title: "Профиль", desc: "Цифровая идентичность", category: "Разделы", url: "profile.html", keywords: ["аккаунт"] },
    { title: "Уведомления", desc: "Центр уведомлений", category: "Разделы", url: "notifications.html", keywords: ["notifications"] },
    { title: "Настройки", desc: "Параметры приложения", category: "Разделы", url: "settings.html", keywords: ["settings"] },
    { title: "Бесплатный проезд", desc: "Льгота на общественный транспорт", category: "Льготы", url: "benefits.html", keywords: ["транспорт", "метро"] },
    { title: "Медицинские услуги", desc: "Льготное обслуживание в поликлиниках", category: "Льготы", url: "benefits.html", keywords: ["медицина"] },
    { title: "Компенсация ЖКХ", desc: "Частичная оплата коммунальных услуг", category: "Льготы", url: "benefits.html", keywords: ["жкх"] },
    { title: "Культурные мероприятия", desc: "Скидки на театры и музеи", category: "Льготы", url: "benefits.html", keywords: ["культура"] },
    { title: "Лекарства", desc: "Компенсация стоимости препаратов", category: "Льготы", url: "benefits.html", keywords: ["аптека"] },
    { title: "Аптеки — скидка 20%", desc: "На все лекарства по карте", category: "Акции", url: "promotions.html", keywords: ["аптека"] },
    { title: "Кафе — кэшбэк 5%", desc: "Сеть партнёрских кофеен", category: "Акции", url: "promotions.html", keywords: ["кофе"] },
    { title: "Супермаркеты — 10%", desc: "Скидка по выходным", category: "Акции", url: "promotions.html", keywords: ["продукты"] },
    { title: "Кино 2=1", desc: "Кинотеатры-партнёры", category: "Акции", url: "promotions.html", keywords: ["билеты"] },
    { title: "Запись к врачу", desc: "Онлайн-запись в поликлиники", category: "Сервисы", url: "services.html", keywords: ["врач"] },
    { title: "Транспорт", desc: "Расписание и оплата проезда", category: "Сервисы", url: "services.html", keywords: ["маршруты"] },
    { title: "Госуслуги", desc: "Справки и заявления", category: "Сервисы", url: "services.html", keywords: ["мфц"] },
    { title: "ЖКХ", desc: "Показания счётчиков и оплата", category: "Сервисы", url: "services.html", keywords: ["коммуналка"] },
    { title: "Паспорт", desc: "Удостоверение личности", category: "Документы", url: "documents.html", keywords: [] },
    { title: "СНИЛС", desc: "Социальный номер", category: "Документы", url: "documents.html", keywords: [] },
    { title: "Полис ОМС", desc: "Медицинский полис", category: "Документы", url: "documents.html", keywords: ["oms"] },
    { title: "ИНН", desc: "Налоговый номер", category: "Документы", url: "documents.html", keywords: [] },
    { title: "Безопасность", desc: "2FA, биометрия, устройства", category: "Настройки", url: "settings.html#security", keywords: ["2fa"] },
    { title: "Интерфейс", desc: "Тема, размер текста, анимации", category: "Настройки", url: "settings.html#interface", keywords: ["тема"] },
    { title: "Конфиденциальность", desc: "Данные и экспорт", category: "Настройки", url: "settings.html#privacy", keywords: [] },
    { title: "Аптека «Здоровье»", desc: "Партнёр — скидка 20%", category: "Организации", url: "promotions.html", keywords: [] },
    { title: "Поликлиника №3", desc: "Запись через сервис региона", category: "Организации", url: "services.html", keywords: [] },
];

function scoreItem(item, query) {
    const q = query.toLowerCase();
    const haystack = [item.title, item.desc, item.category, ...(item.keywords ?? [])].join(" ").toLowerCase();
    if (item.title.toLowerCase().startsWith(q)) return 100;
    if (item.title.toLowerCase().includes(q)) return 80;
    if (haystack.includes(q)) return 50;
    return 0;
}

function groupResults(items) {
    const groups = new Map();
    items.forEach((item) => {
        if (!groups.has(item.category)) groups.set(item.category, []);
        groups.get(item.category).push(item);
    });
    return groups;
}

function ensureResultsContainer(overlay) {
    let results = $(".spotlight__results", overlay);
    if (!results) {
        const box = $(".command-palette__box", overlay);
        results = document.createElement("div");
        results.className = "spotlight__results";
        results.setAttribute("role", "listbox");
        box.appendChild(results);
    }
    return results;
}

export function initSpotlightSearch() {
    const overlay = $(".command-palette");
    if (!overlay) return;

    const input = $(".command-palette__input", overlay);
    const resultsEl = ensureResultsContainer(overlay);
    let activeIndex = 0;
    let flatResults = [];

    const navigate = (url) => {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        if (input) input.value = "";

        if (url.includes("#")) {
            const [page, hash] = url.split("#");
            if (window.location.pathname.endsWith(page)) {
                window.location.hash = hash;
                return;
            }
            sessionStorage.setItem("rc-settings-hash", hash);
            window.location.href = url;
        } else {
            window.location.href = url;
        }
    };

    const render = (query) => {
        const q = query.trim();
        flatResults = q
            ? SEARCH_INDEX.map((item) => ({ item, score: scoreItem(item, q) }))
                  .filter(({ score }) => score > 0)
                  .sort((a, b) => b.score - a.score)
                  .map(({ item }) => item)
            : SEARCH_INDEX.filter((item) => item.category === "Разделы");

        activeIndex = 0;
        resultsEl.innerHTML = "";

        if (!flatResults.length) {
            resultsEl.innerHTML = `<div class="spotlight__empty">Ничего не найдено</div>`;
            return;
        }

        groupResults(flatResults).forEach((items, category) => {
            const group = document.createElement("div");
            group.className = "spotlight__group";
            group.innerHTML = `<div class="spotlight__group-title">${category}</div>`;

            items.forEach((item) => {
                const idx = flatResults.indexOf(item);
                const el = document.createElement("button");
                el.type = "button";
                el.className = "spotlight__item" + (idx === activeIndex ? " spotlight__item--active" : "");
                el.dataset.url = item.url;
                el.setAttribute("role", "option");
                el.innerHTML = `
                    <span class="spotlight__item-title">${item.title}</span>
                    <span class="spotlight__item-desc">${item.desc}</span>
                `;
                el.addEventListener("click", () => navigate(item.url));
                group.appendChild(el);
            });
            resultsEl.appendChild(group);
        });
    };

    const updateActive = () => {
        $$(".spotlight__item", resultsEl).forEach((el, i) => {
            el.classList.toggle("spotlight__item--active", i === activeIndex);
            if (i === activeIndex) el.scrollIntoView({ block: "nearest" });
        });
    };

    input?.addEventListener("input", () => render(input.value));

    input?.addEventListener("keydown", (e) => {
        const items = $$(".spotlight__item", resultsEl);
        if (!items.length) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            activeIndex = (activeIndex + 1) % items.length;
            updateActive();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            activeIndex = (activeIndex - 1 + items.length) % items.length;
            updateActive();
        } else if (e.key === "Enter") {
            e.preventDefault();
            const url = items[activeIndex]?.dataset.url;
            if (url) navigate(url);
        }
    });

    const observer = new MutationObserver(() => {
        if (overlay.classList.contains("is-open")) {
            render(input?.value ?? "");
            activeIndex = 0;
        } else if (input) {
            input.value = "";
            resultsEl.innerHTML = "";
        }
    });
    observer.observe(overlay, { attributes: true, attributeFilter: ["class"] });
}
