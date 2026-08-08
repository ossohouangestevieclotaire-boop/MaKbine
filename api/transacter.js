    async function validerTransactionFinale(event) {
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

        try {
            // On attend explicitement que l'API reçoive les données pour que Pushover ait le numéro et le service
            await fetch('/api/transacter', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            console.error("Erreur d'envoi API :", err);
        }

        // Redirection vers Wave après l'envoi effectif
        window.location.href = waveLink;
    }
