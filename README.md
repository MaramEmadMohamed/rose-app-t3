# Rose App

Next.js 16 frontend (Team 3) with TypeScript, Tailwind CSS, shadcn/ui and next-intl.

## Getting Started

### Prerequisites

- Node.js 20+ and npm

### Installation

```bash
git clone https://github.com/MaramEmadMohamed/rose-app-t3.git
cd rose-app-t3
npm install
```

### Development

```bash
npm run dev      # http://localhost:3000
npm run build
npm run start
```

### Linting & Formatting

```bash
npm run lint
npm run format        # write
npm run format:check  # CI check
```

## Folder Structure

```
src/
├── app/[locale]/     # App Router pages and layouts
├── components/       # shared + design-system components
├── i18n/             # routing.ts, navigation.ts, request config
├── messages/         # en.json, ar.json translation files
├── proxy.ts          # locale routing (Next.js 16 proxy)
└── app/globals.css   # Tailwind + design tokens
```

## Design Tokens

Semantic color tokens are defined as CSS variables in `src/app/globals.css`
for light and dark themes (background, text, border, shadow, ring, radius,
plus primary, secondary, info, success, warning and danger, each with
`-faint` and `-fade` variants). Use tokens in components (`bg-primary`,
`text-danger`), never raw palette values.
Fonts: Sarabun (en), Tajawal (ar).

## Adding Translation Keys

1. Add the key to `src/messages/en.json` and the same key to `src/messages/ar.json`.
2. Use it: `const t = useTranslations("Namespace"); t("key")`.
3. Keep both files in sync (same keys, same nesting).

## Locales & Theme Modes

- Locales: `en` (LTR), `ar` (RTL)
- Theme modes: `light`, `dark`, `system`
