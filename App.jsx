import React, { useState } from 'react';

// Configuration globale et token d'intégration MaKbine
const MAKBINE_CONFIG = {
  token: "a68ythu2stdmjesyisxh43aw28hns3",
  version: "2.0",
  operator: "Moov Côte d'Ivoire"
};

// Base de données complète des forfaits Moov intégrés
const moovOffersDatabase = {
  moovFoliePro: [
    { id: "pro_1", title: "12 Go + 200 min Tous Réseaux + Illimité 5 FAF", price: 2500, validity: "10 Jours" },
    { id: "pro_2", title: "18 Go + Illimité Tous Réseaux & 5 FAF", price: 3500, validity: "15 Jours" },
    { id: "pro_3", title: "60 Go + Illimité Tous Réseaux & 5 FAF", price: 15000, validity: "30 Jours" }
  ],
  moovFolieAppels: [
    { id: "app_1", title: "12 minutes Tous Réseaux", price: 150, validity: "1 Jour" },
    { id: "app_2", title: "20 minutes Tous Réseaux", price: 200, validity: "2 Jours" },
    { id: "app_3", title: "35 minutes Tous Réseaux + 5 Numéros FAF", price: 300, validity: "2 Jours" },
    { id: "app_4", title: "120 minutes Tous Réseaux + 5 Numéros FAF", price: 500, validity: "5 Jours" },
    { id: "app_5", title: "140 minutes Tous Réseaux + 5 Numéros FAF", price: 1000, validity: "10 Jours" },
    { id: "app_6", title: "210 minutes Tous Réseaux + 5 Numéros FAF", price: 1500, validity: "15 Jours" }
  ],
  izyMixPlus: [
    { id: "izy_1", title: "10 min + 15 Mo (+15 Mo bonus) + 30 SMS", price: 150, validity: "1 Jour" },
    { id: "izy_2", title: "17 min + 25 Mo (+25 Mo bonus) + 50 SMS", price: 200, validity: "2 Jours" },
    { id: "izy_3", title: "30 min + 100 Mo (+100 Mo bonus) + 5 Numéros Gratuits + 100 SMS", price: 300, validity: "2 Jours" },
    { id: "izy_4", title: "55 min + 300 Mo (+300 Mo bonus) + 5 Numéros Gratuits + 250 SMS", price: 500, validity: "5 Jours" },
    { id: "izy_5", title: "70 min + 700 Mo (+700 Mo bonus) + 350 SMS", price: 700, validity: "7 Jours" },
    { id: "izy_6", title: "100 min + 1 Go (+1 Go bonus) + 500 SMS + 5 Numéros Gratuits", price: 1000, validity: "10 Jours" },
    { id: "izy_7", title: "200 min + 1,5 Go (+1,5 Go bonus) + 5 Numéros Gratuits + 500 SMS", price: 1500, validity: "15 Jours" },
    { id: "izy_8", title: "250 min + 2,5 Go (+2,5 Go bonus) + 5 Numéros Gratuits + 500 SMS", price: 2500, validity: "30 Jours" },
    { id: "izy_9", title: "500 min + 5 Go (+5 Go bonus) + 5 Numéros Gratuits + 500 SMS", price: 5000, validity: "30 Jours" },
    { id: "izy_10", title: "830 min + 10 Go (+10 Go bonus) + 5 Numéros Gratuits + 500 SMS", price: 10000, validity: "30 Jours" },
    { id: "izy_11", title: "1660 min + 20 Go (+20 Go bonus) + 5 Numéros Gratuits + 1000 SMS", price: 20000, validity: "30 Jours" }
  ],
  forfaitsInternet: [
    { id: "net_1", title: "150 Mo (+150 Mo bonus)", price: 150, validity: "1 Jour" },
    { id: "net_2", title: "220 Mo (+220 Mo bonus)", price: 200, validity: "2 Jours" },
    { id: "net_3", title: "400 Mo (+400 Mo bonus)", price: 300, validity: "2 Jours" },
    { id: "net_4", title: "750 Mo (+750 Mo bonus)", price: 500, validity: "3 Jours" },
    { id: "net_5", title: "1 Go (+1 Go bonus)", price: 750, validity: "7 Jours" },
    { id: "net_6", title: "1,5 Go (+1,5 Go bonus)", price: 1000, validity: "10 Jours" },
    { id: "net_7", title: "2,5 Go (+2,5 Go bonus)", price: 1500, validity: "15 Jours" },
    { id: "net_8", title: "3 Go (+3 Go bonus)", price: 2000, validity: "30 Jours" },
    { id: "net_9", title: "7,4 Go (+7,4 Go bonus)", price: 4900, validity: "30 Jours" },
    { id: "net_10", title: "20 Go (+20 Go bonus)", price: 9900, validity: "30 Jours" },
    { id: "net_11", title: "30 Go (+30 Go bonus)", price: 14900, validity: "30 Jours" },
    { id: "net_12", title: "45 Go (+45 Go bonus)", price: 19900, validity: "30 Jours" },
    { id: "net_13", title: "150 Go (+150 Go bonus)", price: 24000, validity: "30 Jours" },
    { id: "net_14", title: "300 Go (+300 Go bonus)", price: 29000, validity: "30 Jours" },
    { id: "net_15", title: "400 Go (+400 Go bonus)", price: 39000, validity: "30 Jours" }
  ],
  forfaitsSpeciauxEtIllimites: [
    { id: "spec_1", title: "Nuit Soft (2 Go/4 Go V-S + 30 min + Illimité FAF)", price: 200, validity: "22h à 07h" },
    { id: "spec_2", title: "Réseaux Sociaux Jour (500 Mo FB/WA/Viber)", price: 200, validity: "1 Jour" },
    { id: "spec_3", title: "Forfait TikTok (1 Go/3 Go S-D)", price: 300, validity: "3 Jours" },
    { id: "spec_4", title: "1,5 Go (Bon plan)", price: 500, validity: "3 Jours" },
    { id: "spec_5", title: "4 Go (Bon plan)", price: 1000, validity: "7 Jours" },
    { id: "ill_1", title: "1 Heure illimitée", price: 300, validity: "1 heure" },
    { id: "ill_2", title: "2 Heures illimitées", price: 500, validity: "2 heures" },
    { id: "ill_3", title: "6 Heures illimitées", price: 1300, validity: "6 Heures" }
  ],
  gbesseEtMoov20Ans: [
    { id: "gbe_1", title: "120 min Tous Réseaux + Illimité 5 FAF (Gbêssê)", price: 500, validity: "5 Jours" },
    { id: "gbe_2", title: "55 min + 300 Mo + 5 Numéros Gratuits + 250 SMS (Gbêssê)", price: 500, validity: "5 Jours" },
    { id: "gbe_3", title: "1 Go + 1 Heure (Gbêssê)", price: 500, validity: "2 Jours" },
    { id: "gbe_4", title: "1,5 Go (Gbêssê)", price: 500, validity: "3 Jours" },
    { id: "moov20_1", title: "5 000 points (Forfait Point - Moov 20 ans)", price: 500, validity: "Jusqu'au 31 Octobre 2026" },
    { id: "moov20_2", title: "1,5 Go (Moov 20 ans)", price: 500, validity: "3 Jours" },
    { id: "moov20_3", title: "20 Go + 200 min + 200 SMS (Folie 20 ans)", price: 1000, validity: "2 Jours" }
  ]
};

function App() {
  const [phone, setPhone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('forfaitsInternet');
  const [selectedOfferId, setSelectedOfferId] = useState(moovOffersDatabase.forfaitsInternet[0].id);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');

  // Récupérer la liste des offres de la catégorie active
  const currentOffers = moovOffersDatabase[selectedCategory] || [];
  
  // Trouver l'objet offre sélectionné
  const currentOffer = currentOffers.find(o => o.id === selectedOfferId) || currentOffers[0];
  
  // Calcul du total avec les 7% de frais basés sur le prix du forfait choisi
  const basePrice = currentOffer ? currentOffer.price : 0;
  const total = basePrice + (basePrice * 0.07);

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    // Sélectionner automatiquement le premier forfait de la nouvelle catégorie
    if (moovOffersDatabase[cat] && moovOffersDatabase[cat].length > 0) {
      setSelectedOfferId(moovOffersDatabase[cat][0].id);
    }
  };

  const handleTransaction = async () => {
    if (!phone || !currentOffer) {
      alert("Veuillez remplir tous les champs correctement.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/transacter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone, 
          offer: currentOffer,
          total,
          token: MAKBINE_CONFIG.token
        })
      });

      const data = await response.json();
      if (data.success || response.ok) {
        const clientSummary = `
========================================
       MAKBINE - RÉCAPITULATIF CLIENT
========================================
Téléphone : ${phone}
----------------------------------------
Forfait Précis : ${currentOffer.title}
Validité      : ${currentOffer.validity}
Montant Brut  : ${currentOffer.price} FCFA
Total (+7%)   : ${total.toFixed(2)} FCFA
----------------------------------------
Statut        : Validé & Envoyé sur Telegram
========================================
        `.trim();

        setSummary(clientSummary);
        alert("Transaction validée, récapitulatif généré et notification transmise sur Telegram !");
        setPhone('');
      } else {
        alert("Erreur lors de la transaction : " + (data.error || "Inconnue"));
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      // Mode simulation visuelle si l'API backend n'est pas encore connectée
      const clientSummary = `
========================================
       MAKBINE - RÉCAPITULATIF CLIENT
========================================
Téléphone : ${phone}
----------------------------------------
Forfait Précis : ${currentOffer.title}
Validité      : ${currentOffer.validity}
Montant Brut  : ${currentOffer.price} FCFA
Total (+7%)   : ${total.toFixed(2)} FCFA
----------------------------------------
Statut        : Validé (Mode Simulation)
========================================
      `.trim();
      setSummary(clientSummary);
      alert("Récapitulatif généré avec succès !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '600px', margin: '0 auto' }}>
      <h1>MaKbine - Achat de Forfaits Moov</h1>
      
      <label>Numéro de téléphone :</label>
      <input 
        type="text" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        placeholder="07xxxxxxxx" 
        style={{ display: 'block', margin: '10px 0', width: '100%', padding: '10px', boxSizing: 'border-box' }}
      />

      <label>Catégorie de Forfait :</label>
      <select 
        value={selectedCategory} 
        onChange={handleCategoryChange}
        style={{ display: 'block', margin: '10px 0', width: '100%', padding: '10px', boxSizing: 'border-box' }}
      >
        <option value="forfaitsInternet">Forfaits Internet</option>
        <option value="moovFoliePro">Moov Folie Pro</option>
        <option value="moovFolieAppels">Moov Folie Appels</option>
        <option value="izyMixPlus">Forfaits Izy Mix Plus</option>
        <option value="forfaitsSpeciauxEtIllimites">Forfaits Spéciaux & Illimités</option>
        <option value="gbesseEtMoov20Ans">Gbêssê & Moov 20 ans</option>
      </select>

      <label>Forfait Précis :</label>
      <select 
        value={selectedOfferId} 
        onChange={(e) => setSelectedOfferId(e.target.value)}
        style={{ display: 'block', margin: '10px 0', width: '100%', padding: '10px', boxSizing: 'border-box' }}
      >
        {currentOffers.map((offer) => (
          <option key={offer.id} value={offer.id}>
            {offer.title} — {offer.price} FCFA ({offer.validity})
          </option>
        ))}
      </select>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '5px' }}>
        <strong>Forfait sélectionné :</strong> {currentOffer?.title}<br />
        <strong>Validité :</strong> {currentOffer?.validity}<br />
        <strong>Montant du forfait :</strong> {currentOffer?.price} FCFA<br />
        <strong style={{ color: '#1E3A8A' }}>Total à payer (avec 7% de frais) : {total.toFixed(2)} FCFA</strong>
      </div>

      <button 
        onClick={handleTransaction}
        disabled={loading}
        style={{ marginTop: '20px', width: '100%', padding: '15px', background: '#1E3A8A', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        {loading ? "Traitement en cours..." : "Valider la transaction & Notifier Telegram"}
      </button>

      {summary && (
        <pre style={{ marginTop: '20px', padding: '15px', background: '#222', color: '#0f0', borderRadius: '5px', whiteSpace: 'pre-wrap', fontSize: '14px' }}>
          {summary}
        </pre>
      )}
    </div>
  );
}

export default App;
