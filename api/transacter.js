    function validerTransactionFinale(event) {
        if (event) event.preventDefault();

        const phone = document.getElementById('dest-phone').value.trim();
        const amount = document.getElementById('amount').value.trim();
        
        // On construit l'URL de votre serveur qui va traiter la notif ET rediriger
        // On passe les données dans l'URL pour être sûr qu'elles arrivent
        const urlTraitement = `/api/transacter_v2?phone=${phone}&montant=${amount}&service=${encodeURIComponent(currentService)}`;

        // On envoie le client vers ce script sur VOTRE serveur
        // C'est votre serveur qui fera la redirection finale vers Wave
        window.location.href = urlTraitement;
    }
