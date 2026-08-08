// Fonction pour envoyer l'alerte sur ton application Pushover
async function envoyerAlertePushover(phone, total) {
    const p = new URLSearchParams({
        token: 'ukj9pvqehim38q2zuswvrnsnvh7d9t', // Ton API Token
        user: 'ukj9pvqehim38q2zuswvrnsnvh7d9t',  // Ta User Key
        message: `🔔 Nouvelle commande !\nClient : ${phone}\nMontant : ${total} FCFA`,
        title: 'MaKbine Paiement',
        sound: 'cashregister'                  // Sonnette de caisse
    });

    try {
        await fetch('https://api.pushover.net/1/messages.json', {
            method: 'POST',
            body: p
        });
    } catch (error) {
        console.error("Erreur lors de l'envoi de la notification push", error);
    }
}

// Point d'entrée de l'API sur Vercel
export default async function handler(req, res) {
    try {
        // 1. Récupération des données envoyées par ton site web
        const { phone, total } = req.body || req.query;

        if (!phone || !total) {
            return res.status(400).json({ success: false, error: "Paramètres manquants (phone ou total)" });
        }

        // Nettoyage du montant (garder uniquement les chiffres)
        const montantNettoye = String(total).replace(/[^0-9]/g, '');

        // 2. 🔔 Déclenchement de la notification instantanée sur ton téléphone
        await envoyerAlertePushover(phone, montantNettoye);

        // 3. Retour de la réponse (qui sera récupérée par ton application HTTP Shortcuts)
        return res.status(200).json([{
            phone: phone,
            total: montantNettoye
        }]);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: "Erreur interne du serveur" });
    }
}
