export default async function handler(req, res) {
  // Sécurité : on autorise uniquement les requêtes POST (provenant de Supabase)
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Méthode non autorisée' });
  }

  const payload = req.body;

  // Supabase Database Webhook envoie un objet contenant le type d'événement et la nouvelle ligne (record)
  if (!payload || payload.type !== 'INSERT' || !payload.record) {
    return res.status(400).json({ success: false, error: 'Payload invalide' });
  }

  const transaction = payload.record;
  const { user_phone, dest_phone, service, package_name, total } = transaction;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const forfaitTexte = package_name || service || "Transfert d'unités";
  const message = `🚨 *Nouvelle Commande Automatisée (Cabine Express)*\n\n👤 Client : ${user_phone || 'Inconnu'}\n📱 Bénéficiaire : ${dest_phone}\n📦 Forfait/Service : ${forfaitTexte}\n💰 Total Payé : ${total} FCFA`;

  try {
    // 1. Envoyer la notification sur Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const data = await telegramResponse.json();

    if (!data.ok) {
      console.error("Erreur Telegram:", data.description);
    }

    // 2. Vous pouvez ajouter ici d'autres actions automatiques si besoin (ex: déclencher une autre API)

    return res.status(200).json({ success: true, message: 'Webhook traité avec succès' });

  } catch (error) {
    console.error("Erreur lors du traitement du webhook:", error);
    return res.status(500).json({ success: false, error: 'Erreur interne du serveur' });
  }
}
