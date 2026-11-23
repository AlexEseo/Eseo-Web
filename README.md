# Eseo-Web

Лендинг ESEO. Vite + React, Tailwind CSS v4, shadcn/ui, Motion.

## Где что менять

- **Тексты, ссылки, картинки** — `src/content/site.json`
- **Цвета, шрифты, отступы, анимации** — `src/styles/tokens.css`
- **Правила дизайна** — `DESIGN.md`
- **Витрина компонентов** — страница `/styleguide`

## Команды

Один раз после скачивания проекта:

```bash
npm install
```

Открыть сайт на своём компьютере (адрес появится в терминале):

```bash
npm run dev
```

Проверить, что в коде нет цветов и размеров вне токенов:

```bash
npm run check:design
```

Собрать сайт для загрузки на хостинг:

```bash
npm run build
```

## Загрузка на хостинг (cPanel)

1. Выполните `npm run build`. Появится папка `dist`.
2. В cPanel откройте **File Manager** → папку `public_html`.
3. Загрузите туда всё содержимое папки `dist` (не саму папку), включая скрытый файл `.htaccess`.
