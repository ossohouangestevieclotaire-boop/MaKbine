const https = require('https');

export default async function handler(req, res) {
    const phone = req.body?.phone || req.query?.phone;
    const total = req.body?.total || req.query?.total;

    if (!phone || !total) {
        return res.status(400).json({ success: false, error: "Données manquantes" });
    }

    const codeUssd = `*155*3*1*2*${phone}*${total}#`;
    const message = `🔔 NOUVELLE COMMANDE\nMontant : ${total} FCFA\nNuméro : ${phone}`;

    const data = JSON.stringify({
        chat_id: '6749069821',
        text: message
    });

    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: '/bot8642128083:AAFWfDzq2fZ5Wjj5HIYbtf-bKM4mWSYA_Ic/sendMessage',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    await new Promise((resolve) => {
        const telegramReq = https.request(options, (telegramRes) => {
            telegramRes.on('data', () => {});
            telegramRes.on('end', resolve);
        });
        telegramReq.on('error', (e) => {
            console.error("Erreur Telegram:", e);
            resolve();
        });
        telegramReq.write(data);
        telegramReq.end();
    });

    return res.status(200).json({ phone, total, ussd: codeUssd });
}
