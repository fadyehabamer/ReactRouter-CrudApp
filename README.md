# Crud React outer

[![CI](https://github.com/fadyehabamer/ReactRouter-CrudApp/actions/workflows/ci.yml/badge.svg)](https://github.com/fadyehabamer/ReactRouter-CrudApp/actions/workflows/ci.yml)

> Crud operations using React-Router

### Features
- Add Employees
- Edit Employees
- Delete Employees
- Sort Ascendingly by Salary
- Filter Employees whose salary > 2500
- CSS Styling

**Live demo:** https://crud-react-router.vercel.app

Employees are kept in memory in the `App` component, so the list resets on a
page refresh. Routes: `/List` (also `/`), `/AddStudent` and
`/EditStudent/:index`.

### Getting started
Built with [Vite](https://vite.dev), React 19 and React Router 7. Requires Node.js 22.12+ (the dev server and build also run on 20.19+; the Vitest test runner needs 22.12+).

```bash
npm install
npm run dev
```

### Scripts
| Command | Description |
| --- | --- |
| `npm run dev` (or `npm start`) | Start the Vite dev server on http://localhost:3000 |
| `npm test` | Run the Vitest / Testing Library tests (watch mode; `npm test -- --run` for a single run) |
| `npm run lint` | Lint with ESLint (flat config, CRA rule set) |
| `npm run build` | Production build into `build/` |
| `npm run preview` | Serve the production build locally |

`vercel.json` rewrites every path to `index.html`, so deep links such as
`/AddStudent` work on the Vercel deployment.
