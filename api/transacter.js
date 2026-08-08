const https = require('https');

module.exports = async (req, res) => {
    const { phone, montant, service } = req.query;

    if (!phone || !montant) {
        return res.status(400).send("Données manquantes");
    }

    const messageData = JSON.stringify({
        token: "a68ythu2stdmjesyisxh43aw28hns3",
        user: "ukj9pvqehim38q2zuswvrnsnvh7d9t",
        message: `Transaction: ${service || 'Service'} | Tel: ${phone} | Montant: ${montant} FCFA`
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

    // On envoie la notification Pushover en arrière-plan sans bloquer
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
