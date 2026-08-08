export default async function handler(req, res) {
    const phone = req.body?.phone || req.query?.phone;
    const total = req.body?.total || req.query?.total;

    if (!phone || !total) {
        return res.status(400).json({ error: "Paramètres manquants : phone et total requis." });
    }

    try {
        // Construction explicite des données pour Pushover
        const p = new URLSearchParams();
        p.append('token', 'ukj9pvqehim38q2zuswvrnsnvh7d9t');
        p.append('user', 'ukj9pvqehim38q2zuswvrnsnvh7d9t');
        p.append('message', `🔔 Nouvelle commande : ${total} FCFA - ${phone}`);
        p.append('title', 'MaKbine Paiement');
        p.append('sound', 'cashregister');

        // Envoi vers l'API Pushover
        const pResponse = await fetch('https://api.pushover.net/1/messages.json', {
            method: 'POST',
            body: p
        });

        const pResult = await pResponse.json();

        // Retourner la réponse au navigateur ou à HTTP Shortcuts
        return res.status(200).json({ status: "success", phone, total, pushoverResponse: pResult });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
