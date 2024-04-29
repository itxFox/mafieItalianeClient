// Funzione per ottenere i parametri dall'URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Ottieni il nome della mafia dalla query string dell'URL
let mafiaNome = getUrlParameter('mafiaNome');
// Esegui azioni con il nome della mafia
console.log('Nome della mafia:', mafiaNome);

// Ottieni i dati dalla sessionStorage
let mafie = JSON.parse(sessionStorage.getItem('mafie'));
let dettagli = JSON.parse(sessionStorage.getItem('dettagli'));
let attentati = JSON.parse(sessionStorage.getItem('attentati'));

// Ora puoi utilizzare mafie, dettagli e attentati come desideri
console.log(mafie);
console.log(dettagli);
console.log(attentati);

// Definisci la funzione per trovare il logo, la descrizione approfondita e le immagini corrispondenti al nome della mafia
function findDetailsByMafiaName(mafie, dettagli, mafiaNome) {
    for (let id in mafie) {
        if (mafie.hasOwnProperty(id)) {
            if (mafie[id].nome === mafiaNome) {
                let mafiaDetails = {
                    logo: mafie[id].logo,
                    descrizione_approfondita: dettagli[mafie[id].id].descrizione_approfondita,
                    immagini: dettagli[mafie[id].id].immagini
                };
                return mafiaDetails;
            }
        }
    }
    return null; // Restituisci null se il nome della mafia non è stato trovato
}

// Utilizza la funzione per trovare il logo, la descrizione approfondita e le immagini della mafia
let mafiaDetails = findDetailsByMafiaName(mafie, dettagli, mafiaNome);
console.log("Dettagli della mafia:", mafiaDetails);

// Ora puoi utilizzare i dettagli come desideri
if (mafiaDetails) {
    let img = document.createElement('img');
    img.className = "h-80 rounded-full";
    img.src = mafiaDetails.logo;
    document.getElementById('logoMafia').appendChild(img);

    // Aggiungi un evento click all'immagine del logo mafia
    img.addEventListener('click', function() {
        // Naviga alla pagina index.html
        window.location.href = 'index.html';
    });

    let descrizione = document.getElementById('storiaMafia');
    descrizione.innerText = mafiaDetails.descrizione_approfondita;

    // Assicurati che 'immagini' sia un array prima di procedere
    if (Array.isArray(mafiaDetails.immagini)) {
        let immaginiMafia = document.getElementById('immaginiMafia');

        mafiaDetails.immagini.forEach(function (immagineSrc) {
            let img = document.createElement('img');
            img.className = "m-4 w-96"; 
            img.src = immagineSrc;
            immaginiMafia.appendChild(img);
            immaginiMafia.innerHTML += "<br><br>";
        });
    }
}




