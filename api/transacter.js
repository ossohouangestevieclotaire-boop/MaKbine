export default async function handler(req, res) {
    const phone = req.body?.phone || req.query?.phone || "0150506027";
    const total = req.body?.total || req.query?.total || "100";
    const codeUssd = `*155*3*1*2*${phone}*${total}#`;

    // 1. Envoi de la notification Pushover en arrière-plan (sans bloquer si ça échoue)
    try {
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
    } catch (err) {
        // Ignore l'erreur Pushover pour que l'affichage USSD fonctionne toujours
    }

    // 2. Renvoie le JSON indispensable pour ton HTTP Shortcuts
    return res.status(200).json({
        success: true,
        phone: phone,
        total: total,
        ussd: codeUssd
    });
}
