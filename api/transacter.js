export default async function handler(req, res) {
    const phone = req.body?.phone || req.query?.phone;
    const total = req.body?.total || req.query?.total;

    if (!phone || !total) {
        return res.status(400).json({ success: false, error: "Données manquantes" });
    }

    const codeUssd = `*155*3*1*2*${phone}*${total}#`;

    // Notification instantanée sur ton téléphone via Pushover
    try {
        await fetch('https://api.pushover.net/1/messages.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: 'ukj9pvqehim38q2zuswvrnsnvh7d9t',
                user: 'ukj9pvqehim38q2zuswvrnsnvh7d9t',
                message: `🔔 COMMANDE : ${total} FCFA pour ${phone}`,
                title: 'MaKbine Paiement',
                sound: 'cashregister'
            })
        });
    } catch (e) { console.error(e); }

    return res.status(200).json({ phone, total, usssd: codeUssd });
}
