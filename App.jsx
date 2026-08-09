import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configuration Supabase avec vos identifiants
const supabaseUrl = 'https://vxaqlbaqfpxitbdimeqj.supabase.co';
const supabaseKey = 'sb_publishable_otC4yztme4tqkL9BA8FM5Q_APYQrtGg';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fonction pour tester l'enregistrement d'une transaction
  const handleTestTransaction = async () => {
    setLoading(true);
    setMessage('');

    const nouvelleTransaction = {
      id: 'tx_' + Date.now(), // ID unique basé sur le temps
      service: 'MaKbine Test',
      package_name: 'Forfait Test',
      phone: '0700000000',
      total: 500,
      date: new Date().toISOString(),
      status: 'En attente'
    };

    const { data, error } = await supabase
      .from('transactions')
      .insert([nouvelleTransaction]);

    setLoading(false);

    if (error) {
      console.error('Erreur:', error);
      setMessage('Erreur lors de l\'enregistrement ❌');
    } else {
      setMessage('Transaction enregistrée avec succès dans Supabase ! ✅');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', margin: 'auto' }}>
      <h2>MaKbine - Test Base de données</h2>
      <p>Votre application est connectée à Supabase.</p>
      
      <button 
        onClick={handleTestTransaction}
        disabled={loading}
        style={{ padding: '10px 20px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        {loading ? 'Enregistrement...' : 'Tester une transaction'}
      </button>

      {message && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}
