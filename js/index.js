let endpoint = 'https://mafieitaliane.onrender.com';
let mafie = {};
let dettagli = {};
let attentati = {};

// Le funzioni per ottenere i dati
function getMafie() {
    return fetch(endpoint + '/mafie')
        .then(response => response.json())
        .then(data => {
            data.forEach(mafia => {
                mafie[mafia.id] = {
                    "id": parseInt(mafia.id),
                    "nome": mafia.nome,
                    "logo": mafia.logo
                };
            });
        });
}

function getDettagli() {
    return fetch(endpoint + '/dettagli')
        .then(response => response.json())
        .then(data => {
            data.forEach(dettaglio => {
                dettagli[dettaglio.id] = {
                    "id": parseInt(dettaglio.id),
                    "luogo": dettaglio.luogo,
                    "descrizione_breve": dettaglio.descrizione_breve,
                    "descrizione_approfondita": dettaglio.descrizione_approfondita,
                    "immagini": dettaglio.immagini,
                    "persone": dettaglio.persone,
                    "attentati": dettaglio.attentati
                };
            });
        });
}

function getAttentati() {
    return fetch(endpoint + '/attentati')
        .then(response => response.json())
        .then(data => {
            data.forEach(attentato => {
                attentati[attentato.id] = {
                    "id": parseInt(attentato.id),
                    "luogo": attentato.luogo,
                    "data": attentato.data,
                    "ora": attentato.ora,
                    "nome_attentato": attentato.nome_attentato,
                    "descrizione": attentato.descrizione,
                    "immagine": attentato.immagine,
                };
            });
        });
}

// Promise che verrà eseguita quando le 3 funzioni avranno restituito un risultato
Promise.all([getMafie(), getDettagli(), getAttentati()])
    .then(() => {
        // Dopo che i dati sono stati caricati, puoi fare qualcosa con essi
        sessionStorage.setItem('mafie', JSON.stringify(mafie));
        sessionStorage.setItem('dettagli', JSON.stringify(dettagli));
        sessionStorage.setItem('attentati', JSON.stringify(attentati));
        createCardMafie();
        createCarousel();
    });


// Funzione per creare le card delle mafie
function createCardMafie() {
    let cardMafie = document.getElementById('cardMafie');

    for (let id in mafie) {
        let mafia = mafie[id];

        let cardContainer = document.createElement('div');
        cardContainer.className = ' inline-block m-20 border border-black rounded-md'; // Aumenta l'altezza e la larghezza del contenitore della card
        cardMafie.appendChild(cardContainer);

        let card = document.createElement('div');
        card.className = "w-48 h-56border border-black rounded-md";
        cardContainer.appendChild(card);

        let imgContainer = document.createElement('div');
        imgContainer.className = 'w-full h-40 overflow-hidden'; // Aumenta l'altezza del contenitore dell'immagine
        card.appendChild(imgContainer);

        let img = document.createElement('img');
        img.className = 'object-cover w-48 h-44 rounded-t-md';
        img.src = mafia.logo;
        imgContainer.appendChild(img);

        let divOrganizzazione = document.createElement('div');
        divOrganizzazione.className = "pb-5 border-t border-black text-center bg-stone-900 text-white";
        card.appendChild(divOrganizzazione);

        let nomeOrganizzazione = document.createElement('h6');
        nomeOrganizzazione.className = "mb-3 text-xl";
        nomeOrganizzazione.innerText = mafia.nome;
        divOrganizzazione.appendChild(nomeOrganizzazione);

        let divScopriDiPiu = document.createElement('div');
        divScopriDiPiu.className = "bg-red-700 w-fit p-1 mx-auto text-lg text-black rounded";
        divScopriDiPiu.innerHTML = '<button class="scopri-di-piu">SCOPRI DI PIU</button>'; // Aggiungi un identificatore per il link
        divOrganizzazione.appendChild(divScopriDiPiu);

        // Aggiungi un gestore di eventi onclick per ottenere il nome della mafia quando si clicca su "SCOPRI DI PIU"
        divScopriDiPiu.querySelector('button').onclick = function (event) {
            event.preventDefault(); // Previeni il comportamento predefinito del link
            readAboutMafia(mafia.nome); // Passa il nome della mafia alla funzione readAboutMafia()
        };
    }
}

function readAboutMafia(mafiaNome) {
    window.nomeMafia = mafiaNome;
    console.log("Hai cliccato su:", window.nomeMafia);
    // Reindirizza alla pagina org.html con il parametro della query string 'mafiaNome'
    window.location.href = "org.html?mafiaNome=" + encodeURIComponent(mafiaNome);
}



function createCarousel() {
    let carousel = document.getElementById('carousel');

    for (let id in attentati) {
        let attentato = attentati[id];


        let contenitoreItem = document.createElement('div');
        contenitoreItem.className = "duration-700 ease-in-out flex items-center justify-center m-6";
        contenitoreItem.setAttribute('data-carousel-item', '');
        carousel.appendChild(contenitoreItem);

        let item = document.createElement('div');
        item.className = "w-72";
        contenitoreItem.appendChild(item);

        let bordoCard = document.createElement('div');
        bordoCard.className = "border border-black rounded-md";
        item.appendChild(bordoCard);

        // Verifica se attentato.immagine è definito prima di usarlo
        if (attentato.immagine) {
            let img = document.createElement('img');
            img.className = "w-full h-52 rounded-t-md";
            img.src = attentato.immagine;
            bordoCard.appendChild(img);
        }

        let divTitoloAttentato = document.createElement('div');
        divTitoloAttentato.className = "pb-3 border-t border-black text-center bg-stone-900 text-white";
        bordoCard.appendChild(divTitoloAttentato);

        // Aggiungi virgolette intorno a 'h6'
        let titoloAttentato = document.createElement('h6');
        titoloAttentato.className = "mb-3 text-2xl";
        titoloAttentato.innerText = attentato.nome_attentato;
        divTitoloAttentato.appendChild(titoloAttentato);

        let leggiArticolo = document.createElement('div');
        leggiArticolo.className = "bg-red-700 w-fit p-1 mx-auto text-lg text-black rounded";
        leggiArticolo.innerHTML = '<button>LEGGI ARTICOLO</button>';
        divTitoloAttentato.appendChild(leggiArticolo);

        // Aggiungi un gestore di eventi onclick per ottenere il nome della mafia quando si clicca su "SCOPRI DI PIU"
        divTitoloAttentato.querySelector('button').onclick = function (event) {
            event.preventDefault(); // Previeni il comportamento predefinito del link
            readAboutArticle(attentato.id); // Passa il nome della mafia alla funzione readAboutMafia()
        };
    }
}


function readAboutArticle(attentatoId) {
    window.idAttentato = attentatoId;
    console.log("Hai cliccato su:", window.idAttentato);
    // Reindirizza alla pagina org.html con il parametro della query string 'mafiaNome'
    window.location.href = "att.html?attentatoId=" + encodeURIComponent(attentatoId);
}

