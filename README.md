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
