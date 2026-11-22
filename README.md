# TypeScript MVC Web App

A web application built with **plain TypeScript** (no framework), organized with the **MVC** pattern, consuming data from a separate **Express API**.

Study project based on Alura's TypeScript course.

## Structure

```
├── app/             # Front end in TypeScript (controllers, models, views)
├── dist/            # Compiled JavaScript
└── servidor-api/    # Back end in Node.js + Express (GET /dados route)
```

Front end and back end are independent projects, each with its own `package.json`.

## Getting started

**API** (port 8080):

```bash
cd servidor-api
npm install
node server.js
```

**Front end:**

```bash
npm install
npx tsc
```

Then open `index.html` with Live Server (port 5500).

## My changes

- Server converted from **CommonJS to ES Modules** (`import`/`export`)
- `body-parser` replaced with Express's built-in `express.json()`