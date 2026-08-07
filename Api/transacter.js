let pendingTransactions = [];

export default function handler(req, res) {
  // En-têtes CORS pour autoriser les requêtes depuis ton site web Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gestion des requêtes de pré-vérification (CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST : Reçoit une nouvelle transaction envoyée par le site web
  if (req.method === 'POST') {
    const transaction = req.body;
    
    // Vérification basique des données reçues
    if (!transaction || !transaction.phone || !transaction.total) {
      return res.status(400).json({ message: "Données de transaction incomplètes." });
    }

    transaction.id = Date.now();
    transaction.status = 'PENDING';
    pendingTransactions.push(transaction);

    console.log("Nouvelle transaction enregistrée :", transaction);
    return res.status(200).json({ 
      message: "Transaction enregistrée avec succès", 
      id: transaction.id 
    });
  }

  // GET : Permet à ton téléphone Android (passerelle) de récupérer les transactions en attente
  if (req.method === 'GET') {
    const tasks = pendingTransactions.filter(t => t.status === 'PENDING');
    
    // Marquer ces transactions comme en cours de traitement pour éviter qu'elles ne soient prises en double
    tasks.forEach(t => {
      t.status = 'PROCESSING';
    });

    return res.status(200).json(tasks);
  }

  // Si une autre méthode HTTP est utilisée
  res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
  return.status(405).json({ message: `Méthode ${req.method} non autorisée` });
}
