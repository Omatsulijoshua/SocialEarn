# SocialEarn — Render Deployment Guide

This guide provides step-by-step instructions for deploying the **SocialEarn** monorepo (`socialearn-backend`, `socialearn-web`, `socialearn-admin`, `PostgreSQL`, and `Redis`) to [Render](https://render.com).

---

## 🚀 Option 1: One-Click Render Blueprint Deployment (Recommended)

Since the repository includes a valid `render.yaml` Blueprint file, Render can automatically set up all database services, API gateways, user frontends, and admin consoles with a single click.

### Steps:

1. **Sign In to Render**:
   - Go to [https://dashboard.render.com/](https://dashboard.render.com/) and sign in with your GitHub account.

2. **Create New Blueprint Instance**:
   - Click the **"New +"** button in top header.
   - Select **"Blueprint"**.

3. **Connect GitHub Repository**:
   - Select your repository: `https://github.com/Omatsulijoshua/SocialEarn`.
   - Grant Render permission to read the repository.

4. **Review Provisioned Services**:
   Render will automatically parse `render.yaml` and display 5 services to create:
   - 🐘 **`socialearn-postgres`**: PostgreSQL Database
   - ⚡ **`socialearn-redis`**: Redis Cache Instance
   - ⚙️ **`socialearn-backend`**: Node.js REST API & Socket.IO WebSockets Server
   - 🌐 **`socialearn-web`**: Next.js User Dashboard & Public Task Marketplace
   - 🛡️ **`socialearn-admin`**: Next.js Dedicated Enterprise Admin Console

5. **Deploy**:
   - Click **"Apply"**. Render will build and deploy all services automatically.

---

## 🛠️ Option 2: Manual Render Web Service Creation

If you prefer setting up services individually in Render Dashboard:

### 1. PostgreSQL Database Service
- Go to Render Dashboard -> **New +** -> **PostgreSQL**.
- **Name**: `socialearn-postgres`
- **Database**: `socialearn`
- **User**: `socialearn_user`
- Save the `Internal Database URL`.

### 2. Redis Key-Value Store
- Render Dashboard -> **New +** -> **Redis**.
- **Name**: `socialearn-redis`
- Save the `Internal Redis URL`.

### 3. Backend REST API Service
- Render Dashboard -> **New +** -> **Web Service**.
- **Name**: `socialearn-backend`
- **Repository**: `https://github.com/Omatsulijoshua/SocialEarn`
- **Build Command**: `npm install && cd backend && npx prisma generate && npm run build`
- **Start Command**: `cd backend && npm run start`
- **Environment Variables**:
  - `DATABASE_URL`: *(Your PostgreSQL Internal URL)*
  - `REDIS_URL`: *(Your Redis Internal URL)*
  - `JWT_SECRET`: *(Set a strong secret key)*
  - `PORT`: `5000`

### 4. User Dashboard Web Service (`apps/web`)
- Render Dashboard -> **New +** -> **Web Service**.
- **Name**: `socialearn-web`
- **Build Command**: `npm install && cd apps/web && npm run build`
- **Start Command**: `cd apps/web && npm run start`
- **Environment Variable**:
  - `NEXT_PUBLIC_API_URL`: `https://socialearn-backend.onrender.com`

### 5. Dedicated Admin Console (`apps/admin`)
- Render Dashboard -> **New +** -> **Web Service**.
- **Name**: `socialearn-admin`
- **Build Command**: `npm install && cd apps/admin && npm run build`
- **Start Command**: `cd apps/admin && npm run start`
- **Environment Variable**:
  - `NEXT_PUBLIC_API_URL`: `https://socialearn-backend.onrender.com`

---

## 🔄 Automatic Continuous Deployment (CI/CD)

Whenever you push commits to `main` branch on `https://github.com/Omatsulijoshua/SocialEarn`, Render will automatically pull the code, trigger builds, execute database migrations, and deploy zero-downtime updates!
