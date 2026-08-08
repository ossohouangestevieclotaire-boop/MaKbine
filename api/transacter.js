const https = require('https');

module.exports = async (req, res) => {
    const phone = req.query.phone || req.query.tel;
    const montant = req.query.montant || req.query.amount;
    const service = req.query.service || "Service";

    if (!phone || !montant) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end(`Erreur 400 : Données manquantes (Reçu -> phone: ${phone}, montant: ${montant})`);
    }

    // Format propre du message Pushover incluant la syntaxe claire
    const syntaxeAction = `TRANSF | ${phone} | ${montant}F`;
    const messageContent = `Service: ${service}\nClient: ${phone}\nMontant: ${montant} FCFA\n\nSyntaxe: ${syntaxeAction}`;

    const messageData = JSON.stringify({
        token: "a68ythu2stdmjesyisxh43aw28hns3",
        user: "ukj9pvqehim38q2zuswvrnsnvh7d9t",
        message: messageContent
    });

    const options = {
        hostname: 'api.pushover.net',
        port: 443,
        path: '/1/messages.json',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': messageData.length
        }
    };

    const pvrReq = https.request(options, (pvrRes) => {
        pvrRes.on('data', () => {});
    });

    pvrReq.on('error', (e) => {
        console.error("Erreur Pushover :", e);
    });

    pvrReq.write(messageData);
    pvrReq.end();

    // Redirection immédiate vers Wave
    const waveLink = "https://pay.wave.com/m/M_ci_kZppYMsU3b4R/c/ci/";
    res.writeHead(302, { 'Location': waveLink });
    res.end();
};
