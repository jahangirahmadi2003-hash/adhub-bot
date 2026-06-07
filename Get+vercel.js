# ✅ چک‌لیست نهایی - GitHub + Vercel

## 📋 مرحله 1: فایل‌ها آماده کنید

- [ ] `src/index.ts` → نسخه Vercel استفاده کنید
- [ ] `package.json` → نسخه Vercel استفاده کنید  
- [ ] `vercel.json` → فایل درست استفاده کنید
- [ ] `.env` حذف کنید (در git نیفرستید)
- [ ] `.gitignore` اضافه کنید:
  ```
  node_modules/
  .env
  .env.local
  dist/
  ```

---

## 🔧 مرحله 2: GitHub Setup

```bash
# 1. اگر اول بار است:
cd telegram-bot-server
git init

# 2. فایل‌ها اضافه کنید:
git add .

# 3. Commit:
git commit -m "Initial commit - Telegram Bot Vercel Edition"

# 4. GitHub جدید:
# github.com/new → telegram-bot-vercel

# 5. Remote اضافه کنید:
git remote add origin https://github.com/YOUR_USERNAME/telegram-bot-vercel.git
git branch -M main
git push -u origin main

# اگر قبلاً کردید:
git add .
git commit -m "Update Vercel configuration"
git push
```

---

## 🚀 مرحله 3: Vercel Deploy

### 3.1 Vercel Dashboard
```
1. vercel.com برفتن
2. "New Project" کلیک کنید
3. "Import Git Repository" کنید
4. telegram-bot-vercel انتخاب کنید
5. "Import" کلیک کنید
```

### 3.2 Environment Variables

```
TELEGRAM_BOT_TOKEN = 8721962554:AAGPDM1AfJhCk_z98FOJkCzgYTxo2YYYmHs
NODE_ENV = production
```

### 3.3 Deploy

```
"Deploy" کلیک کنید
منتظر بمانید (2-3 دقیقه)

نتیجه:
✅ Deployment Complete
🔗 Production URL: https://xxxxx.vercel.app
```

---

## 🔗 مرحله 4: Telegram Webhook

```bash
# کپی کنید:
https://YOUR_VERCEL_DOMAIN.vercel.app

# اجرا کنید:
curl -X POST https://api.telegram.org/bot8721962554:AAGPDM1AfJhCk_z98FOJkCzgYTxo2YYYmHs/setWebhook \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://YOUR_VERCEL_DOMAIN.vercel.app/api/telegram"
  }'

# جایگزین کنید:
YOUR_VERCEL_DOMAIN = نام domain شما (بدون /api/telegram)

# مثال:
https://api.telegram.org/bot8721962554:AAGPDM1AfJhCk_z98FOJkCzgYTxo2YYYmHs/setWebhook \
  -d '{"url":"https://telegram-bot-abc123.vercel.app/api/telegram"}'
```

---

## ✅ تست کنید

### تست 1: API

```bash
# Webhook فعال است؟
curl https://YOUR_DOMAIN.vercel.app

# نتیجه:
{
  "message": "ربات تلگرام درآمد‌زا - Vercel Version",
  "status": "فعال"
}
```

### تست 2: Telegram Bot

```
1. @adhub_bot را جستجو کنید
2. /start کلیک کنید
3. باید جواب دهد: "🎉 خوش آمدید..."
4. /menu بنویسید
5. منو نمایش داده شود ✅
```

### تست 3: API Call

```bash
curl https://YOUR_DOMAIN.vercel.app/api/users/YOUR_TELEGRAM_ID

# نتیجه اگر user موجود بود:
{
  "id": "123456789",
  "name": "نام شما",
  "balance": 0,
  "totalEarnings": 0
}
```

---

## 🔄 اپدیت و تغییرات

```bash
# مثال: دستور جدید اضافه کنید

# 1. src/index.ts را ویرایش کنید
nano src/index.ts

# 2. کد جدید اضافه کنید:
if (text === "/referral") {
  await sendMessage(chatId, "کد معرفی: ref_12345");
}

# 3. Save کنید (Ctrl+X → Y → Enter)

# 4. Git push کنید:
git add src/index.ts
git commit -m "Add referral command"
git push

# 5. Vercel خودکار redeploy می‌کند
# (منتظر 1-2 دقیقه)
```

---

## 📊 مدیریت Vercel

### مشاهده Logs:
```
Vercel Dashboard
→ Deployments
→ Production
→ Logs
```

### Redeploy:
```
Vercel Dashboard
→ Deployments
→ ⋯ (سه نقطه)
→ Redeploy
```

### Environment Variables تغییر:
```
Vercel Dashboard
→ Settings
→ Environment Variables
→ Edit / Add
```

---

## 🎯 نکات مهم

✅ **هر git push = خودکار deploy**
✅ **HTTPS رایگان**
✅ **رایگان برای استفاده‌های کم**
✅ **سریع (CDN جهانی)**
✅ **Scaling خودکار**

---

## 🚨 مشکل‌های عام

### ❌ "404 Not Found"

```
حل:
1. API route صحیح است؟
   /api/telegram ✅
   
2. src/index.ts در پوشه درست است؟
   telegram-bot-server/src/index.ts ✅
```

### ❌ Webhook Error

```
حل:
1. Webhook URL صحیح است؟
2. TELEGRAM_BOT_TOKEN درست است؟
3. Vercel deployment موفق شده؟

بررسی کنید:
curl https://api.telegram.org/botTOKEN/getWebhookInfo
```

### ❌ Vercel won't build

```
حل:
1. npm install اجرا کنید محلی
   npm install
   
2. TypeScript errors بررسی کنید
   npm run build
   
3. package.json درست است؟
   npm install && npm run build
```

---

## 🎁 بعد از موفقیت

### افزودن MongoDB:

```bash
# 1. mongodb.com → Cluster ایجاد کنید
# 2. Connection string کپی کنید
# 3. Vercel Environment Variables:
MONGODB_URI = mongodb+srv://...
```

### افزودن Stripe برای پرداخت:

```bash
# 1. stripe.com → Account
# 2. API Keys کپی کنید
# 3. Vercel Environment Variables:
STRIPE_PUBLIC_KEY = pk_...
STRIPE_SECRET_KEY = sk_...
```

### اضافه کردن Custom Domain:

```
Vercel Dashboard
→ Settings
→ Domains
→ Add
→ yourdomain.com
```

---

## 📞 لینک‌های کمکی

- **Vercel Docs**: https://vercel.com/docs
- **Telegram Bot API**: https://core.telegram.org/bots/api
- **Express.js**: https://expressjs.com
- **GitHub**: https://github.com

---

## ✨ شما آماده‌اید!

**تمام چیزی که نیاز دارید:**
- ✅ کد Vercel-compatible
- ✅ Package.json درست
- ✅ Vercel.json درست
- ✅ توکن تلگرام
- ✅ GitHub + Vercel integration

**الآن شروع کنید:**
```bash
git push
# ... Vercel redeploy می‌کند ...
# ✅ ربات آماده است!
```

---

**موفق باشید! 🚀**
