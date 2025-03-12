FROM mcr.microsoft.com/playwright:v1.51.0-noble

WORKDIR /app

RUN npm init -y
RUN npm install @playwright/test
RUN npm install @types/node

COPY playwright.config.ts /app/playwright.config.ts

COPY tests/ /app/tests/

CMD npx playwright test