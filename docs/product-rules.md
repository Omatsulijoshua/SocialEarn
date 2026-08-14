# SocialEarn — Product Business Rules and Safety Policy

## 1. Executive Summary & Purpose
SocialEarn is an incentivized social engagement, tasks, and rewards marketplace connecting campaign creators with eligible users. This document defines the platform's official operational, security, and safety compliance policies.

---

## 2. Core Business & Safety Principles

### 2.1 Anti-Deceptive Activity & Integrity
* **No Guaranteed Results**: SocialEarn does NOT promise or guarantee that incentivized activity will automatically count toward monetization, eligibility, rankings, verification badges, or organic recommendation algorithms on third-party platforms.
* **Truthful Representation**: Campaigns must accurately describe task requirements without misrepresenting third-party platform policies or features.
* **No Platform Security Bypasses**: The platform explicitly forbids bypassing anti-bot systems, CAPTCHAs, access controls, rate limits, or official API restrictions of third-party platforms.

---

## 3. Platform Verification & Task Availability

### 3.1 Verification Workflows
* **Automated API Verification**: Where third-party platforms provide public APIs or permitted verification endpoints, SocialEarn will utilize those mechanisms.
* **Manual / Proof-Based Verification**: Where direct API verification is unavailable or restricted by third-party policies, tasks must require an approved manual verification workflow (e.g., screenshot evidence or link submission reviewed by moderators/creators).
* **Disabled Platforms & Actions**: If an external platform explicitly prohibits a specific task type or action, Admin reserves the right to disable that platform or action across the system immediately.

---

## 4. Anti-Exploit & Repeat-Reward Prevention

### 4.1 Anti-Duplicate Action Enforcement
* A user may only receive a reward ONCE per campaign action (e.g., Follow, Like, Subscribe, Join).
* The platform maintains an immutable historical record (`TaskParticipant` ledger).
* Unfollowing and reflowing (or unliking and reliking) will NEVER yield a second reward for the same campaign.

### 4.2 Watch-Time Session Limits
* Every watch-time campaign enforces strict per-user contribution limits:
  - Maximum total minutes per user per campaign.
  - Maximum sessions per user.
  - Minimum valid session duration.
  - Cooldown periods between sessions.
* System backend tracking prevents client-side timer manipulation.

---

## 5. External Link & Custom Task Approvals

### 5.1 Mandatory Admin Review
* Campaigns created under "Other / Custom Platform" or featuring external links MUST undergo mandatory Admin review (`ExternalLinkReview` queue) before appearing in the public marketplace.
* Admin evaluates custom links for safety, legal compliance, and absence of malicious content.

---

## 6. Financial & Points Ledger Security

### 6.1 Immutable Double-Entry Ledger
* Neither user points (`PointWallet`) nor cash balances (`CashWallet`) can be modified without producing an immutable transaction entry (`PointTransaction` / `CashTransaction`).
* All conversions between points and cash/campaign credits are governed by Admin-defined conversion rules.

### 6.2 Idempotency & Concurrency Safety
* All financial operations, task reward claims, and withdrawals require idempotency keys.
* Campaign completed target counters (`completedQuantity`) use atomic database transactions to ensure `completedQuantity <= targetQuantity` under high concurrency.
