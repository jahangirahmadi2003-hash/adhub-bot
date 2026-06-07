# 🚀 راهنمای Deploy - GitHub + Vercel فقط

## ✅ شرایط:
- GitHub Account
- Vercel Account (رایگان)
- Telegram Bot Token

---

## 📋 مرحله 1: GitHub Repository

### 1.1 Repository جدید ایجاد کنید

```bash
# 1. اگر هنوز Git نکردید:
cd telegram-bot-server
git init
git add .
git commit -m "Initial commit"

# 2. GitHub برفتن
# github.com/new
# نام: telegram-bot-vercel
# Public انتخاب کنید

# 3. کد را Push کنید:
git remote add origin https://github.com/YOUR_USERNAME/telegram-bot-vercel.git
git branch -M main
git push -u origin main
```

### 1.2 بررسی کنید

```
GitHub.com/YOUR_USERNAME/telegram-bot-vercel
→ فایل‌ها دیده می‌شود؟ ✅
```

---

## 🚀 مرحله 2: Vercel Deploy

### 2.1 Vercel Dashboard

```
1. vercel.com برفتن
2. Sign up with GitHub
3. Dashboard → New Project
4. Import GitHub Repository
5. telegram-bot-vercel انتخاب کنید
```

### 2.2 Environment Variables

```
TELEGRAM_BOT_TOKEN = 8721962554:AAGPDM1AfJhCk_z98FOJkCzgYTxo2YYYmHs
NODE_ENV = production
```

### 2.3 Deploy

```
Deploy شروع می‌شود
منتظر بمانید... (2-3 دقیقه)
URL می‌دهد: https://xxxxx.vercel.app
```

---

## 🔗 مرحله 3: Telegram Webhook

```bash
# بعد از Deploy موفق:

curl -X POST https://api.telegram.org/bot8721962554:AAGPDM1AfJhCk_z98FOJkCzgYTxo2YYYmHs/setWebhook \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://YOUR_VERCEL_URL.vercel.app/api/telegram"
  }'
```

**نتیجه:**
```json
{
  "ok": true,
  "result": true,
  "description": "Webhook was set"
}
```

---

## ✅ تست کنید

### 1. ربات را جستجو کنید
```
@adhub_bot (یا نام شما)
```

### 2. /start کلیک کنید
```
✅ باید جواب دهد
```

### 3. /menu تایپ کنید
```
✅ منو نمایش داده شود
```

### 4. /tasks تایپ کنید
```
✅ لیست کارها
```

---

## 📊 آمار API

### مشاهده کاربران

```bash
curl https://YOUR_VERCEL_URL.vercel.app/api/users/YOUR_TELEGRAM_ID

# نتیجه:
{
  "id": "YOUR_ID",
  "name": "نام شما",
  "balance": 0,
  "totalEarnings": 0,
  "tasksCompleted": 0
}
```

### مشاهده کارها

```bash
curl https://YOUR_VERCEL_URL.vercel.app/api/tasks

# نتیجه:
{
  "page": 1,
  "total": 1000,
  "tasks": [...]
}
```

---

## 🔄 اپدیت کنند

```bash
# هر تغییری:
git add .
git commit -m "Update features"
git push

# Vercel خودکار redeploy می‌کند
# (1-2 دقیقه)
```

---

## 🆘 مشکل‌های عام

### ❌ "Webhook error"

```
حل:
1. Vercel URL صحیح است؟
2. /api/telegram endpoint فعال است؟

curl https://YOUR_URL/api/telegram -X POST \
  -H "Content-Type: application/json" \
  -d '{"test": "ok"}'
```

### ❌ ربات جواب نمی‌دهد

```
حل:
1. Webhook SET شده است؟
   curl https://api.telegram.org/bot TOKEN/getWebhookInfo

2. Vercel logs بررسی کنید
   Vercel Dashboard → Logs
```

### ❌ MONGODB_URI خطا

```
حل (اگر MongoDB استفاده کنید):
1. MongoDB Atlas Dashboard
2. Connection String کپی کنید
3. Vercel Environment Variables اضافه کنید
```

---

## 📈 بعد از موفقیت

### اضافه کردن ویژگی‌های جدید:

```typescript
// src/index.ts میتونید ویرایش کنید
async function handleMessage(message: any) {
  // نویا دستور اضافه کنید
  if (text === "/referral") {
    // Referral system
  }
}

// git push کنید
git add src/index.ts
git commit -m "Add referral system"
git push
```

### اضافه کردن MongoDB:

```typescript
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);
```

---

## 🎯 نکات مهم

✅ هر 30 دقیقه یک بار پروژه rebuild می‌شود  
✅ Vercel رایگان است (تا 100 requests/day)  
✅ GitHub integration خودکار است  
✅ SSL/HTTPS رایگان است  

---

## 📞 لینک‌های مفید

- Vercel Docs: https://vercel.com/docs
- Telegram Bot API: https://core.telegram.org/bots/api
- GitHub Actions: https://github.com/features/actions

---

## ✨ تمام!

حالا شما یک **ربات تلگرام کامل** روی **GitHub و Vercel** دارید.

**هر تغییر → Git push → Automatic Deploy** ✅
