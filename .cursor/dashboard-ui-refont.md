# Dashboard UI Rework Instructions

## 🔧 Goal
This task is a **UI-only redesign** of the current dashboard, based on an existing design reference.  
All logic, data, architecture, and components must be preserved.

---

## 🎯 Feature: Dashboard UI Redesign

- Use the following V0 design as the base UI reference:
  - [V0 Dashboard UI (v12)](https://v0.dev/chat/fork-of-react-page-recreation-OIev2TtNiue)
  - Focus on the design found under the `/dashboard` route.
- Follow the same visual system and component style using:
  - **Tailwind CSS v4**
  - **React 19**
  - **shadcn/ui**, fully compatible with Tailwind v4 and React 19
  - **context7** documentation for latest class names and component usage
- Create a **dummy Pricing page** that the "Get Pro" button will redirect to.

---

## ⚙️ Implementation Requirements

- **Keep all current logic and data.**
- **Adapt existing components** — don't recreate or rewrite them from scratch.
- This is a **visual/UI refactor only** based on Tailwind + shadcn best practices.
- Maintain responsive design (mobile-first) and semantic HTML.
- Avoid inline styles.

---

## 🧩 Affected Files & Components

> Rework the UI of the following files/components using the new design:

- `frontend/src/pages/DashboardPage.tsx`
- `frontend/src/components/BaseScanForm.tsx`
- `frontend/src/components/AuthScanForm.tsx`
- `frontend/src/components/ActiveIssues.tsx`
- `frontend/src/components/Header.tsx`
- `frontend/src/dashboard-refont.tsx.old` (reference layout/components)

> Routing & auth behavior:

- `frontend/src/App.tsx` (React Router v7 usage)
- `frontend/src/hooks/useAuth.tsx` (auth logic)

---

## 👥 Auth Logic & Layout

- 🔐 **Authenticated users**:
  - Should not access the homepage
  - The **Sidebar replaces the Header**
  - The dashboard layout should follow the design reference
  - The **Footer should be removed**
  - Components like `ActiveIssues`, `AuthScanForm`, and `BaseScanForm` should be visually updated

- 👤 **Unauthenticated users**:
  - Can access the homepage
  - The **“Check all my scans”** button should be **removed**

---

## 🚫 Don’ts

- ❌ Do **not** use `next/link`, use **React Router v7**
- ❌ Do **not** change or simulate data
- ❌ Do **not** rewrite backend logic
- ❌ Do **not** rebuild existing components from scratch

---

## ✅ Summary

- Keep all logic & architecture
- Rework visuals only using:
  - Tailwind v4
  - React 19
  - Shadcn components
  - context7 documentation
- Maintain responsive behavior and accessibility
