export default async function handler(req, res) {
    const phone = req.body?.phone || req.query?.phone;
    const total = req.body?.total || req.query?.total;

    if (!phone || !total) {
        return res.status(400).json({ error: "Paramètres manquants : phone et total requis." });
    }

    // Retourne directement les données et le code USSD pour HTTP Shortcuts
    return res.status(200).json({
        phone: phone,
        total: total,
        ussd: `*155*3*1*2*${phone}*${total}#`
    });
}
