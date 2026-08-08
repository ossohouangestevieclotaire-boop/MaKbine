export default async function handler(req, res) {
    const phone = req.body?.phone || req.query?.phone;
    const total = req.body?.total || req.query?.total;

    if (!phone || !total) {
        return res.status(400).json({ error: "Paramètres manquants : phone et total requis." });
    }

    try {
        // Envoi de la notification Pushover sur ton téléphone
        const p = new URLSearchParams();
        p.append('token', 'ukj9pvqehim38q2zuswvrnsnvh7d9t');
        p.append('user', 'ukj9pvqehim38q2zuswvrnsnvh7d9t');
        p.append('message', `🔔 Nouvelle commande : ${total} FCFA - ${phone}`);
        p.append('title', 'MaKbine Paiement');
        p.append('sound', 'cashregister');

        await fetch('https://api.pushover.net/1/messages.json', {
            method: 'POST',
            body: p
        });

        // Retourne le format JSON avec le code USSD pour HTTP Shortcuts
        return res.status(200).json({
            phone: phone,
            total: total,
            ussd: `*155*3*1*2*${phone}*${total}#`
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
