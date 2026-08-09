import React, { useState } from 'react';

function App() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (e) => {
    const val = e.target.value;
    setAmount(val);
    // Calcul des 7%
    const base = parseFloat(val) || 0;
    setTotal(base + (base * 0.07));
  };

  const handleTransaction = async () => {
    if (!phone || !total) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/transacter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, total })
      });

      const data = await response.json();
      if (data.success) {
        alert("Transaction validée et notification envoyée sur Telegram !");
        setPhone('');
        setAmount('');
        setTotal(0);
      } else {
        alert("Erreur lors de la transaction : " + (data.error || "Inconnue"));
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      alert("Erreur de connexion avec le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Transfert de Crédit</h1>
      
      <label>Numéro de téléphone :</label>
      <input 
        type="text" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        placeholder="07xxxxxxxx" 
        style={{ display: 'block', margin: '10px 0', width: '100%', padding: '10px' }}
      />

      <label>Montant (FCFA) :</label>
      <input 
        type="number" 
        value={amount} 
        onChange={handleAmountChange} 
        placeholder="Ex: 1000" 
        style={{ display: 'block', margin: '10px 0', width: '100%', padding: '10px' }}
      />

      <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0' }}>
        <strong>Total à payer (avec 7% de frais) : {total} FCFA</strong>
      </div>

      <button 
        onClick={handleTransaction}
        disabled={loading}
        style={{ marginTop: '20px', width: '100%', padding: '15px', background: '#1E3A8A', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        {loading ? "Envoi en cours..." : "Valider la transaction"}
      </button>
    </div>
  );
}

export default App;
