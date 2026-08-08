export default async function handler(req, res) {
    const phone = req.body?.phone || req.query?.phone;
    const total = req.body?.total || req.query?.total;

    if (!phone || !total) {
        return res.status(400).json({ success: false, error: "Données manquantes" });
    }

    const codeUssd = `*155*3*1*2*${phone}*${total}#`;
    const message = `🔔 NOUVELLE COMMANDE\nMontant : ${total} FCFA\nNuméro : ${phone}`;

    try {
        await fetch(`https://api.telegram.org/bot8642128083:AAFWfDzq2fZ5Wjj5HIYbtf-bKM4mWSYA_Ic/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: '6749069821',
                text: message
            })
        });
    } catch (e) {
        console.error("Erreur d'envoi Telegram", e);
    }

    return res.status(200).json({ phone, total, ussd: codeUssd });
}
