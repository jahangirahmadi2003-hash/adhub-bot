export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).send("Bot is running");
  }

  try {
    const body = req.body;

    const message = body?.message;
    const chatId = message?.chat?.id;
    const text = message?.text;

    if (!chatId) {
      return res.status(200).json({ ok: true });
    }

    let reply = "سلام 👋 من ربات هستم";

    if (text === "/start") {
      reply = "خوش آمدی 😊";
    } else if (text) {
      reply = "تو گفتی: " + text;
    }

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply,
      }),
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "error" });
  }
      }
