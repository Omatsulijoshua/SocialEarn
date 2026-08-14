# SocialEarn — Social Task, Engagement & Rewards Marketplace

[![Production Status](https://img.shields.io/badge/Status-Production%20Ready-emerald.svg)](https://github.com/Omatsulijoshua/SocialEarn)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2.35-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-PostgreSQL-indigo.svg)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

> **Engage. Earn. Grow.**  
> SocialEarn is a two-sided marketplace enabling creators to promote campaign tasks and users to earn rewards through verified activity. Features anti-duplicate participation protection, watch-time contribution limits, mandatory admin moderation for external links, and immutable double-entry transaction ledgers.

---

## 🚀 Key Platform Features

- **Public Task Marketplace**: Filter active tasks across Instagram, TikTok, YouTube, X, Telegram, Discord, and custom platforms with real-time target counters (`385 / 4,500`).
- **Multi-Payment Campaign Creation**: Fund campaigns using Cash, Earned Points, or a flexible Cash + Points split.
- **Anti-Duplicate Exploit Protection**: Server-side uniqueness constraint (`UNIQUE(userId, campaignId, actionType)`) prevents users from repeatedly earning points via follow → unfollow → refollow loops.
- **Watch-Time Engine with User Caps**: Configurable contribution limits (e.g., maximum 30 minutes total contribution per user per campaign).
- **Mandatory External Link Review Queue**: Custom platform links enter `PENDING_REVIEW` state and require Admin safety verification before public publication.
- **Immutable Transaction Ledgers**: Financial and point transactions record `balanceBefore` and `balanceAfter` to guarantee balance integrity.
- **Standalone Enterprise Admin Console (`apps/admin`)**: Complete control with 2FA, RBAC roles (`SUPER_ADMIN`, `ADMIN`, `MODERATOR`, `FINANCE`, `SUPPORT`, `FRAUD_ANALYST`), user risk scoring (0-100), cash withdrawal approval queues, and immutable audit logs.

---

## 📁 Repository Monorepo Architecture

```text
SocialEarn/
├── apps/
│   ├── web/                     # Next.js User Dashboard & Public Marketplace (Port 3000)
│   └── admin/                   # Dedicated Next.js Enterprise Admin Console (Port 3001)
├── backend/                     # Express REST API, Socket.IO WebSockets & Prisma Engine (Port 5000)
├── packages/
│   ├── types/                   # Domain TypeScript interfaces (@socialearn/types)
│   ├── validation/              # Zod validation schemas (@socialearn/validation)
│   └── config/                  # Economy constants & system defaults (@socialearn/config)
├── docs/
│   └── product-rules.md         # Product rules, safety policies, and anti-bot boundaries
├── docker-compose.yml           # PostgreSQL 16 & Redis 7 container configuration
└── package.json                 # Monorepo workspace setup
```

---

## 🗺️ Complete Application Route Map

### 👤 User Application (`apps/web` / Port 3000)

| Route | Description |
| :--- | :--- |
| `/` | **Public Landing Page**: Hero section, live platform stats, safety policies, quick auth modals. |
| `/app` | **User Overview**: Balance cards (Points & Cash), level progress badge, recommended tasks. |
| `/app/tasks` | **Public Task Marketplace**: Platform filter pills, progress bars, interactive task execution modal. |
| `/app/tasks/active` | **Active Tasks & Watch Timer**: Live watch-time session tracker with play/pause controls. |
| `/app/tasks/history` | **Task History**: Complete execution record and detailed proof inspector modal. |
| `/app/campaigns/create` | **Campaign Creation Wizard**: 8-step wizard supporting Cash, Points, or split payment modes. |
| `/app/campaigns/history` | **My Campaigns**: Live progress tracker (`3,850 / 4,500`), status badges, and timeline metrics. |
| `/app/wallet` | **Wallet & Ledgers**: Immutable Point & Cash history tables, points redemption, cash withdrawal drawer. |
| `/app/social` | **Connected Accounts**: Link/unlink Instagram, YouTube, X, TikTok, and Telegram profiles. |
| `/app/referrals` | **Referrals**: Referral link generator and rewards history. |
| `/app/notifications` | **Notifications**: Real-time alerts stream for task rewards and milestone alerts. |
| `/app/profile` | **User Profile**: Account metrics, XP progress, level badges. |
| `/app/settings` | **Settings**: Notification preferences and 2FA configuration. |

---

### 🛡️ Dedicated Admin Console (`apps/admin` / Port 3001)

| Route | Description |
| :--- | :--- |
| `/login` | **Admin Login**: Dedicated login with 2FA authenticator code verification and RBAC role selection. |
| `/` | **Executive Overview**: Real-time KPI Cards, Recharts growth graphs, platform distribution donut chart. |
| `/users` | **User Governance**: Filter users, inspect risk scores (0-100), adjust point balances with mandatory AuditLog reason. |
| `/campaigns` | **Campaign Manager**: Inspect all user campaigns, target vs completed counters, and payment breakdown. |
| `/reviews/external-links` | **External Link Review Queue**: Inspect URLs (`[ Open Link ]`), `Approve` (activates campaign to `ACTIVE` in public marketplace), `Reject`, or `Request Changes`. |
| `/tasks/verification` | **Task Verification Queue**: Manual proof reviewer for disputed or flagged task attempts. |
| `/rewards` | **Reward Engine & Watch Limits**: Base platform rewards and Watch-Time limits (30 mins cap, 3 max sessions). |
| `/economy` | **Points Economy Ledger**: Points → Cash exchange rates (1,000 Pts = ₦500 NGN) and double-entry transaction audit. |
| `/payments` | **Cash Payments Audit**: Verified Stripe, Paystack, and Flutterwave gateway transactions. |
| `/withdrawals` | **Withdrawals Queue**: Cash payout approvals, 1.5% fee calculation, bank details inspector. |
| `/fraud` | **Fraud & Risk Engine**: Risk scoring breakdown (device fingerprint, IP reuse, completion speed) with `Mark Safe` vs `Restrict Account` actions. |
| `/platforms` | **Platform Feature Toggles**: Enable or disable Instagram, TikTok, YouTube, X, Telegram, or custom platforms with zero downtime. |
| `/disputes` | **User Disputes**: Ticket investigation and support resolution. |
| `/audit-logs` | **Audit Logs**: Immutable security audit trail recording IP, timestamp, admin email, and target resource. |
| `/admins` | **Manage Admins & RBAC**: Super Admin control over administrative accounts (`SUPER_ADMIN`, `FINANCE`, `MODERATOR`, `FRAUD_ANALYST`) and 2FA status. |
| `/settings` | **System Settings**: Maintenance mode toggles (Global, User App, Admin App) and financial bounds. |

---

## ⚡ Quick Start & Development Setup

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Docker Desktop**: (For running PostgreSQL & Redis locally)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Omatsulijoshua/SocialEarn.git
cd SocialEarn
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 3. Spin Up Infrastructure (Docker)

```bash
docker-compose up -d
```

This starts PostgreSQL 16 on port `5432` and Redis 7 on port `6379`.

### 4. Run Database Migrations

```bash
cd backend
npx prisma migrate dev --name init
npx prisma db seed
cd ..
```

### 5. Start Development Servers

Run backend, user app, and admin console concurrently:

```bash
# Terminal 1: Backend API Gateway (Port 5000)
cd backend && npm run dev

# Terminal 2: User Dashboard (Port 3000)
cd apps/web && npm run dev

# Terminal 3: Dedicated Admin Dashboard (Port 3001)
cd apps/admin && npm run dev
```

Visit:
- **User Marketplace**: `http://localhost:3000`
- **Admin Console**: `http://localhost:3001`
- **Backend API**: `http://localhost:5000/api`

---

## 🧪 Automated Testing Suite

SocialEarn includes end-to-end automated test runners verifying anti-duplicate participation, watch-time contribution limits, external link moderation, and point economy transactions.

### Run Backend & User Engine E2E Tests:

```bash
node backend/src/tests/runTests.js
```

### Run Admin Console E2E Tests:

```bash
node apps/admin/tests/runAdminTests.js
```

**Expected Result:**
```text
🎉 TEST SUMMARY: 4/4 PASSED
```

---

## ⚙️ Environment Variables Reference

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis server connection URI |
| `JWT_SECRET` | Secret key for signing access JWT tokens |
| `JWT_REFRESH_SECRET` | Secret key for refresh tokens |
| `PAYSTACK_SECRET_KEY` | Paystack payment provider API key |
| `FLUTTERWAVE_SECRET_KEY` | Flutterwave payment provider API key |
| `STRIPE_SECRET_KEY` | Stripe payment provider API key |

---

## 📄 License & Safety Policy

This project is licensed under the MIT License. See [docs/product-rules.md](docs/product-rules.md) for product rules and safety policies.
