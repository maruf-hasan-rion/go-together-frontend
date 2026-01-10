# Go Together – Frontend

Frontend application for the **Go Together** event management platform.  
Built with Next.js App Router, focused on event discovery, hosting, and booking.

---

## 🚀 Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zod (validation)
- Server Actions + `serverFetch`
- Sonner (toast notifications)

---

## ✨ Features

- Browse all events
- View event details
- Create / update / delete events (Host/Admin)
- Join events (Users)
- Event image upload
- Category-based events
- UI cache revalidation after create/update/delete

---

## 📦 Requirements

- Node.js >= 18
- pnpm / npm / yarn

---

## ⚙️ Setup

### 1️⃣ Install dependencies

pnpm install

### 2️⃣ Environment variables

Create .env.local:

NEXT_PUBLIC_API_URL = http://localhost:5000/api/v1

### 3️⃣ Run development server

pnpm dev

App runs on:

http://localhost:3000

### 🗂️ Project Structure

src/
├─ app/  
 ├─ components/  
 ├─ services/  
 ├─ lib/  
 ├─ types/

### 🔄 Caching & Revalidation

Uses Next.js cache tags:

- all-events
- my-hosted-events
- single-event

#### After create/update/delete:

revalidateTag("all-events");

revalidateTag("my-hosted-events");

revalidateTag("single-event");

### 🏗️ Build

pnpm build
pnpm start
