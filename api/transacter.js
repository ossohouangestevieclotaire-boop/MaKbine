export default async function handler(req, res) {
    // Récupère les données peu importe si elles sont envoyées en GET (query) ou en POST (body)
    const phone = req.body?.phone || req.query?.phone;
    const total = req.body?.total || req.query?.total;

    if (!phone || !total) {
        return res.status(400).json({ 
            success: false, 
            error: "Paramètres manquants : phone et total requis." 
        });
    }

    // Génération propre de la syntaxe USSD Moov
    const codeUssd = `*155*3*1*2*${phone}*${total}#`;

    // Réponse JSON claire
    return res.status(200).json({
        success: true,
        phone: phone,
        total: total,
        ussd: codeUssd
    });
}
