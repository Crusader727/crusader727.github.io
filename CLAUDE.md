# Правило проекта / Harness

> Этот файл — обязательные правила работы для агента в проекте `crusader727.github.io`.
> Обращение к пользователю: **Crusader**.

---

## 0. Обращение и сессии

- Всегда обращайся к пользователю по имени **Crusader**.
- **«Продолжаем работу над проектом»** → сначала вычитай состояние: `agentdb` (ruflo/RuVector), `context-mode` (`ctx_search`), `graphify` (`graphify-out/GRAPH_REPORT.md`, `wiki/`). Не грузи сырые исходники — иди через эти индексы.
- **«Заканчиваем сессию»** → запиши итоги в `agentdb` и `context-mode`, обнови `graphify` (если графа ещё нет — создай: `/graphify .`).
- **Ориентация по коду** проекта всегда через `agentdb` + `context-mode` + `graphify`, а не через повторное чтение файлов.

---

## 1. OpenSpec SDD (обязательно для medium+)

- Для **medium+ фич и значимых изменений поведения** — используй OpenSpec.
- Каталог `openspec/` уже инициализирован (`--tools claude`). **Re-init не делать.** Если попадёшь в новый репо без `openspec/` — сначала `openspec init`, проверить `/opsx:*`, при необходимости `openspec update`; не собирать `openspec/` вручную.
- **Неясно что делать** → `superpowers:brainstorming` (вопросы по одному) → `/opsx:propose`.
- **Идея ясна** → сразу `/opsx:propose`.
- Цепочка: `propose` → апрув proposal+design → `writing-plans` с жёстким TDD → `/opsx:apply` → `/opsx:archive`.
- **Мелкие фиксы** (1–2 файла), hotfix, рефакторинг без смены поведения — **без OpenSpec** и без brainstorming.
- **Каждое новое требование = новая версия спецификации** (новый change в `openspec/changes/`, не правка задним числом).

---

## 2. Планирование

- `superpowers:brainstorming` — **только если задача/намерение неясны**. Вопросы задавай интерактивно, по одному.
- Идея ясна и объём medium+ / значимое изменение — сразу OpenSpec `/opsx:propose` (без brainstorming).
- Мелкие задачи — без brainstorming и без OpenSpec.

## 3. Обязательный порядок фаз (без перескакивания)

1. **Планирование** — цели, объём, декомпозиция, критерии готовности. Без кода.
2. **Проектирование** — архитектура, контракты/API, модель данных, схемы экранов. Без реализации.
3. **Пошаговое выполнение** — маленькими проверяемыми шагами; после каждого шага фиксация в `agentdb` + `context-mode` + `graphify`, затем следующий шаг.

Каждая фаза завершается зафиксированным артефактом (план → дизайн → инкремент), сохранённым в `agentdb`; он же — вход для следующей фазы.

## 4. Декомпозиция

Крупные требования: **эпики → задачи → подзадачи**. Один шаг = один сфокусированный объём работы.

---

## 5. Дизайн (всегда через эти скиллы)

Для любой работы с дизайном используй:
- `magic-21st` (MCP, 21st.dev) — генерация/рефайн UI-компонентов;
- `frontend-design` (skill) — визуальное направление, типографика, «не-шаблонность»;
- `ui-ux-pro-max` (skill) — база правил UI/UX (стили, палитры, шрифты, UX-гайдлайны, чарты).

## 6. Оркестрация (ruflo)

- Вся координация агентов/шагов — через **ruflo** (swarm, память между сессиями, AgentDB/RuVector).
- Прогресс каждого завершённого логического шага (решение, артефакт, результат) фиксируется в иерархическую память ruflo/AgentDB для воспроизводимости и обучения swarm.

## 7. Экономия контекста (Context Mode)

- Подгружай только релевантный контекст текущего шага.
- Длинные знания/решения → `agentdb` (semantic/episodic) и база знаний Context Mode (`ctx_index`), **не** держи в активном контексте.
- Вместо повторного чтения/цитирования исходников — `ctx_search` + краткие сводки/ссылки на артефакты.
- Объёмные выводы (логи, тесты, отчёты) — через `ctx_execute_file`, не грузи целиком.
- Документация, спеки, выводы инструментов, крупные артефакты — индексируются в единую базу знаний (`ctx_index`/`ctx_fetch_and_index`) и запрашиваются по требованию (`ctx_search`), исполняются через `ctx_execute`/`ctx_execute_file`.

---

## 8. Self-review в конце каждой задачи (обязательно)

Всегда в конце каждой выполненной задачи запускай субагента для **self-review**. Исправляй ошибки и неточности итеративно, пока итог не будет соответствовать спецификации.

## 9. Дисциплина скиллов/инструментов

- Доступен большой набор вспомогательных скиллов — **используй только те, что нужны текущей задаче**.
- **Запрещено** сканировать/вызывать инструменты из категорий, не относящихся к текущему коду (напр., не трогай web-скрейпинг/дизайн-MCP, если правим backend-логику).

---

## 10. Инвентарь харнесса (что установлено в этом проекте)

**Node:** серверам нужен Node ≥20. Дефолт теперь **Node v24.14.0** через nvm (подключён в `~/.zshrc`, `nvm alias default v24.14.0`). Системный root-бинарь `/usr/local/bin/node` (v18) остаётся, но перекрыт nvm в интерактивных шеллах. MCP в `.mcp.json` для надёжности пиннят абсолютный npx Node 24: `/Users/crusader/.nvm/versions/node/v24.14.0/bin/npx` (не зависит от того, подхватился ли `.zshrc`).

**MCP-серверы** (`.mcp.json`):
| Имя | Пакет | Ключ |
|-----|-------|------|
| `playwright` | `@playwright/mcp` | — |
| `puppeteer` | `puppeteer-mcp-server` | — |
| `context-mode` | `context-mode` | — |
| `ruflo` | `ruflo mcp start` | — |
| `context7` | `@upstash/context7-mcp` | **нужен** `CONTEXT7_API_KEY` |
| `magic-21st` | `@21st-dev/magic` | **нужен** `TWENTYFIRST_API_KEY` |

**Ключи context7 и 21st.** Claude Code раскрывает `${VAR}` в `.mcp.json` из окружения ПРОЦЕССА, а не из `env` в `.claude/settings.local.json` — проверено: с `${VAR}` оба сервера отдают «Invalid/Not authenticated». Поэтому ключи прописываются **литералами прямо в `.mcp.json`**, а сам `.mcp.json` — в `.gitignore` (в репозиторий закоммичен только `.mcp.json.example` с плейсхолдерами). Записать ключи в `.mcp.json` должен пользователь (агенту classifier запрещает писать секреты в файлы).

**Skills** (`.claude/skills/`):
- OpenSpec: `openspec-propose`, `openspec-apply-change`, `openspec-update-change`, `openspec-archive-change`, `openspec-explore`, `openspec-sync-specs` (+ команды `/opsx:*`).
- Superpowers: `brainstorming`, `writing-plans`, `executing-plans`, `test-driven-development`, `subagent-driven-development`, `systematic-debugging`, `verification-before-completion`, `requesting-code-review`, `receiving-code-review`, `dispatching-parallel-agents`, `using-git-worktrees`, `finishing-a-development-branch`, `writing-skills`, `using-superpowers`.
- Дизайн: `frontend-design`, `ui-ux-pro-max`, `design`, `design-system`, `ui-styling`, `banner-design`, `brand`, `slides`.
- Граф знаний: `graphify` (Python 3; вывод в `graphify-out/`).

**CLI:** OpenSpec — `npx @fission-ai/openspec` (через Node 24).

> Установка выполнена автоматически (клоны в `.claude/skills/`, `openspec init --tools claude`, `.mcp.json`). Перезапусти Claude Code, чтобы подхватились MCP-серверы и команды.
