import React, { useState } from 'react';

function App() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);

  const handleAmountChange = (e) => {
    const val = e.target.value;
    setAmount(val);
    // Calcul des 7%
    const base = parseFloat(val) || 0;
    setTotal(base + (base * 0.07));
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
        style={{ marginTop: '20px', width: '100%', padding: '15px', background: '#1E3A8A', color: 'white', border: 'none' }}
        onClick={() => alert(`Envoi de ${total} FCFA vers ${phone}`)}
      >
        Valider la transaction
      </button>
    </div>
  );
}

export default App;

