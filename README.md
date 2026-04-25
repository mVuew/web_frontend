# mVuew Project Setup Guide

This is a Next.js project built using the **App Router**.

---

## 📦 Prerequisites

Make sure you have the following installed:

* Node.js (v18 or later recommended)
* npm / yarn / pnpm

---

## Clone the Repository

```bash
git clone https://github.com/mVuew/web_frontend.git
cd web_frontend
```

---

## Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

Or using pnpm:

```bash
pnpm install
```

---

## Run the Development Server

```bash
npm run dev
```

Then open your browser and go to:

```text
http://localhost:3000
```

---

## Project Structure

```text
app/
 ├── layout.tsx      # Root layout
 ├── page.tsx        # Home page
 ├── components/     # Reusable components
 └── globals.css     # Global styles
 └──
 └──
 └──

```

---

## Features

* Next.js App Router
* Tailwind CSS styling
* Light/Dark mode support
* Responsive UI
* Firebase Authentication (Email/Password + Google)
* Mixpanel analytics (auto page, section, and click tracking)

---

## Mixpanel Analytics Setup

Add your Mixpanel project token to `.env.local`:

```env
NEXT_PUBLIC_MIXPANEL_TOKEN=
NEXT_PUBLIC_MIXPANEL_DEBUG=false
```

Tracked events:

* `page_opened` and `page_opened_<page_name>`: sent on initial load and route changes.
* `section_viewed` and `section_viewed_<page_name>_<section_name>`: sent once when each section first enters the viewport.
* `option_clicked` and `option_clicked_<page_name>_<action_kind>_<option_name>`: sent for clickable elements (`a`, `button`, `role=button`, submit/button inputs, and explicit `data-analytics-click`).
* `route_transition_start`: sent when navigation starts.

User identification:

* Signed-in users are identified in Mixpanel using Firebase `uid`.
* `$email` and `$name` are synced to Mixpanel people profile when available.
* On sign-out, Mixpanel identity is reset for anonymous tracking.

Optional labeling helpers:

* Add `data-analytics-section="Hero"` to override section names.
* Add `data-analytics-label="Primary CTA"` to override click labels.
* Add `data-analytics-component="Header"` on component roots for cleaner `component_name` in events.
* Add `data-analytics-action="tab"` or similar to override click action kind.

---

## Firebase Authentication Setup

1. Create a Firebase project in the Firebase console.
1. In Firebase Authentication, enable these providers:
   * Email/Password
   * Google
1. Add a Web app in your Firebase project and copy its config values.
1. Create a local environment file from the example:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

1. Fill these values in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

1. Set your local domain in Firebase authorized domains (for example `localhost`).

The authentication screen is available at `/auth`.

---

## Build for Production

```bash
npm run build
npm start
```

---
