// api/transacter.js
// Cette API reçoit les transactions du site et les donne au téléphone

let pendingTransactions = [];

export default function handler(req, res) {
  // Autoriser la communication avec ton site
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Si le site envoie une commande (POST)
  if (req.method === 'POST') {
    const transaction = req.body;
    transaction.id = Date.now();
    transaction.status = 'PENDING';
    pendingTransactions.push(transaction);
    return res.status(200).json({ message: "Transaction enregistrée", id: transaction.id });
  }

  // Si ton téléphone vient chercher les commandes (GET)
  if (req.method === 'GET') {
    const tasks = pendingTransactions.filter(t => t.status === 'PENDING');
    tasks.forEach(t => t.status = 'PROCESSING');
    return res.status(200).json(tasks);
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}
