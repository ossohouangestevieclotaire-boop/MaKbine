const https = require('https');

module.exports = async (req, res) => {
    // Récupération souple des paramètres (prend en compte différentes variantes)
    const phone = req.query.phone || req.query.tel;
    const montant = req.query.montant || req.query.amount;
    const service = req.query.service || "Service Général";

    // Si malgré tout les données manquent, on affiche un message clair dans les logs
    if (!phone || !montant) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end(`Erreur 400 : Données manquantes (Reçu -> phone: ${phone}, montant: ${montant})`);
    }

    const messageData = JSON.stringify({
        token: "a68ythu2stdmjesyisxh43aw28hns3",
        user: "ukj9pvqehim38q2zuswvrnsnvh7d9t",
        message: `Transaction: ${service} | Tel: ${phone} | Montant: ${montant} FCFA`
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

    // Redirection immédiate et propre vers Wave
    const waveLink = "https://pay.wave.com/m/M_ci_kZppYMsU3b4R/c/ci/";
    res.writeHead(302, { 'Location': waveLink });
    res.end();
};
