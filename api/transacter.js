const axios = require('axios');

module.exports = async (req, res) => {
    // 1. Récupération des données depuis l'URL (req.query)
    const { phone, montant, service } = req.query;

    if (!phone || !montant) {
        return res.status(400).send("Données manquantes");
    }

    // 2. Envoi de la notification Pushover
    try {
        await axios.post('https://api.pushover.net/1/messages.json', {
            token: "a68ythu2stdmjesyisxh43aw28hns3",
            user: "ukj9pvqehim38q2zuswvrnsnvh7d9t",
            message: `Transaction: ${service} | Tel: ${phone} | Montant: ${montant} FCFA`
        });
    } catch (error) {
        console.error("Erreur Pushover :", error);
        // On continue quand même pour ne pas bloquer le client
    }

    // 3. Redirection finale forcée vers Wave
    const waveLink = "https://pay.wave.com/m/M_ci_kZppYMsU3b4R/c/ci/";
    
    // Réponse HTTP 302 pour forcer le navigateur à changer de page
    res.writeHead(302, { 'Location': waveLink });
    res.end();
};
