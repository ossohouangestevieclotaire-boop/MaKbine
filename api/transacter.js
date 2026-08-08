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

        // Envoi ultra-rapide et garanti en arrière-plan sans bloquer la page ni provoquer de timeout
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon('/api/transacter', blob);

        // Redirection immédiate vers Wave
        window.location.href = waveLink;
    }
