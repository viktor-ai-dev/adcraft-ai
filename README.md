# 🚀 AdCraft AI

AdCraft AI is a modern SaaS-style web application that generates high-converting ad creatives using AI.

It allows users to instantly create product ad copy and visuals, manage campaigns, and analyze performance — all in one clean dashboard.

---

## ✨ Features

- 🤖 AI-generated ad copy (headlines, primary text, CTA)
- 🎨 AI-generated product images (multiple variations)
- 🔐 Authentication system (Clerk)
- 🗄️ Database integration (Prisma + SQLite)
- 📊 Analytics dashboard (usage insights, trends, top styles)
- 💳 Credit-based usage system
- 🧠 Smart UX (empty states, loading states, toasts)
- 🎬 Animated landing page with live demo simulation
- 📁 Download & manage generated ads

---

## 🧱 Tech Stack

**Frontend**
- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion (animations)

**Backend**
- Next.js API Routes
- Prisma ORM
- SQLite (dev)

**Auth**
- Clerk

**AI**
- OpenAI (text + image generation)

---

## 🧠 How It Works

1. User logs in via Clerk authentication  
2. User enters product name + description  
3. Backend:
   - Generates ad copy via OpenAI  
   - Generates multiple images via OpenAI  
4. Data is stored in the database (linked to user)  
5. Dashboard updates with:
   - Generated ads  
   - Usage analytics  
   - Credit tracking  

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/adcraft-ai.git
cd adcraft-ai
npm install