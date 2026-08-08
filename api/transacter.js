    function validerTransactionFinale(event) {
        if (event) event.preventDefault();

        const phone = document.getElementById('dest-phone').value.trim();
        const amount = document.getElementById('amount').value.trim();
        const transactionId = "TX-" + Date.now();

        const payload = {
            id: transactionId,
            service: currentService,
            phone: phone,
            montant: amount + " FCFA",
            paymentMethod: "Wave"
        };

        // Envoi non bloquant via fetch (sans await) pour éviter tout timeout sur l'interface
        fetch('/api/transacter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(err => console.log("Erreur silencieuse API :", err));

        // Redirection immédiate et propre vers Wave
        window.location.href = waveLink;
    }
