/* Карта жителя — v5. Ванильный SPA. Дизайн-база: versions/v3. */
(function () {
  'use strict';
  var D = window.DATA;
  var app = document.getElementById('app');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Иконки (lucide-подобные) ---------- */
  var P = {
    landmark: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2 3 8h18z"/>',
    bus: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 11h18M7 20v-3M17 20v-3"/><circle cx="7.5" cy="14" r=".6" fill="currentColor"/><circle cx="16.5" cy="14" r=".6" fill="currentColor"/>',
    'bus-front': '<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M4 11h16M8 4V2M16 4V2M7 19v2M17 19v2"/><circle cx="8" cy="15" r=".6" fill="currentColor"/><circle cx="16" cy="15" r=".6" fill="currentColor"/>',
    'graduation-cap': '<path d="m22 10-10-5L2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5"/>',
    milk: '<path d="M8 2h8M9 2v2.8a2 2 0 0 1-.4 1.2L7 9v11a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9l-1.6-3A2 2 0 0 1 15 4.8V2"/><path d="M7 14h10"/>',
    pill: '<path d="m10.5 20.5 10-10a5 5 0 0 0-7-7l-10 10a5 5 0 0 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',
    'tent-tree': '<circle cx="4" cy="4" r="2"/><path d="M14 6a4 4 0 0 0-8 0M10 21 4 6M8 21l6-15M8 21h8M13 12l7 9M20 15v6h-6"/>',
    wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/><path d="M18 12h.01"/>',
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-up': '<path d="m18 15-6-6-6 6"/>',
    'chevron-right': '<path d="m9 6 6 6-6 6"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    'log-out': '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>',
    'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    map: '<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    'triangle-alert': '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
    'monitor-smartphone': '<path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8M10 19h4M8 15v4M16 10h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z"/>',
    smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
    'shopping-basket': '<path d="m5 11 4-7M19 11l-4-7M2 11h20l-1.4 8.4a2 2 0 0 1-2 1.6H5.4a2 2 0 0 1-2-1.6z"/><path d="M10 15v2M14 15v2"/>',
    'book-open': '<path d="M12 7v14M3 5h5a3 3 0 0 1 3 3M21 5h-5a3 3 0 0 0-3 3M3 5v14h5a3 3 0 0 1 3 3M21 5v14h-5a3 3 0 0 0-3 3"/>',
    croissant: '<path d="m5 15 4-1M15 5l-1 4M4 19l4-9 5 5-9 4ZM3 12a4 4 0 0 1 4-4M12 3a4 4 0 0 0-4 4M21 12a4 4 0 0 0-4-4M12 21a4 4 0 0 1 4-4"/>',
    glasses: '<circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M14 15a2 2 0 0 0-4 0M2.5 13 5 7c.7-1.3 1.4-2 3-2M21.5 13 19 7c-.7-1.3-1.5-2-3-2"/>',
    drama: '<path d="M10 11h.01M14 6h.01M18 6h.01M6.5 13.1h.01M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3ZM2 8c0 9 4 12 6 12M8 20c-2 0-3.5-1-4.5-2.5"/>',
    'paw-print': '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="4" cy="8" r="2"/><circle cx="7.5" cy="14.5" r="2.5"/><path d="M11 14c2 0 4 1 4 4a3 3 0 0 1-6 0c0-3 0-4-2-4"/>',
    dumbbell: '<path d="m6.5 6.5 11 11M21 21l-1-1M3 3l1 1M18 22l4-4M2 6l4-4M3 10l7-7M14 21l7-7"/>',
    pencil: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-3.5-3.5"/>',
  };
  function icon(n, size, color) {
    size = size || 22;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="' + (color || 'currentColor') +
      '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (P[n] || '') + '</svg>';
  }

  /* ---------- helpers ---------- */
  function emblem(size) {
    size = size || 40;
    return '<span class="emblem" style="width:' + size + 'px;height:' + Math.round(size * 1.12) + 'px">' + icon('landmark', Math.round(size * 0.52), '#fff') + '</span>';
  }
  function wordmark(opts) {
    opts = opts || {}; var size = opts.size || 40;
    return '<button class="wordmark' + (opts.inverse ? ' inv' : '') + '"' + (opts.go ? ' data-go="' + opts.go + '"' : '') + '>' +
      emblem(size) + '<span class="wm-txt">' +
      '<span class="wm-1" style="font-size:' + (size * 0.42) + 'px">Карта жителя</span>' +
      '<span class="wm-2" style="font-size:' + (size * 0.32) + 'px">' + D.region + '</span></span></button>';
  }
  function avatarBox(p, size) { return '<span class="gate-av" style="width:' + size + 'px;height:' + size + 'px;background:' + p.color + ';font-size:' + Math.round(size * 0.4) + 'px">' + p.initials + '</span>'; }
  var STATUS_TONE = { 'Активная': 'success', 'Подключена': 'success', 'Одобрена': 'success', 'На проверке': 'warning', 'Доступна для подключения': 'brand', 'Карта отключена': 'neutral', 'Отключена': 'neutral', 'Недоступна': 'neutral', 'Заблокирована': 'danger', 'Отклонена': 'danger' };
  function status(text) { return '<span class="badge badge-' + (STATUS_TONE[text] || 'neutral') + '"><span class="dot"></span>' + text + '</span>'; }
  function btn(label, variant, opts) {
    opts = opts || {};
    return '<button class="btn btn-' + variant + (opts.size ? ' btn-' + opts.size : '') + '"' +
      (opts.go ? ' data-go="' + opts.go + '"' : '') + (opts.act ? ' data-action="' + opts.act + '"' : '') +
      (opts.attr || '') + '>' + (opts.iconL ? icon(opts.iconL, 18) : '') + label + (opts.iconR ? icon(opts.iconR, 16) : '') + '</button>';
  }
  function table(cols, rows) {
    var head = cols.map(function (c) { return '<th' + (c.w ? ' style="width:' + c.w + 'px"' : '') + '>' + c.title + '</th>'; }).join('');
    var body = rows.map(function (r) {
      return '<tr>' + cols.map(function (c) {
        var v = r[c.key];
        return '<td>' + (v == null || v === '' ? '<span class="empty">—</span>' : v) + '</td>';
      }).join('') + '</tr>';
    }).join('');
    return '<div class="tbl-wrap"><div class="tbl-scroll"><table class="tbl"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div></div>';
  }

  /* ---------- Состояние ---------- */
  var S = { profileId: null, route: 'landing', hc: false, menuOpen: false,
    promoTab: 'my', promoQ: '', promoCat: '', promoMore: false, cardOn: null, _tiltMove: null };
  function profile() { return D.profiles.filter(function (p) { return p.id === S.profileId; })[0] || null; }

  /* ================= LANDING ================= */
  function landingHeader() {
    var nav = D.landingMenu.map(function (m) { return '<button data-action="scroll" data-to="' + m[0] + '">' + m[1] + '</button>'; }).join('');
    return '<div class="lhead"><div class="lhead-inner">' + wordmark({ size: 38, go: 'landing' }) +
      '<nav class="lnav">' + nav + '</nav>' +
      '<div class="lhead-right"><a class="lhead-phone hide-sm" href="tel:88003501450">' + D.phone + '</a>' +
      hcToggle() + btn('Личный кабинет', 'brand', { act: 'enter' }) + '</div></div></div>';
  }
  function hcToggle() {
    return '<button class="hc-toggle' + (S.hc ? ' on' : '') + '" data-action="hc">' + icon('eye', 18) + (S.hc ? 'Обычная версия' : 'Высокая контрастность') + '</button>';
  }
  function landingHero() {
    var stats = [['186 000', 'жителей уже с картой', 186000, 'space'], ['24', 'льготы подключаются онлайн', 24, ''], ['340+', 'партнёров с кешбэком', 340, '+']];
    var st = stats.map(function (s) {
      return '<div class="hstat"><b data-count="' + s[2] + '" data-fmt="' + s[3] + '">' + s[0] + '</b><span>' + s[1] + '</span></div>';
    }).join('');
    return '<section class="hero"><div class="hero-grid">' +
      '<div class="hero-left"><span class="seclabel">Социальный сервис региона</span>' +
      '<h1>Карта жителя<br><span class="br">' + D.region.replace(' области', ' области.') + '</span></h1>' +
      '<p class="hero-lede">Удобная банковская карта для доступа к региональным льготам, проезду и бонусам партнёров. Одна карта вместо стопки справок.</p>' +
      '<div class="hero-actions">' + btn('Подключить карту', 'brand', { size: 'lg', act: 'scroll', attr: ' data-to="how"' }) + btn('Войти в кабинет', 'secondary', { size: 'lg', act: 'enter' }) + '</div>' +
      '<div class="hstats">' + st + '</div></div>' +
      '<div class="hero-cardwrap"><div class="bankcard">' +
      '<div class="bc-top"><span class="bc-brand">' + icon('landmark', 30, '#fff') + '<span class="bc-name">Карта жителя</span></span><span class="bc-mir">МИР</span></div>' +
      '<div><div class="bc-num">2202 •••• •••• 4417</div><div class="bc-holder">Е. С. Селиванова</div></div>' +
      '</div></div></div></section>';
  }
  function landingHow() {
    var ways = D.ways.map(function (w) { return '<div class="fcard reveal"><span class="fc-ic">' + icon(w.icon, 24) + '</span><h4>' + w.t + '</h4><p>' + w.d + '</p></div>'; }).join('');
    var steps = D.steps.map(function (s, i) { return '<li><span class="step-num">' + (i + 1) + '</span>' + s + '</li>'; }).join('');
    return '<section class="sec sec-blue" id="how"><div class="sec-inner">' +
      '<div class="head"><span class="seclabel">Как подключить</span><h2>Три равнозначных способа получить карту.</h2><p>Выберите тот, который вам удобнее — результат одинаковый.</p></div>' +
      '<div class="svc-grid" style="margin-bottom:34px">' + ways + '</div>' +
      '<div class="how-2" style="display:grid;grid-template-columns:1.4fr 1fr;gap:20px">' +
      '<div class="card card-elevated reveal" style="padding:34px"><h3 class="section-title" style="margin-bottom:4px">Шаги в личном кабинете</h3><ol class="steps">' + steps + '</ol></div>' +
      '<div class="card card-ink reveal" style="padding:34px;display:grid;gap:12px;align-content:start">' + icon('info', 30, 'var(--brand-300)') +
      '<span style="font-family:var(--font-display);font-weight:800;font-size:22px;line-height:1.2">Что взять в пункт подключения</span>' +
      '<span class="muted" style="font-size:16px;line-height:1.6">Паспорт, СНИЛС и справку УСПН о льготной категории, если она уже оформлена. Сотрудник заполнит заявление сам.</span></div>' +
      '</div></div></section>';
  }
  function landingPoints() {
    var week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    var rows = D.points.map(function (p, idx) {
      var days = week.map(function (d, i) { return '<span class="' + (i > 4 ? 'wknd' : '') + '">' + d + ': ' + (i > 5 ? 'выходной' : i === 5 ? '10:00–15:00' : '9:00–19:00') + '</span>'; }).join('');
      return '<div class="point reveal" data-point="' + idx + '"><div class="point-main">' +
        '<span class="point-ic">' + icon('map-pin', 22) + '</span>' +
        '<span class="point-txt"><b>' + p.n + '</b><span>' + p.a + '</span><span>' + p.p + '</span></span>' +
        '<span class="point-right"><span class="badge badge-success"><span class="dot"></span>Открыто сейчас</span>' +
        '<button class="btn btn-ghost" data-action="point" data-i="' + idx + '">' + p.h + icon('chevron-down', 18) + '</button></span></div>' +
        '<div class="point-week hidden">' + days + '</div></div>';
    }).join('');
    return '<section class="sec" id="points"><div class="sec-inner">' +
      '<div style="display:flex;align-items:flex-end;gap:24px;flex-wrap:wrap">' +
      '<div class="head" style="margin-bottom:44px"><span class="seclabel">Где получить</span><h2>Пункты подключения рядом с домом.</h2><p>Более 60 точек в области: банки-партнёры, МФЦ и центры соцподдержки.</p></div>' +
      '<div style="margin-left:auto;margin-bottom:44px" class="tabs"><button data-action="pt-view" data-v="map">Карта</button><button class="active" data-action="pt-view" data-v="list">Список</button></div></div>' +
      '<div style="display:grid;gap:16px">' + rows + '</div></div></section>';
  }
  function landingFaq() {
    var cats = Object.keys(D.faq);
    var tags = cats.map(function (c) { return '<button class="tagchip' + (c === (S.faqCat || cats[0]) ? ' active' : '') + '" data-action="faqcat" data-c="' + c + '">' + c + '</button>'; }).join('');
    var cur = S.faqCat || cats[0];
    var items = D.faq[cur].map(function (qa, i) {
      return '<div class="faq-i"><button class="faq-q" data-action="faq">' + qa[0] + '<span class="fq-ic">' + icon('plus', 20) + '</span></button>' +
        '<div class="faq-a"><div class="faq-a-in">' + qa[1] + '</div></div></div>';
    }).join('');
    return '<section class="sec sec-cream" id="faq"><div class="sec-inner">' +
      '<div class="head center"><span class="seclabel">Частые вопросы</span><h2>Коротко о главном.</h2></div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:30px">' + tags + '</div>' +
      '<div class="faq-list">' + items + '</div></div></section>';
  }
  function supportForm(compact) {
    var topics = D.supportTopics.map(function (t) { return '<option>' + t + '</option>'; }).join('');
    return '<form class="form card card-elevated" data-action="submit" style="padding:30px;align-content:start">' +
      '<div class="field"><label>Тема обращения <span class="req">*</span></label><select class="inp"><option value="">Выберите тему</option>' + topics + '</select></div>' +
      '<div class="field"><label>Обращение <span class="req">*</span></label><textarea class="inp" rows="4" placeholder="Опишите ситуацию своими словами"></textarea></div>' +
      '<div class="frow"><div class="field"><label>Фамилия <span class="req">*</span></label><input class="inp" placeholder="Селиванова"></div>' +
      '<div class="field"><label>Имя <span class="req">*</span></label><input class="inp" placeholder="Екатерина"></div>' +
      (compact ? '' : '<div class="field"><label>Отчество</label><input class="inp" placeholder="Сергеевна"></div>') + '</div>' +
      '<div class="field"><label>Способ получения ответа</label><div class="radio-row">' +
      '<label class="radio"><input type="radio" name="r" checked> Звонок оператора</label>' +
      '<label class="radio"><input type="radio" name="r"> Электронная почта</label>' +
      '<label class="radio"><input type="radio" name="r"> Ответ не требуется</label></div></div>' +
      '<div class="check-col"><label class="check"><input type="checkbox" checked> Я даю согласие на обработку персональных данных</label>' +
      '<label class="check"><input type="checkbox" checked> Я согласен с порядком рассмотрения обращений</label></div>' +
      btn('Отправить', 'brand', { size: 'lg', attr: ' type="submit" style="justify-self:start"' }) + '</form>';
  }
  function landingSupport() {
    var contacts = D.supportContacts.map(function (c) {
      var ic = c[0] === 'phone' ? 'phone' : c[0] === 'mail' ? 'mail' : 'map-pin';
      return '<span style="display:flex;gap:12px;align-items:center;font-size:17px;color:var(--ink-700)">' + icon(ic, 20, 'var(--brand-500)') + c[1] + '</span>';
    }).join('');
    return '<section class="sec" id="support"><div class="sec-inner supp-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:46px;align-items:start">' +
      '<div style="display:grid;gap:24px"><div class="head" style="margin-bottom:0"><span class="seclabel">Поддержка</span><h2>Не нашли ответ — напишите нам.</h2><p>Опишите ситуацию своими словами. Оператор ответит звонком или письмом — как вам удобнее.</p></div>' +
      '<div class="card card-tinted" style="padding:30px;display:grid;gap:14px">' + contacts + '</div></div>' +
      supportForm(true) + '</div></section>';
  }
  function landingCta() {
    return '<section style="padding:0 24px 96px"><div class="cta2">' +
      '<h2>Оформите карту жителя за 5 минут.</h2><p>Вход по Госуслугам — заявление заполнится автоматически.</p>' +
      '<div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center">' + btn('Подключить карту', 'brand', { size: 'lg', act: 'enter' }) + btn('Найти пункт рядом', 'secondary', { size: 'lg', act: 'scroll', attr: ' data-to="points"' }) + '</div></div></section>';
  }
  function landingFooter() {
    var nav = D.landingMenu.map(function (m) { return '<a data-action="scroll" data-to="' + m[0] + '">' + m[1] + '</a>'; }).join('');
    return '<footer class="foot" style="margin-top:0"><div class="foot-inner" style="display:grid;gap:34px">' +
      '<div style="display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap;width:100%">' + wordmark({ inverse: true, size: 40, go: 'landing' }) +
      '<nav class="foot-nav">' + nav + '</nav>' + btn('Личный кабинет', 'brand', { act: 'enter' }) + '</div>' +
      '<div class="foot-bottom"><span>© Все права защищены, 2026</span><span>Версия 1.0</span>' +
      '<span style="margin-left:auto;max-width:620px">Оператор сервиса — Министерство труда и социальной защиты ' + D.region + '. Условия программы лояльности уточняйте у партнёров.</span></div>' +
      '</div></footer>';
  }
  function viewLanding() {
    return '<div>' + landingHeader() + landingHero() + landingHow() + landingPoints() + landingFaq() + landingSupport() + landingCta() + landingFooter() + '</div>';
  }

  /* ================= ЛК: shell ================= */
  function lkHeader() {
    var p = profile();
    var nav = D.lknav.map(function (n) {
      var a = n[0] === S.route || (n[0] === 'home' && S.route === 'transport');
      return '<button class="' + (a ? 'active' : '') + '" data-go="' + n[0] + '">' + n[1] + '</button>';
    }).join('');
    var others = D.profiles.filter(function (x) { return x.id !== p.id; });
    var menu = '';
    if (S.menuOpen) {
      menu = '<div class="menu-scrim" data-action="close-menu"></div><div class="menu">' +
        '<div class="menu-head"><span class="avatar" style="background:' + p.color + ';color:#fff">' + p.initials + '</span><div><b>' + p.name + '</b><span>' + p.role + '</span></div></div>' +
        '<button class="menu-item" data-go="profile"><span class="fam-ic">' + icon('user', 18) + '</span><div class="mt"><b>Мой профиль</b><span>Личные данные</span></div></button>' +
        (others.length ? '<div class="menu-label">Сменить профиль</div>' : '') +
        others.map(function (o) { return '<button class="menu-item" data-action="switch" data-id="' + o.id + '"><span class="avatar" style="width:34px;height:34px;background:' + o.color + ';color:#fff">' + o.initials + '</span><div class="mt"><b>' + o.short + '</b><span>' + o.role + '</span></div></button>'; }).join('') +
        '<div class="menu-divider"></div><button class="menu-plain" data-action="signout">' + icon('log-out', 18) + ' Выйти из аккаунта</button></div>';
    }
    return '<header class="lkhead"><div class="lkhead-top">' + wordmark({ size: 40, go: 'landing' }) +
      '<div class="lkhead-right">' + hcToggle() +
      '<span class="lkhead-name">' + p.short + (p.kind === 'child' ? '<span class="child-badge">Детский</span>' : '') + '</span>' +
      '<div class="menu-wrap"><button class="avatar" style="background:' + p.color + ';color:#fff;cursor:pointer;border:none" data-action="toggle-menu">' + p.initials + '</button>' + menu + '</div>' +
      '<button class="iconbtn" title="Выйти" data-action="signout">' + icon('log-out', 18) + '</button></div></div>' +
      '<nav class="lknav">' + nav + '</nav></header>';
  }
  function lkFooter() {
    var nav = D.lknav.map(function (n) { return '<a data-go="' + n[0] + '">' + n[1] + '</a>'; }).join('');
    return '<footer class="foot"><div class="foot-inner">' +
      '<div style="display:grid;gap:14px">' + wordmark({ inverse: true, size: 38, go: 'landing' }) +
      '<span class="foot-sub">© Все права защищены, 2026 · Версия 1.0</span></div>' +
      '<nav class="foot-nav">' + nav + '</nav></div></footer>';
  }
  function pageHead(o) {
    var crumbs = o.crumbs ? '<div class="crumbs">' + o.crumbs.map(function (c, i) {
      return (i > 0 ? icon('chevron-right', 15, 'var(--ink-300)') : '') + (c.to ? '<a data-go="' + c.to + '">' + c.label + '</a>' : '<span class="cur">' + c.label + '</span>');
    }).join('') + '</div>' : '';
    return crumbs + '<div class="page-head"><div class="ph-txt"><h1>' + o.title + '</h1>' + (o.lead ? '<p>' + o.lead + '</p>' : '') + '</div>' +
      (o.aside ? '<div class="ph-aside">' + o.aside + '</div>' : '') + '</div>';
  }

  /* ================= ЛК: pages ================= */
  function viewHome() {
    var cards = D.services.map(function (s) {
      return '<button class="svc reveal' + (s.off ? ' off' : '') + '"' + (s.to ? ' data-go="' + s.to + '"' : ' disabled') + '>' +
        '<span class="svc-ic" style="background:' + s.tint + ';color:' + s.accent + '">' + icon(s.icon, 38) + '</span>' +
        '<span style="display:grid;gap:6px"><span class="svc-t" style="font-family:var(--font-display);font-weight:800;font-size:var(--text-h4)">' + s.title + '</span>' +
        '<span class="svc-desc">' + s.desc + '</span></span>' +
        '<span class="svc-foot">' + status(s.status) + (s.to ? '<span class="svc-open">Открыть' + icon('arrow-right', 16) + '</span>' : '') + '</span></button>';
    }).join('');
    return '<div class="page">' + pageHead({ title: 'Мои услуги', lead: 'Здесь собраны услуги, доступные вам по карте жителя. Серые карточки пока недоступны — они появятся, если у вас изменится льготная категория.' }) +
      '<div class="wallet reveal"><span class="wallet-ic">' + icon('wallet', 26) + '</span>' +
      '<span><b>Карта жителя •••• 4417 активна</b><span class="sub">3 льготные категории · <span class="mono" data-count="1240" data-fmt="space">1 240</span> бонусных баллов</span></span>' +
      '<span class="wallet-actions">' + btn('Мои льготы', 'brand', { go: 'benefits' }) + btn('Мои карты', 'secondary', { go: 'cards' }) + '</span></div>' +
      '<div class="svc-grid">' + cards + '</div></div>';
  }
  function viewCards() {
    var on = S.cardOn || D.cards.map(function (c) { return c.on; });
    var cardsHtml = D.cards.map(function (c, i) {
      var blocked = c.status === 'Заблокирована';
      return '<div class="bcard-wrap reveal" style="transition-delay:' + (i * 80) + 'ms"><div class="bcard" style="background:' + c.tone + (blocked ? ';filter:saturate(.7)' : '') + '">' +
        '<div class="bc-top">' + icon('landmark', 26, '#fff') + '<span class="bc-mir">МИР</span></div>' +
        '<div><div class="bc-num">' + c.num + '</div><div class="bc-since">Подключена ' + c.since + '</div></div></div>' +
        '<div class="bcard-foot">' + status(c.status) +
        '<button class="switch' + (on[i] ? ' on' : '') + '" data-action="card-toggle" data-i="' + i + '"' + (blocked ? ' disabled' : '') + ' style="margin-left:auto"></button></div></div>';
    }).join('');
    var addTile = '<div class="bcard-wrap reveal"><button class="addcard">' + icon('plus', 28) + 'Добавить карту</button></div>';
    var rows = D.applications.map(function (a) { return { d: a.d, n: a.n, p: a.p, s: status(a.s), r: a.r }; });
    return '<div class="page">' + pageHead({ title: 'Мои карты', crumbs: [{ label: 'Главная', to: 'home' }, { label: 'Мои карты' }],
      lead: 'Карты жителя, привязанные к вашему профилю. Отключённой картой нельзя оплачивать проезд и покупки, но её можно включить обратно.',
      aside: btn('Подать заявку на карту', 'brand', { size: 'lg', iconL: 'plus' }) }) +
      '<div class="cards-row">' + cardsHtml + addTile + '</div>' +
      '<h2 class="section-title reveal">Мои заявки на подключение карт</h2>' +
      '<div class="reveal">' + table([{ title: 'Дата заявки', key: 'd', w: 160 }, { title: 'Номер карты', key: 'n', w: 160 }, { title: 'Дата обработки', key: 'p', w: 180 }, { title: 'Статус заявки', key: 's', w: 200 }, { title: 'Причина отклонения', key: 'r' }], rows) + '</div></div>';
  }
  function viewBenefits() {
    var catRows = D.benefitCategories;
    var svcRows = D.benefitServices.map(function (x) { return { n: x[0], s: status(x[1]) }; });
    return '<div class="page">' + pageHead({ title: 'Мои льготы', crumbs: [{ label: 'Главная', to: 'home' }, { label: 'Мои льготы' }],
      lead: 'Категории, присвоенные вам органами социальной защиты, и услуги, которые из них следуют.' }) +
      '<div class="wallet reveal" style="background:var(--gradient-dawn);margin-bottom:40px"><span class="wallet-ic" style="width:62px;height:62px;border-radius:20px">' + icon('bus-front', 30) + '</span>' +
      '<span style="max-width:560px"><b style="font-size:var(--text-h3)">Вы можете пополнить транспортную карту здесь.</b><span class="sub">Деньги зачисляются в течение нескольких минут, комиссия не взимается.</span></span>' +
      '<span class="wallet-actions">' + btn('Пополнить карту', 'brand', { size: 'lg' }) + '</span></div>' +
      '<h2 class="section-title reveal">Мои льготные категории</h2>' +
      '<div class="section-gap reveal">' + table([{ title: 'Льгота', key: 'b' }, { title: 'Начало действия', key: 's', w: 150 }, { title: 'Окончание', key: 'e', w: 150 }, { title: 'Справка УСПН', key: 'r', w: 160 }, { title: 'Дата выдачи', key: 'd', w: 140 }, { title: 'Кем выдана', key: 'o', w: 240 }], catRows) + '</div>' +
      '<h2 class="section-title reveal">Мои услуги</h2>' +
      '<div class="reveal">' + table([{ title: 'Услуга', key: 'n' }, { title: 'Статус услуги', key: 's', w: 300 }], svcRows) + '</div></div>';
  }
  function viewTransport() {
    var rows = D.trips.map(function (t) { return { t: t[0], p: t[1], r: t[2], v: t[3], c: t[4], l: t[5] }; });
    return '<div class="page">' + pageHead({ title: 'Транспорт', crumbs: [{ label: 'Мои услуги', to: 'home' }, { label: 'Транспорт' }],
      lead: 'Карта жителя работает как льготный проездной билет: приложите её к валидатору, поездка спишется автоматически.' }) +
      '<div class="card card-outlined reveal" style="display:flex;gap:14px;align-items:flex-start;margin-bottom:34px;border-color:var(--warning-500);background:var(--warning-100)">' +
      icon('triangle-alert', 22, 'var(--warning-500)') + '<p style="margin:0;font-size:16px;line-height:1.55;color:var(--ink-800);max-width:900px">После подключения услуги вернуться к прежней транспортной карте будет нельзя — все льготные поездки перейдут на карту жителя.</p></div>' +
      '<div class="card card-elevated reveal" style="display:flex;gap:18px;align-items:flex-end;flex-wrap:wrap;margin-bottom:26px;padding:24px">' +
      '<div class="field" style="max-width:220px"><label>Дата начала</label><input class="inp" value="01.08.2026"></div>' +
      '<div class="field" style="max-width:220px"><label>Дата окончания</label><input class="inp" value="12.08.2026"></div>' +
      '<div style="display:flex;gap:12px;margin-left:auto">' + btn('Сбросить', 'ghost') + btn('Применить', 'brand') + '</div></div>' +
      '<h2 class="section-title reveal">История поездок</h2>' +
      '<div class="reveal"><div class="tbl-wrap"><div class="tbl-scroll" style="max-height:460px">' +
      '<table class="tbl"><thead><tr><th style="width:220px">Время поездки</th><th style="width:150px">Стоимость, ₽</th><th style="width:170px">Номер маршрута</th><th>Вид транспорта</th><th style="width:190px">Количество поездок</th><th style="width:180px">Остаток поездок</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><td>' + r.t + '</td><td>' + r.p + '</td><td>' + r.r + '</td><td>' + r.v + '</td><td>' + r.c + '</td><td>' + r.l + '</td></tr>'; }).join('') +
      '</tbody></table></div></div></div></div>';
  }
  function viewPromos() {
    var cats = D.promoCats;
    var list = D.promos.filter(function (p) { return (!S.promoQ || p.n.toLowerCase().indexOf(S.promoQ.toLowerCase()) > -1) && (!S.promoCat || S.promoCat === 'Все категории' || p.c === S.promoCat); });
    var shown = S.promoMore ? list : list.slice(0, 4);
    var grid = shown.map(function (p, i) {
      return '<div class="promo reveal" style="transition-delay:' + (i * 50) + 'ms"><div class="promo-top" style="background:' + p.tint + ';color:' + p.a + '">' + icon(p.icon, 40) + '<span class="badge badge-brand">' + p.v + '</span></div>' +
        '<div class="promo-body"><span class="pc-cat">' + p.c + '</span><h4>' + p.n + '</h4><p>' + p.d + '</p></div></div>';
    }).join('');
    var options = cats.map(function (c) { return '<option' + (c === S.promoCat ? ' selected' : '') + '>' + c + '</option>'; }).join('');
    var mirNote = S.promoTab === 'mir' ? '<div class="card card-tinted reveal" style="margin-bottom:22px;font-size:16px;color:var(--ink-700)">Акции программы «Привет, МИР» доступны при оплате картой жителя платёжной системы МИР.</div>' : '';
    var aside = '<div class="bonus-aside"><span style="display:grid;gap:2px"><span class="ba-label">Бонусный счёт</span><span class="ba-val mono" data-count="1240" data-fmt="space">' + D.bonus + '</span></span>' + btn('Посмотреть', 'brand', { attr: ' style="margin-left:auto"' }) + '</div>';
    return '<div class="page">' + pageHead({ title: 'Акции', crumbs: [{ label: 'Главная', to: 'home' }, { label: 'Акции' }], lead: 'Вы получите скидку или баллы, которые можете потратить на следующую покупку.', aside: aside }) +
      '<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:26px">' +
      '<div class="tabs"><button class="' + (S.promoTab === 'my' ? 'active' : '') + '" data-action="promo-tab" data-v="my">Моя выгода</button><button class="' + (S.promoTab === 'mir' ? 'active' : '') + '" data-action="promo-tab" data-v="mir">Привет, МИР</button></div>' +
      '<div style="margin-left:auto;display:flex;gap:14px;flex-wrap:wrap"><input class="inp" id="promoSearch" placeholder="Искать" value="' + S.promoQ + '" style="width:260px;height:44px"><select class="inp" id="promoCat" style="width:220px;height:44px"><option value="">Категории</option>' + options + '</select></div></div>' +
      mirNote + '<div class="promo-grid" id="promoGrid">' + grid + '</div>' +
      (shown.length === 0 ? '<p style="font-size:17px;color:var(--ink-500)">Пока пусто. Измените запрос или категорию.</p>' : '') +
      (!S.promoMore && list.length > 4 ? '<div style="display:flex;justify-content:center;margin-top:30px">' + btn('Показать ещё', 'secondary', { size: 'lg', act: 'promo-more' }) + '</div>' : '') +
      '</div>';
  }
  function viewProfile() {
    var pr = D.profile;
    var kv = function (arr) { return arr.map(function (r) { return '<div class="kv"><b>' + r[0] + '</b><span>' + r[1] + '</span></div>'; }).join(''); };
    var fam = pr.family.map(function (f) { return '<div class="fam-row"><span class="fam-ic">' + icon('user', 20) + '</span><span style="display:grid;gap:2px"><span style="font-size:16px;font-weight:700">' + f[0] + '</span><span style="font-size:14px;color:var(--ink-500)">' + f[1] + '</span></span></div>'; }).join('');
    return '<div class="page">' + pageHead({ title: 'Профиль', crumbs: [{ label: 'Главная', to: 'home' }, { label: 'Профиль' }],
      lead: 'Данные подтягиваются из органов социальной защиты. Контакты вы можете изменить сами.', aside: btn('Редактировать', 'secondary', { iconL: 'pencil' }) }) +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px" class="cards-fam">' +
      '<div class="card card-elevated reveal" style="padding:30px;display:grid;gap:20px"><h2 class="section-title" style="margin:0">Личные данные</h2>' + kv(pr.personal) + '</div>' +
      '<div style="display:grid;gap:24px;align-content:start">' +
      '<div class="card card-elevated reveal" style="padding:30px;display:grid;gap:20px"><h2 class="section-title" style="margin:0">Контакты</h2>' + kv(pr.contacts) + '</div>' +
      '<div class="card card-elevated reveal" style="padding:30px;display:grid;gap:16px"><h2 class="section-title" style="margin:0">Члены семьи</h2>' + fam + '</div>' +
      '</div></div></div>';
  }
  function viewSupport() {
    return '<div class="page">' + pageHead({ title: 'Поддержка', crumbs: [{ label: 'Главная', to: 'home' }, { label: 'Поддержка' }], lead: 'Напишите нам — оператор разберётся в ситуации и ответит удобным для вас способом.' }) +
      '<div style="display:grid;grid-template-columns:1fr 340px;gap:30px;align-items:start" class="supp-grid">' + supportForm(false) +
      '<div style="display:grid;gap:18px">' +
      '<div class="card card-ink reveal" style="padding:26px;display:grid;gap:10px">' + icon('phone', 30, 'var(--brand-300)') +
      '<span style="font-family:var(--font-display);font-weight:800;font-size:22px">' + D.phone + '</span><span class="muted" style="font-size:15px;line-height:1.5">Звонок бесплатный, ежедневно с 8:00 до 20:00.</span></div>' +
      '<div class="fcard reveal"><span class="fc-ic">' + icon('clock', 22) + '</span><h4>Срок ответа</h4><p>До одного рабочего дня по обращениям из личного кабинета.</p></div>' +
      '<div class="fcard reveal"><span class="fc-ic">' + icon('map-pin', 22) + '</span><h4>Личный приём</h4><p>г. Саратов, ул. Московская, 72, каб. 118 — по будням с 9:00 до 18:00.</p></div>' +
      '</div></div></div>';
  }

  /* ================= GATE (сохранён) ================= */
  function gate() {
    var cards = D.profiles.map(function (p) {
      return '<button class="gate-card" data-action="select" data-id="' + p.id + '">' +
        '<span class="gate-tag' + (p.kind === 'child' ? ' child' : '') + '">' + (p.kind === 'child' ? 'Детский профиль' : 'Родитель') + '</span>' +
        avatarBox(p, 76) + '<b>' + p.short + '</b><span class="gate-role">' + p.role + '</span>' +
        '<span class="gate-go">Войти' + icon('chevron-right', 16) + '</span></button>';
    }).join('');
    return '<div class="gate"><div class="gate-inner"><div class="gate-brand">' + emblem(48) + '</div>' +
      '<span class="seclabel">Вход выполнен через Госуслуги</span>' +
      '<h1 class="gate-title">Кто заходит?</h1>' +
      '<p class="gate-lede">Выберите профиль для входа в личный кабинет «Карты жителя». Детскими профилями управляет родитель.</p>' +
      '<div class="gate-grid">' + cards + '</div>' +
      '<p style="margin-top:32px"><a data-go="landing" style="cursor:pointer;font-weight:700">Ещё нет карты? Как её получить →</a></p></div></div>';
  }

  var CAB = { home: viewHome, cards: viewCards, benefits: viewBenefits, transport: viewTransport, promos: viewPromos, profile: viewProfile, support: viewSupport };

  /* ---------- Render ---------- */
  function render() {
    document.documentElement.setAttribute('data-hc', S.hc ? '1' : '0');
    if (S.route === 'landing') { app.innerHTML = '<div class="view">' + viewLanding() + '</div>'; afterRender(); return; }
    if (!S.profileId) { app.innerHTML = '<div class="view">' + gate() + '</div>'; afterRender(); return; }
    var v = (CAB[S.route] || viewHome)();
    app.innerHTML = lkHeader() + '<div class="view">' + v + '</div>' + lkFooter();
    afterRender();
  }
  function afterRender() {
    if (S._tiltMove) { document.removeEventListener('mousemove', S._tiltMove); S._tiltMove = null; }
    initReveal(); initCounters(); initTilt();
    var ps = document.getElementById('promoSearch');
    if (ps) ps.addEventListener('input', function (e) { S.promoQ = e.target.value; render(); var el = document.getElementById('promoSearch'); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } });
    var pc = document.getElementById('promoCat');
    if (pc) pc.addEventListener('change', function (e) { S.promoCat = e.target.value; render(); });
  }

  /* ---------- Анимации ---------- */
  function initReveal() {
    var els = [].slice.call(document.querySelectorAll('.reveal'));
    if (reduce) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var obs = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); obs.unobserve(x.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(function (e) { obs.observe(e); });
  }
  function fmt(n, f) { return f === 'space' ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(n); }
  function initCounters() {
    var els = [].slice.call(document.querySelectorAll('[data-count]'));
    if (reduce) { els.forEach(function (e) { e.textContent = fmt(e.getAttribute('data-count'), e.getAttribute('data-fmt')) + (e.getAttribute('data-fmt') === '+' ? '+' : ''); }); return; }
    var obs = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { obs.unobserve(x.target); count(x.target); } }); }, { threshold: 0.5 });
    els.forEach(function (e) { e.textContent = '0'; obs.observe(e); });
  }
  function count(el) {
    var target = parseInt(el.getAttribute('data-count'), 10), f = el.getAttribute('data-fmt'), dur = 1300, start = performance.now();
    (function tick(now) {
      var pr = Math.min((now - start) / dur, 1), e = 1 - Math.pow(1 - pr, 3), val = Math.round(e * target);
      el.textContent = fmt(val, f) + (f === '+' && pr === 1 ? '+' : '');
      if (pr < 1) requestAnimationFrame(tick);
    })(start);
  }
  function initTilt() {
    if (reduce) return;
    var card = document.querySelector('.bankcard'); if (!card) return;
    function move(e) {
      var r = card.getBoundingClientRect();
      var ry = (e.clientX - (r.left + r.width / 2)) / 14;
      var rx = -(e.clientY - (r.top + r.height / 2)) / 14;
      rx = Math.max(-16, Math.min(16, rx)); ry = Math.max(-16, Math.min(16, ry));
      card.style.transform = 'rotate(-4deg) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
    }
    document.addEventListener('mousemove', move);
    S._tiltMove = move;
  }

  /* ---------- Навигация / события ---------- */
  function go(route) { S.route = route; S.menuOpen = false; window.scrollTo(0, 0); render(); }
  function scrollToId(id) { var el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 110, behavior: reduce ? 'auto' : 'smooth' }); }

  document.addEventListener('click', function (e) {
    var actEl = e.target.closest('[data-action]');
    var goEl = e.target.closest('[data-go]');
    if (actEl) {
      var a = actEl.getAttribute('data-action');
      if (a === 'faq') { var it = actEl.closest('.faq-i'); var box = it.querySelector('.faq-a'); var open = it.classList.toggle('open'); box.style.maxHeight = open ? box.scrollHeight + 'px' : '0px'; it.querySelector('.fq-ic').innerHTML = open ? icon('minus', 20) : icon('plus', 20); return; }
      if (a === 'point') { var pw = actEl.closest('.point').querySelector('.point-week'); var op = pw.classList.toggle('hidden'); actEl.querySelector('svg').outerHTML = pw.classList.contains('hidden') ? icon('chevron-down', 18) : icon('chevron-up', 18); return; }
      if (a === 'scroll') { scrollToId(actEl.getAttribute('data-to')); return; }
      if (a === 'hc') { S.hc = !S.hc; render(); return; }
      if (a === 'enter') { S.route = 'home'; S.menuOpen = false; window.scrollTo(0, 0); render(); return; }
      if (a === 'toggle-menu') { S.menuOpen = !S.menuOpen; render(); return; }
      if (a === 'close-menu') { S.menuOpen = false; render(); return; }
      if (a === 'select' || a === 'switch') { S.profileId = actEl.getAttribute('data-id'); S.route = 'home'; S.menuOpen = false; window.scrollTo(0, 0); render(); return; }
      if (a === 'signout') { S.profileId = null; S.route = 'home'; S.menuOpen = false; window.scrollTo(0, 0); render(); return; }
      if (a === 'faqcat') { S.faqCat = actEl.getAttribute('data-c'); render(); return; }
      if (a === 'pt-view') { [].forEach.call(actEl.parentNode.children, function (b) { b.classList.remove('active'); }); actEl.classList.add('active'); return; }
      if (a === 'promo-tab') { S.promoTab = actEl.getAttribute('data-v'); render(); return; }
      if (a === 'promo-more') { S.promoMore = true; render(); return; }
      if (a === 'card-toggle') { var i = +actEl.getAttribute('data-i'); var on = S.cardOn || D.cards.map(function (c) { return c.on; }); on[i] = !on[i]; S.cardOn = on; actEl.classList.toggle('on', on[i]); return; }
      if (a === 'submit') return;
    }
    if (goEl) { e.preventDefault(); go(goEl.getAttribute('data-go')); return; }
  });
  document.addEventListener('submit', function (e) {
    if (e.target.closest('[data-action="submit"]')) {
      e.preventDefault();
      var b = e.target.querySelector('button[type="submit"]');
      if (b) { var t = b.innerHTML; b.textContent = 'Обращение отправлено ✓'; b.disabled = true; setTimeout(function () { b.innerHTML = t; b.disabled = false; }, 2200); }
    }
  });

  render();
})();
