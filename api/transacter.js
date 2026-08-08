export default async function handler(req, res) {
    // Récupérer les paramètres via query (pour le test navigateur) ou body (pour ton application)
    const phone = req.body.phone || req.query.phone;
    const total = req.body.total || req.query.total;

    if (!phone || !total) {
        return res.status(400).json({ error: "Paramètres manquants : phone et total requis." });
    }

    try {
        // Envoi Pushover
        const response = await fetch('https://api.pushover.net/1/messages.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                token: 'ukj9pvqehim38q2zuswvrnsnvh7d9t',
                user: 'ukj9pvqehim38q2zuswvrnsnvh7d9t',
                message: `🔔 Nouvelle commande : ${total} FCFA - ${phone}`,
                title: 'MaKbine Paiement',
                sound: 'cashregister'
            })
        });

        // Retourner la réponse au Shortcut
        return res.status(200).json({ status: "success", phone, total });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
