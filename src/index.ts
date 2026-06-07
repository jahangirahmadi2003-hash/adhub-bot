// src/index.ts - نسخه Vercel
import "reflect-metadata";
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const MONGODB_URI = process.env.MONGODB_URI;
const VERCEL_URL = process.env.VERCEL_URL || "http://localhost:3000";

// In-memory storage (برای Demo)
const users: any = {};
const tasks = generateTasks();

// ==================== API Routes ====================

// 1. صفحه اصلی
app.get("/", (req, res) => {
  res.json({
    message: "ربات تلگرام درآمد‌زا - Vercel Version",
    status: "فعال",
    webhook: `${VERCEL_URL}/api/telegram`
  });
});

// 2. Telegram Webhook
app.post("/api/telegram", async (req, res) => {
  try {
    const message = req.body.message;
    const callbackQuery = req.body.callback_query;

    if (message) {
      await handleMessage(message);
    }

    if (callbackQuery) {
      await handleCallbackQuery(callbackQuery);
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Error:", error);
    res.json({ ok: false });
  }
});

// 3. کاربران API
app.get("/api/users/:telegramId", (req, res) => {
  const userId = req.params.telegramId;
  const user = users[userId];

  if (!user) {
    return res.status(404).json({ error: "کاربر یافت نشد" });
  }

  res.json(user);
});

// 4. کارها API
app.get("/api/tasks", (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 50;
  const start = (page - 1) * limit;

  const paginated = Object.values(tasks).slice(start, start + limit);

  res.json({
    page,
    total: Object.keys(tasks).length,
    limit,
    tasks: paginated
  });
});

// 5. موجودی API
app.get("/api/balance/:telegramId", (req, res) => {
  const userId = req.params.telegramId;
  const user = users[userId];

  if (!user) {
    return res.status(404).json({ error: "کاربر یافت نشد" });
  }

  res.json({
    userId,
    balance: user.balance,
    totalEarnings: user.totalEarnings,
    tasksCompleted: user.tasksCompleted
  });
});

// 6. درخواست برداشت
app.post("/api/withdraw", (req, res) => {
  const { telegramId, amount, walletAddress } = req.body;
  const user = users[telegramId];

  if (!user) {
    return res.status(404).json({ error: "کاربر یافت نشد" });
  }

  if (user.balance < amount) {
    return res.status(400).json({ error: "موجودی ناکافی" });
  }

  user.balance -= amount;

  res.json({
    success: true,
    message: "درخواست برداشت ثبت شد",
    amount,
    newBalance: user.balance
  });
});

// ==================== Telegram Functions ====================

async function handleMessage(message: any) {
  const chatId = message.chat.id;
  const text = message.text;
  const userId = message.from.id.toString();

  // شروع
  if (text === "/start") {
    if (!users[userId]) {
      users[userId] = {
        id: userId,
        name: message.from.first_name,
        balance: 0,
        totalEarnings: 0,
        tasksCompleted: 0,
        createdAt: new Date()
      };
    }

    await sendMessage(chatId, 
      `🎉 خوش آمدید ${message.from.first_name}!\n\n` +
      `📊 سیستم درآمد ربات تلگرام\n` +
      `💰 1000 نوع کار مختلف\n` +
      `📢 نمایش تبلیغات\n\n` +
      `برای شروع /menu را انتخاب کنید`
    );
  }

  // منو
  if (text === "/menu") {
    await sendMessage(chatId,
      "📋 منوی اصلی:\n\n" +
      "1️⃣ /tasks - لیست کارها\n" +
      "2️⃣ /balance - موجودی\n" +
      "3️⃣ /withdraw - برداشت\n" +
      "4️⃣ /stats - آمار"
    );
  }

  // کارها
  if (text === "/tasks") {
    const taskList = Object.values(tasks).slice(0, 5);
    let response = "📋 برخی از کارها:\n\n";
    taskList.forEach((task: any) => {
      response += `✅ ${task.name} - ${task.reward} درهم\n`;
    });
    await sendMessage(chatId, response);
  }

  // موجودی
  if (text === "/balance") {
    const user = users[userId];
    if (user) {
      await sendMessage(chatId,
        `💰 موجودی شما: ${user.balance} درهم\n` +
        `📊 کل درآمد: ${user.totalEarnings} درهم\n` +
        `✅ کارهای انجام شده: ${user.tasksCompleted}`
      );
    }
  }

  // آمار
  if (text === "/stats") {
    const totalUsers = Object.keys(users).length;
    const totalBalance = Object.values(users).reduce((sum: number, u: any) => sum + u.balance, 0);

    await sendMessage(chatId,
      `📊 آمار سیستم:\n\n` +
      `👥 کل کاربران: ${totalUsers}\n` +
      `💰 کل موجودی: ${totalBalance} درهم\n` +
      `📋 کل کارها: 1000`
    );
  }
}

async function handleCallbackQuery(query: any) {
  // اگر button کلیک شد
  const chatId = query.message.chat.id;
  const userId = query.from.id.toString();
  const data = query.data;

  if (data === "task_1") {
    await sendMessage(chatId, 
      "✅ کار شماره 1 شروع شد\n" +
      "💰 پاداش: 5 درهم\n" +
      "/complete برای تکمیل"
    );
  }

  if (data === "complete") {
    const user = users[userId];
    if (user) {
      user.balance += 5;
      user.totalEarnings += 5;
      user.tasksCompleted += 1;

      await sendMessage(chatId,
        "✅ تبریک! کار انجام شد\n" +
        `💰 5 درهم به حسابتان اضافه شد\n` +
        `موجودی: ${user.balance} درهم`
      );
    }
  }
}

async function sendMessage(chatId: number, text: string) {
  try {
    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text: text,
        parse_mode: "HTML"
      }
    );
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

// ==================== Helpers ====================

function generateTasks() {
  const tasks: any = {};
  for (let i = 1; i <= 1000; i++) {
    tasks[i] = {
      id: i,
      name: `کار شماره ${i}`,
      reward: Math.random() * 10 + 0.5,
      adRevenue: Math.random() * 5 + 0.1
    };
  }
  return tasks;
}

// ==================== Start Server ====================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 سرور در پورت ${PORT} در حال اجرا است`);
  console.log(`🔗 Webhook: https://yourdomain.vercel.app/api/telegram`);
  console.log(`📱 ربات درآمد‌زا فعال است`);
});

export default app;
