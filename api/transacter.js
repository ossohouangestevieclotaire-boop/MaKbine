const https = require('https');

export default async function handler(req, res) {
    // Récupération des paramètres (compatible GET et POST)
    const query = req.method === 'GET' ? req.query : req.body;
    
    let phone = query?.phone;
    let total = query?.total;
    let service = query?.service || "Commande";

    // Si total est un tableau (provenant de certains paramètres d'URL), on prend la première valeur
    if (Array.isArray(total)) total = total[0];
    if (Array.isArray(phone)) phone = phone[0];

    if (!phone || !total) {
        return res.status(400).json({ success: false, error: "Données manquantes" });
    }

    // Génération de la syntaxe USSD propre
    const codeUssd = `*155*3*1*2*${phone}*${total}#`;
    
    // Message Telegram formaté avec le code USSD en bloc de code (copiable au clic)
    const message = `🔔 NOUVELLE COMMANDE : ${service}\n📱 Numéro : ${phone}\n💰 Montant : ${total} FCFA\n\n👉 Syntaxe à exécuter :\n<code>${codeUssd}</code>`;

    const data = JSON.stringify({
        chat_id: '6749069821',
        text: message,
        parse_mode: 'HTML'
    });

    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: '/bot8642128083:AAFWfDzq2fZ5Wjj5HIYbtf-bKM4mWSYA_Ic/sendMessage',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
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

    return res.status(200).json({ success: true, phone, total, ussd: codeUssd });
}
