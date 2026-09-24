# Crud React outer
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
Requires Node.js 14+ (verified with Node 24).

```bash
npm install
npm start
```

### Scripts
| Command | Description |
| --- | --- |
| `npm start` | Start the dev server on http://localhost:3000 |
| `npm test` | Run the Jest / Testing Library tests |
| `npm run build` | Production build into `build/` |
