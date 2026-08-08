export default async function handler(req, res) {
    // Récupère les données envoyées par ton système de commande
    const phone = req.body?.phone || req.query?.phone;
    const total = req.body?.total || req.query?.total;

    if (!phone || !total) {
        return res.status(400).json({ error: "Données manquantes" });
    }

    const codeUssd = `*155*3*1*2*${phone}*${total}#`;

    // Ici, tu peux ajouter un envoi de message automatique pour te prévenir
    // (Utilise mon outil 'messaging' pour t'envoyer un message sur WhatsApp par exemple)
    
    return res.status(200).json({ phone, total, usssd: codeUssd });
}
