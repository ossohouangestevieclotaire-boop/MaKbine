export default async function handler(req, res) {
    // Vérification de la méthode HTTP (uniquement POST autorisé)
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
    }

    try {
        const { type, record } = req.body;

        // On vérifie qu'il s'agit bien d'un événement d'insertion et qu'un enregistrement est présent
        if (type === 'INSERT' && record) {
            const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
            const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

            // Vérification de la présence des variables d'environnement Telegram
            if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
                console.error("Les variables d'environnement Telegram (TOKEN ou CHAT_ID) ne sont pas configurées.");
                return res.status(500).json({ error: 'Configuration serveur incomplète pour Telegram' });
            }

            // Construction du message d'alerte propre et structuré
            const message = `🚨 *Nouvelle Commande Cabine Express* 🚨\n\n` +
                            `📱 *Client :* \`${record.user_phone}\`\n` +
                            `🎯 *Destinataire :* \`${record.dest_phone}\`\n` +
                            `📡 *Opérateur :* ${record.service}\n` +
                            `📦 *Forfait :* ${record.package_name}\n` +
                            `💰 *Montant :* ${record.total} FCFA\n` +
                            `⏳ *Statut :* ${record.status || 'En attente'}`;

            // Envoi de la requête vers l'API Telegram
            const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });

            const data = await telegramResponse.json();

            if (!data.ok) {
                throw new Error(data.description || 'Erreur lors de la communication avec l’API Telegram');
            }

            return res.status(200).json({ success: true, message: 'Alerte Telegram envoyée avec succès' });
        }

        return res.status(400).json({ error: 'Type d’événement non pris en charge ou données manquantes' });

    } catch (error) {
        console.error('Erreur dans le webhook Vercel :', error);
        return res.status(500).json({ error: error.message || 'Erreur interne du serveur' });
    }
}
