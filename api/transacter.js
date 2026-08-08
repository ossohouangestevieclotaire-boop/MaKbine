export default async function handler(req, res) {
    // Récupère dynamiquement le téléphone et le montant, que ce soit en POST ou en GET
    const phone = req.body?.phone || req.query?.phone;
    const total = req.body?.total || req.query?.total;

    // Si les paramètres manquent, renvoie une erreur claire
    if (!phone || !total) {
        return res.status(400).json({ 
            success: false, 
            error: "Paramètres manquants : phone et total requis." 
        });
    }

    // Génère le code USSD avec les vraies données de la commande
    const codeUssd = `*155*3*1*2*${phone}*${total}#`;

    // Retourne le JSON propre pour HTTP Shortcuts
    return res.status(200).json({
        success: true,
        phone: phone,
        total: total,
        ussd: codeUssd
    });
}
