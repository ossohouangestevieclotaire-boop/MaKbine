const https = require('https');

module.exports = async (req, res) => {
    const phone = req.query.phone || req.query.tel;
    const montant = req.query.montant || req.query.amount;
    const service = req.query.service || "Service";
    const transactionId = req.query.id || ("TX-" + Date.now());

    if (!phone || !montant) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end(`Erreur 400 : Données manquantes (Reçu -> phone: ${phone}, montant: ${montant})`);
    }

    // 1. Envoi de la notification Pushover (pour vous)
    const syntaxeAction = `TRANSF | ${phone} | ${montant}F`;
    const messageContent = `Service: ${service}\nClient: ${phone}\nMontant: ${montant} FCFA\n\nSyntaxe: ${syntaxeAction}`;

    const pvrData = JSON.stringify({
        token: "a68ythu2stdmjesyisxh43aw28hns3",
        user: "ukj9pvqehim38q2zuswvrnsnvh7d9t",
        message: messageContent
    });

    const pvrOptions = {
        hostname: 'api.pushover.net',
        port: 443,
        path: '/1/messages.json',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': pvrData.length
        }
    };

    const pvrReq = https.request(pvrOptions, (pvrRes) => {
        pvrRes.on('data', () => {});
    });
    pvrReq.on('error', (e) => console.error("Erreur Pushover :", e));
    pvrReq.write(pvrData);
    pvrReq.end();

    // 2. Redirection vers WhatsApp avec votre numéro intégré (2250100483015)
    const monNumeroWhatsApp = "2250100483015"; 
    
    const texteWhatsApp = encodeURIComponent(
        `📌 *NOUVELLE DEMANDE DE TRANSACTION*\n\n` +
        `🆔 Ref: ${transactionId}\n` +
        `📱 Service: ${service}\n` +
        `👤 Client: ${phone}\n` +
        `💰 Montant: ${montant} FCFA\n` +
        `⌨️ Syntaxe: ${syntaxeAction}`
    );

    const whatsappLink = `https://wa.me/${monNumeroWhatsApp}?text=${texteWhatsApp}`;

    res.writeHead(302, { 'Location': whatsappLink });
    res.end();
};
