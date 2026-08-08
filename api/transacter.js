export default async function handler(req, res) {
  // Autoriser à la fois POST et GET pour éviter l'erreur 405
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    // Récupérer les données selon qu'il s'agit d'un POST (body) ou d'un GET (query)
    const dataPayload = req.method === 'POST' ? req.body : req.query;

    // Déclencher la notification Pushover en arrière-plan sans bloquer
    try {
      fetch("https://api.pushover.net/1/messages.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: "a68ythu2stdmjesyisxh43aw28hns3",
          user: "ukj9pvqehim38q2zuswvrnsnvh7d9t",
          message: "Nouvelle transaction MaKbine reçue !",
          title: "MaKbine Paiement",
          url: "https://ma-kbine.vercel.app/",
          sound: "cashregister",
          priority: 1
        })
      }).catch(err => console.error("Erreur Pushover en arrière-plan:", err));
    } catch (pushErr) {
      console.error("Erreur lors du déclenchement de Pushover:", pushErr);
    }

    // Renvoyer immédiatement la réponse de succès
    return res.status(200).json({ 
      success: true, 
      message: "Transaction traitée et notification envoyée",
      receivedData: dataPayload 
    });

  } catch (error) {
    console.error("Erreur serveur:", error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
}
