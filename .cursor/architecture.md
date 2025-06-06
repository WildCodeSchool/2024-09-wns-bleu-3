# Project Architecture Overview

## 1. Monorepo Structure

- Root directories: `backend/`, `frontend/`, `e2e/`.
- Configuration and scripts: `Makefile`, `docker-compose.yml`, `.env`, `nginx.conf`.

## 2. Backend (`backend/`)

- **Language/Runtime**: TypeScript, Node.js
- **Framework**: Express.js (via `graphql-yoga`)
- **API**: GraphQL (using `type-graphql` for schema & resolvers)
- **Database**: PostgreSQL
- **ORM**: TypeORM (with `typeorm-naming-strategies` for snake_case)
- **Key Libraries**:
  - `argon2`: Password hashing
  - `jsonwebtoken`: JWT authentication
  - `faker-js`: Data seeding
  - `cron`: Scheduled tasks (e.g., `runScheduledScans`)
- **Testing**: Vitest
- **Configuration**: `.env` (via `dotenv`), `backend/src/config/db.ts` (DB connection), `backend/src/index.ts` (server setup).

## 3. Frontend (`frontend/`)

- **Language**: TypeScript
- **Framework**: React 19
- **Build Tool**: Vite (`vite.config.ts`)
- **Styling**:
  - Tailwind CSS (`tailwind.config.js`, `postcss.config.js`)
  - Radix UI (headless UI components for accessibility)
  - `clsx`, `tailwind-merge` for class name utilities
  - `lucide-react` for icons
  - `next-themes` for theme management
- **GraphQL Client**: Apollo Client (`@apollo/client`, `graphql-ws`, `graphql-sse`)
- **Routing**: React Router (`react-router`)
- **Forms**: React Hook Form (`react-hook-form`) with Zod (`zod`) for validation.
- **UI Primitives**: `components.json` suggests a setup similar to Shadcn UI.
- **State Management**: Primarily component state, React Context, and Apollo Client cache.
- **Code Generation**: `graphql-codegen` (`codegen.ts`) for GraphQL types and Apollo hooks.
- **Testing**: Vitest, React Testing Library (`@testing-library/react`), `jsdom`, `vitest-axe`.

## 4. End-to-End Testing (`e2e/`)

- **Framework**: Playwright
- **Configuration**: `playwright.config.ts`
- **Authentication**: Handles authenticated and unauthenticated states.
- **Reporting**: `playwright-report/`

## 5. Infrastructure & Deployment

- **Containerization**: Docker, Docker Compose.
  - `docker-compose.yml`: Development environment.
  - `docker-compose.prod.yml`: Production environment.
  - Services: `db` (PostgreSQL), `backend`, `frontend`, `adminer`, `api_gateway` (nginx).
  - Dockerfiles: In `backend/` and `frontend/`.
- **Reverse Proxy / API Gateway**: nginx (`nginx.conf`).
  - Routes: `/api` -> backend GraphQL, `/adminer` -> Adminer, `/hmr` -> Vite HMR, `/` -> frontend.
- **Database Management**: Adminer (web UI for PostgreSQL).

## 6. CI/CD & Workflows

- **Provider**: GitHub Actions.
- **Workflows**: Defined in `.github/workflows/` (e.g., CI checks, deployment).

## 7. Key Shared Configuration & Scripts

- `Makefile`: Root level for common project commands.
- `.env`, `.env.example`: Environment variable management.
- `package.json`: In `backend/` and `frontend/` for managing dependencies and scripts.

## 8. Development Practices

- **Linting**: ESLint (e.g., `frontend/eslint.config.js`).
- **Static Typing**: TypeScript across frontend and backend.
