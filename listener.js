import { createClient } from '@supabase/supabase-js';

// Vos identifiants Supabase configurés
const SUPABASE_URL = 'https://vxaslbaqfpxitbdimeqj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_otC4yztme4tqkL9BA8FM5Q_APYQrtGg'; // Vous pouvez aussi utiliser votre clé secrète si besoin

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

console.log("Écouteur de transactions démarré... En attente de nouvelles commandes 🚀");

// Abonnement au canal Realtime sur la table 'transactions'
const channels = supabase.channel('custom-insert-channel')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'transactions' },
    (payload) => {
      console.log('🚨 Nouvelle commande reçue en temps réel !');
      const nouvelleTransaction = payload.new;
      
      console.log(`- ID: ${nouvelleTransaction.id}`);
      console.log(`- Client: ${nouvelleTransaction.user_phone}`);
      console.log(`- Bénéficiaire: ${nouvelleTransaction.dest_phone}`);
      console.log(`- Service: ${nouvelleTransaction.service} (${nouvelleTransaction.package_name || 'N/A'})`);
      console.log(`- Total: ${nouvelleTransaction.total} FCFA`);
      console.log(`- Statut: ${nouvelleTransaction.status}`);
      
      executerTraitementAutomatique(nouvelleTransaction);
    }
  )
  .subscribe();

function executerTraitementAutomatique(tx) {
  if (tx.service === "Transfert d'unités") {
    console.log(`⚡ Action: Lancement du transfert USSD d'unités vers ${tx.dest_phone}`);
  } else {
    console.log(`⚡ Action: Lancement de l'achat du forfait ${tx.package_name} pour ${tx.dest_phone}`);
  }
}
