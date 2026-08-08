export default async function handler(req, res) {
  // 1. Autoriser à la fois POST et GET pour éviter l'erreur 405
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    // 2. Récupérer les données de la transaction (corps POST ou paramètres URL GET)
    const payload = req.method === 'POST' ? req.body : req.query;

    // Extraire les informations pertinentes (adaptez selon vos clés de données)
    const montant = payload.montant || payload.amount || "Inconnu";
    const clientInfo = payload.client || payload.numero || "Client";
    const transactionId = payload.id || payload.reference || Date.now();
    
    // Construire le message de la notification
    const messageTexte = `Nouvelle transaction reçue !\nMontant : ${montant}\nClient/Info : ${clientInfo}`;

    // 3. Solution Intelligente : URL dynamique contenant l'ID de la transaction
    const targetUrl = `https://ma-kbine.vercel.app/?transaction=${transactionId}`;

    // 4. Déclencher la notification Pushover en arrière-plan sans bloquer
    try {
      fetch("https://api.pushover.net/1/messages.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: "a68ythu2stdmjesyisxh43aw28hns3",
          user: "ukj9pvqehim38q2zuswvrnsnvh7d9t",
          message: messageTexte,
          title: "MaKbine Paiement",
          url: targetUrl,                      // URL intelligente transmise
          url_title: "Voir les détails de la transaction",
          sound: "cashregister",
          priority: 1
        })
      }).catch(err => console.error("Erreur Pushover en arrière-plan:", err));
    } catch (pushErr) {
      console.error("Erreur lors du déclenchement de Pushover:", pushErr);
    }

    // 5. Réponse de succès au client
    return res.status(200).json({ 
      success: true, 
      message: "Transaction traitée et notification intelligente envoyée",
      receivedData: payload 
    });

  } catch (error) {
    console.error("Erreur serveur:", error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
}
