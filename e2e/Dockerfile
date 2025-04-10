FROM mcr.microsoft.com/playwright:v1.51.0-noble

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY playwright.config.ts /app/playwright.config.ts

COPY tests/ /app/tests/

CMD npx playwright test