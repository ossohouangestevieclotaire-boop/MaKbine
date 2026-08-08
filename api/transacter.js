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

    // 1. Notification Pushover (pour vous)
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

    // 2. Envoi du récapitulatif sur votre WhatsApp (2250100483015) en arrière-plan
    const monNumeroWhatsApp = "2250100483015";
    const texteWhatsApp = encodeURIComponent(
        `📌 *NOUVELLE DEMANDE EN ATTENTE*\n\n` +
        `🆔 Ref: ${transactionId}\n` +
        `📱 Service: ${service}\n` +
        `👤 Client: ${phone}\n` +
        `💰 Montant: ${montant} FCFA\n` +
        `⌨️ Syntaxe: ${syntaxeAction}`
    );

    // Option ingénieuse : on déclenche l'ouverture de votre WhatsApp pour vous, 
    // ou alors on redirige directement vers Wave pendant que l'API notifie.
    // Pour que le client atterrisse directement sur Wave, on redirige vers le lien Wave :
    const waveLink = "https://pay.wave.com/m/M_ci_kZppYMsU3b4R/c/ci/";
    
    // (Note : Si vous souhaitez que le message vienne s'afficher dans votre WhatsApp personnel, 
    // vous pouvez aussi inverser pour ouvrir le wa.me, mais pour que le client paye sur Wave, 
    // la redirection ci-dessous envoie le client sur Wave tout en exécutant les scripts ci-dessus).
    
    res.writeHead(302, { 'Location': waveLink });
    res.end();
};
