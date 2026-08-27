export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Méthode non autorisée' });
  }

  // 1. Récupérer aussi packageName depuis le corps de la requête
  const { phone, total, packageName } = req.body;

  if (!phone || !total) {
    return res.status(400).json({ success: false, error: 'Paramètres manquants' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // 2. Détection du réseau à partir du numéro de téléphone
  function detecterReseau(numero) {
    const n = numero.replace(/\s+/g, ''); // enlève les espaces éventuels
    const prefixe = n.substring(0, 2);

    if (prefixe === '05') return 'MTN';
    if (prefixe === '07') return 'Orange';
    if (prefixe === '01') return 'Moov';
    return 'Inconnu';
  }

  const reseauDetecte = detecterReseau(phone);

  // 3. Intégrer le forfait dans le message (avec une valeur par défaut si absent)
  const forfaitTexte = packageName || "Transfert d'unités";
  const message = `🚨 Nouvelle transaction MaKbine !\n📱 Téléphone : ${phone}\n📶 Réseau : ${reseauDetecte}\n📦 Forfait : ${forfaitTexte}\n💰 Total : ${total} FCFA`;

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
