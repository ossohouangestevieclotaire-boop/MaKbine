// Stockage temporaire en mémoire (ou à relier à une base de données)
let transactionsQueue = [];

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { phone, total, paymentMethod } = req.body;
        const newTransaction = {
            id: Date.now().toString(),
            phone,
            total,
            paymentMethod,
            createdAt: new Date()
        };
        
        // On ajoute la transaction en file d'attente
        transactionsQueue.unshift(newTransaction);
        return res.status(200).json({ success: true, id: newTransaction.id });
    } 
    
    else if (req.method === 'GET') {
        // HTTP Shortcuts vient récupérer la liste des transactions en attente
        const currentTransactions = [...transactionsQueue];
        // Optionnel : vider la file après récupération pour éviter les doublons
        transactionsQueue = []; 
        return res.status(200).json(currentTransactions);
    }
}
