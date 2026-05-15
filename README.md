# Wati Chatbot Builder

A minimal Vite + React 18 + TypeScript starter with Tailwind CSS v4 and shadcn/ui initialized.

## Stack

- Vite
- React 18 + TypeScript (strict mode)
- Tailwind CSS v4
- shadcn/ui (initialized, no UI components added yet)
- pnpm

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 10+

## Getting started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Other commands

```bash
pnpm build    # Type-check and build for production
pnpm preview  # Preview the production build locally
pnpm lint     # Run ESLint
```

## Project structure

- `src/App.tsx` — root component
- `src/lib/utils.ts` — shadcn/ui utility helper (`cn`)
- `components.json` — shadcn/ui configuration

Path alias: `@/*` maps to `src/*`.
