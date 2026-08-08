export default async function handler(req, res) {
    const phone = req.body?.phone || req.query?.phone || "0150506027";
    const total = req.body?.total || req.query?.total || "100";
    const codeUssd = `*155*3*1*2*${phone}*${total}#`;

    // 1. Envoi de la notification Pushover en JSON strict
    try {
        await fetch('https://api.pushover.net/1/messages.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: 'ukj9pvqehim38q2zuswvrnsnvh7d9t',
                user: 'ukj9pvqehim38q2zuswvrnsnvh7d9t',
                message: `🔔 Nouvelle commande : ${total} FCFA - ${phone}`,
                title: 'MaKbine Paiement',
                sound: 'cashregister'
            })
        });
    } catch (err) {
        console.error("Erreur Pushover :", err);
    }

    // 2. Renvoie toujours le JSON pour HTTP Shortcuts
    return res.status(200).json({
        success: true,
        phone: phone,
        total: total,
        ussd: codeUssd
    });
}
