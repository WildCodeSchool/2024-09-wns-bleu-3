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
  - Tailwind CSS v4 (`tailwind.config.js`, `postcss.config.js`)
  - **ShadCN UI** components for building interfaces.
  - `clsx`, `tailwind-merge` for class name utilities
  - `lucide-react` for icons
  - `next-themes` for theme management
- **GraphQL Client**: Apollo Client (`@apollo/client`, `graphql-ws`, `graphql-sse`)
- **Routing**: React Router (`react-router`) - latest version
- **Forms**: React Hook Form (`react-hook-form`) with Zod (`zod`) for validation.
- **UI Primitives**: `components.json` suggests a setup similar to Shadcn UI.
- **State Management**: Primarily component state, React Context, and Apollo Client cache.
- **Code Generation**: `graphql-codegen` (`codegen.ts`) for GraphQL types and Apollo hooks.
- **Testing**: Vitest, React Testing Library (`@testing-library/react`), `jsdom`, `vitest-axe`.

## 4. End-to-End Testing (`e2e/`)

- **Framework**: Playwright
- **Configuration**: `playwright.config.ts`
- **Authentication**: Handles authenticated and unauthenticated states.
- - **Custom Fixture**:
  - The project uses a custom test fixture defined in `e2e/tests/setup/base.ts`
  - All tests must extend this fixture instead of using Playwright’s default `test`.
  - This fixture includes common logic like login helpers, session setup, and environment configuration.
- **Test Syntax**: Always import the extended fixture, e.g.:

  ```ts
  import {test, expect} from './setup/base'
  ```

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

- `Makefile`: Root level for common project commands. You can use it for starting the project / e2e testing in isolation with a special docker container / or clean docker
- `.env`, `.env.example`: Environment variable management.
- `package.json`: In `backend/`, `frontend/` and `e2e/` for managing dependencies and scripts.

## 8. Development Practices

- **Linting is mandatory**: all code must follow the rules defined by ESLint.
- Use the appropriate ESLint config based on the context:
  - Frontend: `frontend/eslint.config.js`
  - Backend: `backend/eslint.config.mjs`
- Never ignore linting errors.
- When generating new files or modifying existing code, ensure the result is lint-compliant.
- Do not override existing ESLint rules unless explicitly told.
- **Static Typing**: TypeScript across frontend and backend.
