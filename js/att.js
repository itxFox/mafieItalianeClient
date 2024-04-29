// Definisci la funzione per ottenere i parametri dall'URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function findDetailsByAttentatoId(attentati, mafie, dettagli, attentatoId) {
    console.log('Attentati:', attentati);
    console.log('Mafie:', mafie);
    console.log('Dettagli:', dettagli);

    // Conta il numero di proprietà nell'oggetto attentati
    let numAttentati = Object.keys(attentati).length;
    console.log("lung att: " + numAttentati);

    // Itera attraverso le proprietà dell'oggetto attentati
    for (let key in attentati) {
        if (attentati.hasOwnProperty(key)) {
            let attentato = attentati[key];
            if (attentato.id === parseInt(attentatoId)) {
                console.log('Attentato trovato:', attentato);

                // Trova l'ID della mafia corrispondente all'attentato
                let mafiaId = null;
                for (let dettaglio in dettagli) {

                    if (dettagli.hasOwnProperty(dettaglio)) {

                        if (dettagli[dettaglio].attentati[0] === attentato.id || dettagli[dettaglio].attentati[1] === attentato.id) {
                            
                            mafiaId = dettagli[dettaglio].id;
                            break;
                        }
                    }
                }
                console.log('Mafia ID:', mafiaId);

                // Trova la mafia corrispondente all'ID trovato
                if (mafiaId) {
                    let mafia = null;
                    // Itera attraverso le proprietà dell'oggetto mafie
                    for (let mafiaKey in mafie) {
                        if (mafie.hasOwnProperty(mafiaKey)) {
                            if (mafie[mafiaKey].id === mafiaId) {
                                mafia = mafie[mafiaKey];
                                break;
                            }
                        }
                    }
                    console.log('Mafia trovata:', mafia);

                    if (mafia) {
                        return {
                            mafiaLogo: mafia.logo,
                            nomeAtteanto: attentato.nome_attentato,
                            descrizioneAttentato: attentato.descrizione,
                            immagineAttentato: attentato.immagine
                        };
                    }
                }
            }
        }
    }
    return null;
}





let attentatoId = getUrlParameter('attentatoId');  //l'attentato cliccato ha id= 1
console.log('ID Attentato:', attentatoId);
// Ottieni i dati dalla sessionStorage e li ottengo tutti
let mafie = JSON.parse(sessionStorage.getItem('mafie'));
let dettagli = JSON.parse(sessionStorage.getItem('dettagli'));
let attentati = JSON.parse(sessionStorage.getItem('attentati'));

// Trova i dettagli dell'attentato
let attentatoDetails = findDetailsByAttentatoId(attentati, mafie, dettagli, attentatoId);
console.log('Dettagli Attentato:', attentatoDetails);

// Ora puoi utilizzare i dettagli come desideri
if (attentatoDetails) {
    let mafiaLogo = document.getElementById('mafiaLogo');
    let img = document.createElement('img');
    img.className = "h-80 rounded-full";
    img.src = attentatoDetails.mafiaLogo;
    mafiaLogo.appendChild(img);

    // Aggiungi un evento click all'immagine del logo
    img.addEventListener('click', function() {
        // Naviga alla pagina index.html
        window.location.href = 'index.html';
    });

    document.getElementById('titoloAttentato').innerText = attentatoDetails.nomeAtteanto;

    let descrizioneAttentato = document.getElementById('descAttentato');
    let p = document.createElement('p');
    p.className = "text-white text-justify text-lg p-4";
    p.innerText = attentatoDetails.descrizioneAttentato;
    descrizioneAttentato.appendChild(p);

    let immagineAttentato = document.createElement('img');
    immagineAttentato.className = "m-4 w-full";
    immagineAttentato.src = attentatoDetails.immagineAttentato;
    document.getElementById('imgAttentato').appendChild(immagineAttentato);
}

