export default async function handler(req, res) {
  // 1. Vérifier que c'est bien une requête POST (par exemple pour une commande/transaction)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    // Récupérer les données de la transaction envoyées par l'application
    const transactionData = req.body;

    // --- (Ici, vous mettez votre logique habituelle de traitement de paiement / base de données) ---

    // 2. Déclencher la notification Pushover en arrière-plan sans bloquer la réponse
    try {
      fetch("https://api.pushover.net/1/messages.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: "a68ythu2stdmjesyisxh43aw28hns3",
          user: "ukj9pvqehim38q2zuswvrnsnvh7d9t",
          message: "Nouvelle transaction MaKbine reçue avec succès !",
          title: "MaKbine Paiement",
          url: "https://ma-kbine.vercel.app/",
          sound: "cashregister",
          priority: 1
        })
      }).catch(err => console.error("Erreur Pushover en arrière-plan:", err));
    } catch (pushErr) {
      console.error("Erreur lors du déclenchement de Pushover:", pushErr);
    }

    // 3. Renvoyer immédiatement la réponse de succès au client pour éviter le timeout
    return res.status(200).json({ 
      success: true, 
      message: "Transaction traitée avec succès" 
    });

  } catch (error) {
    console.error("Erreur serveur:", error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
}
