# Дизайн-система ESEO

Источник: Figma «eseo», страница «Design System». Все значения лежат в `src/styles/tokens.css`, наглядно они показаны на странице `/styleguide`.

## Названия как в Figma

Все токены названы так же, как в Figma, один к одному. Это решение владельца: сайт одностраничный и расширяться не будет, поэтому названия по назначению (`text-secondary` и т. п.) не нужны.

| В Figma | В коде (токен) | Класс в компоненте |
|---|---|---|
| `brand/600` | `--color-brand-600` | `bg-brand-600`, `text-brand-600`, `border-brand-600` |
| `gray/950` | `--color-gray-950` | `text-gray-950` |
| `typo/display/64 - semibold` | `--text-display-64` | `text-display-64 font-semibold` |
| `radius/16` | `--radius-16` | `rounded-16` |
| `shadow/card` | `--shadow-card` | `shadow-card` |
| `blur/layer-md · 56` | `--blur-layer-md` | `blur-layer-md` |

Чтобы поменять цвет на всём сайте, поменяйте его значение в `tokens.css`. Если сменится сам бренд-цвет (например, `brand/600` на другой оттенок), достаточно поменять значение: название остаётся тем же.

Встроенные цвета Tailwind (`blue-500` и т. п.) отключены, доступны только цвета из Figma.

Внизу `tokens.css` есть служебные названия для компонентов shadcn (`primary`, `ring` и т. п.). Они ссылаются на Figma-цвета, править их не нужно.

## Текст

Шрифт Inter хранится в `public/fonts`, Google Fonts не используется.

Крупные размеры (`display-*`, `header-*`) плавно уменьшаются на маленьких экранах: значение в Figma — это размер на десктопе (1440px), на телефоне (390px) размер меньше. Мелкие размеры (`body`, `label`, `caption`, `button`) одинаковы на всех экранах.

У `typo/label/14` в Figma два варианта с разной высотой строки, поэтому в коде два токена: `text-label-14` (semibold) и `text-label-14-medium`.

## Отступы

В Figma нет переменных для отступов, поэтому используется шаг 4px: `p-1` = 4px, `p-4` = 16px, `gap-6` = 24px. Расстояние между секциями задаёт токен `--space-section`.

## Высота кнопок

Высота кнопок задана в Figma, поэтому для неё есть токены: `h-button-s` (26px), `h-button-m` (32px), `h-button-l` (38px), `h-button-white` (44px). Ширина всегда подстраивается под текст. Высота поля ввода и выпадающего списка — `h-field` (40px).

## Компоненты

- **Button** (`src/components/ui/button.jsx`): `variant` = primary / secondary / tertiary / white, `size` = s / m / l (только primary и secondary). Состояния как в Figma: Default, Hover, Pressed, Focus, Disabled. Дополнительно есть `loading` (крутилка вместо текста) — в Figma его нет.
- **Field** (`field.jsx`): подпись слева, подсказка (`hint`) справа, под ними поле. `error` — текст ошибки вместо подсказки, рамка становится coral. `disabled` — подпись серая.
- **Input** (`input.jsx`): поле ввода. Состояния: Default, Hover, Focus, Error, Disabled. Цвет подсказки внутри пустого поля (placeholder) в Figma не задан — взят gray/400.
- **SelectField** (`select-field.jsx`): выпадающий список на основе shadcn Select. Принимает `options` — список вариантов. Состояния поля: Default, Hover, Focus, Open, Error, Disabled; пункты меню: Default, Hover, Selected. Галочки у выбранного пункта нет, как в Figma.
- **Link** (`link.jsx`): синяя ссылка со стрелкой, `arrow={false}` убирает стрелку. Hover и Focus в Figma нет — добавлены (синий темнеет, стрелка сдвигается).
- **Divider** (`divider.jsx`): линия 1px gray/200 на всю ширину.
- **SectionLabel** (`section-label.jsx`): серая подпись над заголовком секции.
- **Tabs** (`tabs.jsx`, shadcn): вкладки с полоской снизу. Состояния: Default, Hover, Active, Focus, Disabled. Переключаются стрелками на клавиатуре.
- **Accordion** (`accordion.jsx`, shadcn): список вопросов (FAQ). Состояния: Closed, Open. Раскрывается плавно (`--duration-base`), анимация отключается, если в системе включено «уменьшить движение». Рамка фокуса у вопроса добавлена (в Figma её нет).
- На /styleguide состояния показаны без мыши с помощью `data-preview="hover"`, `"active"` или `"focus"`. На сайте они работают как обычно.

## Блоки с фиксированным размером

Пока нет. Если какой-то блок должен иметь точный размер в пикселях, он записывается сюда.

## Что пока не взято из Figma

- **Ширина контейнера страницы** (`--container-page`) — временное значение, уточним по странице Home.
- **Длительность анимаций** — в Figma не заданы, стоят стартовые значения.
- **Стили `typo/mockup/*`** (8–22px) — для мини-интерфейсов на иллюстрациях. Добавим, когда дойдём до этих компонентов.
