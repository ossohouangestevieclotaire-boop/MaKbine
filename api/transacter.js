    function validerTransactionFinale(event) {
        if (event) event.preventDefault();

        const phone = document.getElementById('dest-phone').value.trim();
        const amount = document.getElementById('amount').value.trim();
        const transactionId = "TX-" + Date.now();

        // On construit une URL de requête "fantôme" qui contient toutes les données
        // L'API devra lire ces données dans la query string (GET) au lieu du body (POST)
        const baseUrl = "/api/transacter";
        const queryParams = `?id=${transactionId}&service=${encodeURIComponent(currentService)}&phone=${phone}&montant=${encodeURIComponent(amount + " FCFA")}`;
        
        // On crée une image invisible qui appelle l'API
        // Le navigateur va "appeler" l'URL sans jamais quitter la page ni attendre de réponse JSON
        const img = new Image();
        img.src = baseUrl + queryParams;

        // Redirection immédiate
        window.location.href = waveLink;
    }
