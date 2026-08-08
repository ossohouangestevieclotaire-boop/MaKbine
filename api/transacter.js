export default async function handler(req, res) {
    const phone = req.body?.phone || req.query?.phone;
    const total = req.body?.total || req.query?.total;

    if (!phone || !total) {
        return res.status(400).send("Paramètres manquants : phone et total requis.");
    }

    try {
        // 1. Envoi de la notification Pushover sur ton téléphone
        const p = new URLSearchParams();
        p.append('token', 'ukj9pvqehim38q2zuswvrnsnvh7d9t');
        p.append('user', 'ukj9pvqehim38q2zuswvrnsnvh7d9t');
        p.append('message', `🔔 Nouvelle commande : ${total} FCFA - ${phone}`);
        p.append('title', 'MaKbine Paiement');
        p.append('sound', 'cashregister');

        await fetch('https://api.pushover.net/1/messages.json', {
            method: 'POST',
            body: p
        });

        // 2. Génération du code USSD exact à afficher dans HTTP Shortcuts
        // Adapte ce code USSD selon l'opérateur et ta syntaxe habituelle
        const codeUssd = `*155*3*1*2*${phone}*${total}#`;

        // On renvoie directement le code USSD en texte brut pour que l'app l'affiche
        return res.status(200).setHeader('Content-Type', 'text/plain').send(codeUssd);

    } catch (err) {
        return res.status(500).send("Erreur serveur : " + err.message);
    }
}
