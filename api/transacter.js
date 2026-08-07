let pendingTransactions = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const transaction = req.body;
    
    if (!transaction || !transaction.phone || !transaction.total) {
      return res.status(400).json({ message: "Données de transaction incomplètes." });
    }

    transaction.id = Date.now();
    transaction.status = 'PENDING';
    pendingTransactions.push(transaction);

    return res.status(200).json({ 
      message: "Transaction enregistrée avec succès", 
      id: transaction.id 
    });
  }

  if (req.method === 'GET') {
    const tasks = pendingTransactions.filter(t => t.status === 'PENDING');
    
    tasks.forEach(t => {
      t.status = 'PROCESSING';
    });

    return res.status(200).json(tasks);
  }

  res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
  return res.status(405).json({ message: `Méthode ${req.method} non autorisée` });
}
