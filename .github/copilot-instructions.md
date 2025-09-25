# Copilot Instructions for AI Agents

## Project Overview
- This is a web application based on [Ant Design Pro](https://pro.ant.design), using React, TypeScript, and Tailwind CSS.
- Main source code is in `src/` with components, pages, models, and utilities.
- Configuration files are in `config/` (e.g., `config.ts`, `routes.ts`, `proxy.ts`).
- Localization is handled via `src/locales/` with per-language folders and files.
- Public assets (icons, scripts, manifest) are in `public/`.

## Architecture & Patterns
- **Component Structure:** UI components are in `src/components/`, organized by feature (e.g., `CopyComponent`, `RainbowWallet`).
- **Pages:** Route-level pages are in `src/pages/`, matching URL paths (e.g., `dashboard`, `admin`, `mint`, `burn`).
- **Models:** App state and business logic are in `src/models/` (e.g., `account.ts`, `global.ts`).
- **Global Styles:** Styles are managed in `src/global.less` and `src/global.style.ts`.
- **Type Definitions:** Shared types are in `types/index.d.ts` and `src/typings.d.ts`.
- **Localization:** Each language has its own folder and files for UI strings and settings.

## Developer Workflows
- **Install dependencies:** `npm install` or `yarn`
- **Start dev server:** `npm start`
- **Build for production:** `npm run build`
- **Run tests:** `npm test` (Jest)
- **Lint code:** `npm run lint` (auto-fix: `npm run lint:fix`)
- **Tailwind CSS:** Configured via `tailwind.config.js` and `tailwind.css`

## Project-Specific Conventions
- **Ant Design Pro conventions:** Follows Ant Design Pro's layout, routing, and model patterns. See [docs](https://pro.ant.design/docs/getting-started).
- **Feature folders:** Components and pages are grouped by feature, not by type.
- **Localization:** Add new languages by creating a folder in `src/locales/` and copying the structure of existing ones.
- **Service Worker:** Custom logic in `src/service-worker.js` for PWA support.
- **Proxy config:** API proxying is set up in `config/proxy.ts`.

## Integration Points
- **External APIs:** API requests and error handling are managed in `src/requestErrorConfig.ts` and `src/access.ts`.
- **Wallet Integration:** `src/components/RainbowWallet/` contains blockchain wallet logic (see `chain.ts`, `wagmi.ts`).
- **Routing:** Route definitions and guards are in `config/routes.ts`.

## Examples
- To add a new page: create a folder in `src/pages/`, add an `index.tsx`, and update `config/routes.ts`.
- To add a new locale: copy an existing folder in `src/locales/`, translate files, and update language settings.
- To add a new component: create a folder in `src/components/`, add your code, and import it in relevant pages.

## Key Files & Directories
- `src/components/` — Feature components
- `src/pages/` — Route-level pages
- `src/models/` — App state and logic
- `src/locales/` — Localization
- `config/` — App configuration
- `public/` — Static assets
- `README.md` — Basic setup and workflow

---

**For more details, see the Ant Design Pro documentation and the project README.**
