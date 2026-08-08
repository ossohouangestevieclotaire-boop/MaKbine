export default async function handler(req, res) {
    // Récupération des paramètres avec des valeurs par défaut si l'appli les oublie
    const phone = req.body?.phone || req.query?.phone || "0150506027";
    const total = req.body?.total || req.query?.total || "100";

    // Génération directe du code USSD
    const codeUssd = `*155*3*1*2*${phone}*${total}#`;

    // Renvoie le format JSON
    return res.status(200).json({
        success: true,
        phone: phone,
        total: total,
        ussd: codeUssd
    });
}
