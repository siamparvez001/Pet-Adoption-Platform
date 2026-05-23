# PawsHome 🐾

A full-stack pet adoption platform where animal lovers can find, list, and adopt pets. PawsHome connects pet owners with potential adopters through a clean, modern interface — making the adoption journey simple and joyful for everyone involved.

## Live URL

🌐 [https://pet-adoption-platform-a188.vercel.app](https://pet-adoption-platform-a188.vercel.app)

---

## Purpose

Thousands of animals need loving homes every day. PawsHome was built to bridge the gap between pet owners who need to rehome their animals and families who are ready to adopt. The platform lets users browse available pets, filter by species or adoption fee, submit adoption requests, and manage their own listings — all in one place.

---

## Features

- **Browse & Search Pets** — Explore all available pets with real-time search by name, filter by species (Dog, Cat, Bird, Rabbit), and sort by adoption fee (low to high or high to low)
- **Secure Authentication with JWT** — Email/password sign-up and Google OAuth login powered by Better Auth, with JWT-based session management to protect private routes and API endpoints
- **Submit Adoption Requests** — Logged-in users can submit adoption requests with a preferred pickup date and personal message directly to the pet owner
- **Personal Dashboard** — Each user has a dashboard to manage their own pet listings (add, edit, delete), track listing status (Available / Adopted), and view all their submitted adoption requests with live status updates
- **Featured Pets Section** — The homepage highlights a curated selection of available pets so visitors can start exploring without any extra steps
- **Dark Mode Support** — Full dark/light theme toggle powered by next-themes, applied instantly across every page
- **Responsive Design** — Fully mobile-friendly layout built with Tailwind CSS v4, works smoothly on phones, tablets, and desktops

---

## NPM Packages Used

### Frontend

| Package | Purpose |
|---|---|
| `next` v16 | App Router, server components, dynamic routing |
| `react` v19 | UI library |
| `better-auth` | Authentication — email/password + Google OAuth with JWT plugin |
| `@better-auth/mongo-adapter` | MongoDB adapter for Better Auth |
| `mongodb` | MongoDB Node.js driver for database operations |
| `@heroui/react` | UI component library (forms, buttons, avatars) |
| `@heroui/styles` | Styles for HeroUI components |
| `tailwindcss` v4 | Utility-first CSS framework with dark mode support |
| `next-themes` | Dark/light theme switching |
| `lucide-react` | Icon library used throughout the UI |
| `react-icons` | Additional icons (Google, arrow, location etc.) |
| `react-hot-toast` | Toast notifications for success and error feedback |
| `use-debounce` | Debounced search input to reduce unnecessary API calls |

### Backend

| Package | Purpose |
|---|---|
| `express` | REST API server |
| `mongodb` | MongoDB Node.js driver |
| `better-auth` | JWT verification for protected routes |
| `cors` | Cross-origin request handling between frontend and backend |
| `dotenv` | Environment variable management |

---

## Environment Variables

### Backend `.env`
```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
```

### Frontend `.env`
```
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=your_frontend_url
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_APP_URL=your_frontend_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_connection_string
```

---

## Getting Started

### 1. Clone the repositories

```bash
# Frontend
git clone <frontend-repo-url>
cd pet-adoption-platform
npm install

# Backend
git clone <backend-repo-url>
cd pet-server
npm install
```

### 2. Add environment variables

Create `.env` files in both projects using the variables listed above.

### 3. Run locally

```bash
# Backend (port 8000)
node index.js

# Frontend (port 3000)
npm run dev
```

---

## Project Structure

```
pet-adoption-platform/
├── src/
│   ├── app/
│   │   ├── add-pet/        # Dashboard (add pet, listings, requests)
│   │   ├── pets/           # All pets page + individual pet details
│   │   ├── signin/         # Sign in page
│   │   └── signup/         # Sign up page
│   ├── components/         # Reusable UI components
│   └── lib/
│       ├── auth.js         # Better Auth server config
│       ├── auth-client.js  # Better Auth client config
│       ├── connectDB.js    # MongoDB connection
│       └── pets/           # Pet data fetching utilities

pet-server/
└── index.js                # Express REST API
```