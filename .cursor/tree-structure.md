# Structure directory

Directory structure:
└── wildcodeschool-2024-09-wns-bleu-3/
    ├── README.md
    ├── docker-compose.e2e.yml
    ├── docker-compose.prod.yml
    ├── docker-compose.testprod.yml
    ├── docker-compose.yml
    ├── Makefile
    ├── nginx.conf
    ├── .env.example
    ├── backend/
    │   ├── Dockerfile
    │   ├── Dockerfile.prod
    │   ├── eslint.config.mjs
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── vitest.config.ts
    │   ├── scripts/
    │   │   └── seed.ts
    │   ├── src/
    │   │   ├── index.ts
    │   │   ├── @types/
    │   │   │   ├── issues.d.ts
    │   │   │   └── payload.d.ts
    │   │   ├── config/
    │   │   │   └── db.ts
    │   │   ├── cron/
    │   │   │   └── index.ts
    │   │   ├── entities/
    │   │   │   ├── ForgotPassword.ts
    │   │   │   ├── Frequency.ts
    │   │   │   ├── Scan.ts
    │   │   │   ├── ScanHistory.ts
    │   │   │   ├── Tag.ts
    │   │   │   ├── TempUser.ts
    │   │   │   └── User.ts
    │   │   ├── inputs/
    │   │   │   ├── FrequencyInput.ts
    │   │   │   ├── Issue.ts
    │   │   │   ├── ScanById.ts
    │   │   │   ├── ScanInput.ts
    │   │   │   ├── TagInput.ts
    │   │   │   ├── UpdateFrequencyInput.ts
    │   │   │   ├── UpdateScanInput.ts
    │   │   │   ├── UpdateTagInput.ts
    │   │   │   ├── UpdateUserInput.ts
    │   │   │   ├── UserInfo.ts
    │   │   │   ├── UserInput.ts
    │   │   │   └── UserLoginInput.ts
    │   │   ├── resolver/
    │   │   │   ├── FrequenceResolver.ts
    │   │   │   ├── ScanHistoryResolver.ts
    │   │   │   ├── ScanResolver.ts
    │   │   │   ├── TagResolver.ts
    │   │   │   └── UserResolver.ts
    │   │   ├── schema/
    │   │   │   ├── context.ts
    │   │   │   └── scanSchema.ts
    │   │   └── utils/
    │   │       ├── getSSLCertificateExpiration.ts
    │   │       ├── isPasswordValid.ts
    │   │       ├── issuesArray.ts
    │   │       ├── pubSub.ts
    │   │       ├── scanUrl.ts
    │   │       ├── scheduleDeleteHistoryScans.ts
    │   │       ├── scheduledScans.ts
    │   │       ├── user.ts
    │   │       └── verifyToken.ts
    │   └── test/
    │       ├── changePassword.test.ts
    │       ├── forgotPassword.test.ts
    │       ├── initCron.test.ts
    │       ├── retrieveIssue.test.ts
    │       ├── runScheduleScans.test.ts
    │       └── scanUrl.test.ts
    ├── e2e/
    │   ├── Dockerfile
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── playwright.config.ts
    │   ├── tsconfig.json
    │   ├── .DS_Store
    │   ├── .env.example
    │   ├── playwright-report/
    │   │   ├── index.html
    │   │   └── trace/
    │   │       ├── codeMirrorModule.C3UTv-Ge.css
    │   │       ├── codicon.DCmgc-ay.ttf
    │   │       ├── defaultSettingsView.QdHITyLI.css
    │   │       ├── index.CFOW-Ezb.css
    │   │       ├── index.DvtSwn6E.js
    │   │       ├── index.html
    │   │       ├── snapshot.html
    │   │       ├── sw.bundle.js
    │   │       ├── uiMode.BatfzHMG.css
    │   │       ├── uiMode.html
    │   │       ├── uiMode.Sdytl9wc.js
    │   │       ├── xtermModule.Beg8tuEN.css
    │   │       └── assets/
    │   │           ├── codeMirrorModule-DwAiTpyC.js
    │   │           └── defaultSettingsView-DkkRvn5X.js
    │   ├── test-results/
    │   │   └── .last-run.json
    │   └── tests/
    │       ├── authflow.test.ts
    │       ├── basic.test.ts
    │       ├── createScan.test.ts
    │       ├── privatePages.test.ts
    │       ├── auth/
    │       │   ├── dashboard.test.ts
    │       │   ├── disconnect.test.ts
    │       │   ├── invitPages.test.ts
    │       │   └── profile.test.ts
    │       └── setup/
    │           ├── auth.setup.ts
    │           └── base.ts
    ├── frontend/
    │   ├── README.md
    │   ├── codegen.ts
    │   ├── components.json
    │   ├── Dockerfile
    │   ├── Dockerfile.prod
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── nginx.conf
    │   ├── package.json
    │   ├── tsconfig.app.json
    │   ├── tsconfig.json
    │   ├── tsconfig.node.json
    │   ├── vite.config.ts
    │   ├── .gitignore
    │   ├── public/
    │   │   └── fonts/
    │   │       ├── Barlow-Bold.woff2
    │   │       ├── Barlow-Italic.woff2
    │   │       ├── Barlow-Light.woff2
    │   │       ├── Barlow-Medium.woff2
    │   │       ├── Barlow-Regular.woff2
    │   │       ├── Satoshi-Bold.woff2
    │   │       ├── Satoshi-Italic.woff2
    │   │       ├── Satoshi-Light.woff2
    │   │       ├── Satoshi-Medium.woff2
    │   │       └── Satoshi-Regular.woff2
    │   └── src/
    │       ├── App.css
    │       ├── App.tsx
    │       ├── index.css
    │       ├── main.tsx
    │       ├── vite-env.d.ts
    │       ├── @types/
    │       │   ├── issue.d.ts
    │       │   └── scan.d.ts
    │       ├── assets/
    │       ├── components/
    │       │   ├── ActiveIssues.tsx
    │       │   ├── Faq.tsx
    │       │   ├── FeaturesSection.tsx
    │       │   ├── Footer.tsx
    │       │   ├── FormAddScan.tsx
    │       │   ├── Header.tsx
    │       │   ├── Help.tsx
    │       │   ├── HeroSection.tsx
    │       │   ├── Layout.tsx
    │       │   ├── OnlyGuestRoute.tsx
    │       │   ├── PrivateRoute.tsx
    │       │   ├── RadarVisualization.tsx
    │       │   ├── ScanHistory.tsx
    │       │   ├── scan-history/
    │       │   │   ├── ScanChart.tsx
    │       │   │   ├── ScanDetails.tsx
    │       │   │   ├── ScanList.tsx
    │       │   │   ├── ScanListItem.tsx
    │       │   │   ├── SearchFilter.tsx
    │       │   │   ├── StatusIndicator.tsx
    │       │   │   ├── types.ts
    │       │   │   └── utils.ts
    │       │   └── ui/
    │       │       ├── accordion.tsx
    │       │       ├── alert-dialog.tsx
    │       │       ├── alert.tsx
    │       │       ├── badge.tsx
    │       │       ├── button.tsx
    │       │       ├── card.tsx
    │       │       ├── checkbox.tsx
    │       │       ├── dropdown-menu.tsx
    │       │       ├── form.tsx
    │       │       ├── input.tsx
    │       │       ├── label.tsx
    │       │       ├── select.tsx
    │       │       ├── separator.tsx
    │       │       ├── sheet.tsx
    │       │       ├── sonner.tsx
    │       │       ├── table.tsx
    │       │       ├── tabs.tsx
    │       │       └── tooltip.tsx
    │       ├── generated/
    │       │   └── graphql-types.ts
    │       ├── graphql/
    │       │   ├── mutations.ts
    │       │   ├── queries.ts
    │       │   └── subscriptions.ts
    │       ├── hooks/
    │       │   └── useAuth.tsx
    │       ├── lib/
    │       │   ├── linkSSE.ts
    │       │   └── utils.ts
    │       ├── pages/
    │       │   ├── DashboardPage.tsx
    │       │   ├── ForgotPasswordPage.tsx
    │       │   ├── HomePage.tsx
    │       │   ├── LoginPage.tsx
    │       │   ├── ProfilePage.tsx
    │       │   └── SignUpPage.tsx
    │       ├── schema/
    │       │   └── FormAddScanSchema.ts
    │       ├── test/
    │       │   ├── accessibility.test.tsx
    │       │   ├── Footer.test.tsx
    │       │   ├── FormAddScan.test.tsx
    │       │   ├── FormLogin.test.tsx
    │       │   ├── FormSignup.test.tsx
    │       │   └── Header.test.tsx
    │       └── utils/
    │           ├── capitalizeFirstLetter.ts
    │           └── isPasswordValid.ts
    ├── playwright-report/
    │   ├── index.html
    │   └── trace/
    │       ├── codeMirrorModule.C3UTv-Ge.css
    │       ├── codicon.DCmgc-ay.ttf
    │       ├── defaultSettingsView.5fN5lw10.css
    │       ├── index.CFOW-Ezb.css
    │       ├── index.CUq7VgrV.js
    │       ├── index.html
    │       ├── snapshot.html
    │       ├── sw.bundle.js
    │       ├── uiMode.BatfzHMG.css
    │       ├── uiMode.CHJSAD7F.js
    │       ├── uiMode.html
    │       ├── xtermModule.Beg8tuEN.css
    │       └── assets/
    │           ├── codeMirrorModule-DpJ-EmBQ.js
    │           └── defaultSettingsView-DTenqiGw.js
    ├── tasks/
    │   ├── prd-create-scan-block.md
    │   └── tasks-prd-create-scan-block.md
    └── .github/
        └── workflows/
            ├── e2e.yml
            ├── staging-client.yml.old
            ├── staging-server.yml.old
            ├── test-and-deploy.yml
            ├── test-client.yml
            └── test-server.yml
