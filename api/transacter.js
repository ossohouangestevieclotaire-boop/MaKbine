export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Méthode non autorisée' });
  }

  const { phone, total } = req.body;

  if (!phone || !total) {
    return res.status(400).json({ success: false, error: 'Paramètres manquants' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || "6749069821";

  const message = `🔔 Nouvelle transaction MaKbine !\n📱 Téléphone : ${phone}\n💰 Total : ${total} FCFA`;

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });

    const data = await telegramResponse.json();

    if (data.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false, error: data.description });
    }
  } catch (error) {
    console.error("Erreur Telegram:", error);
    return res.status(500).json({ success: false, error: 'Erreur de communication avec Telegram' });
  }
}
