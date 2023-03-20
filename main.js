let tracks = [
    {'url': './audio/song-1.mp3', 'cover' : './img/cover/cover-1.jpg', 'artist': 'Sconosciuto0', 'title': 'Non si sa0'},
    {'url': './audio/song-2.mp3', 'cover' : './img/cover/cover-1.jpg', 'artist': 'Sconosciuto9', 'title': 'Non si sa9'},
    {'url': './audio/song-3.mp3', 'cover' : './img/cover/cover-1.jpg', 'artist': 'Sconosciuto8', 'title': 'Non si sa8'},
];

// Catturare la COLONNA 2
let wrapper = document.querySelector('#wrapper');

// inizializziamo una variabile counter per il progresso dell'indice
//del mio array
let counterTrack = 0

// Inizializzare il file Audio (oggetto), poichè dovremo ricrearlo
// ogni volta che cambieremo il brano, altrimenti perdiamo il riferimento
let audio = null;

// Funzione per creare la sezione AUDIO-COVER
function createCover(array) {
    // Ripulire la sezione
    wrapper.innerHTML = '';

    let div = document.createElement('div');
    //applichiamo le classi
    div.classList.add('col-12', 'col-md-3');
    //riempiamo
    div.innerHTML = `
    <!-- image cover -->
    <img class="img-cover" src="${array[counterTrack].cover}" alt="">
    
    <!-- File Audio -->
    <audio preload="meta">
        <source src="${array[counterTrack].url}" type="audio/mpeg">
    </audio>`;
    wrapper.appendChild(div);

    // Catturiamo file Audio
    audio = document.querySelector('audio');
}

// Funzione per creare la sezione INFO del brano
function createInfoTrack(array) {
    let div = document.createElement('div');
    div.classList.add('col-12', 'col-md-5');

    div.innerHTML = `
    <h1>${array[counterTrack].title}</h1>
    <h2>${array[counterTrack].artist}</h2>
    
    <!-- progress BAR -->
    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width: 25%"></div>
    </div>

    <!-- Tempo inizio e fine -->
    <div class="d-flex justify-content-between">
        <p>0:00</p>
        <p>3:00</p>
    </div>

    <!-- sezione pulsanti AUDIO -->
    <div class="d-flex justify-content-between">
        <!-- Prev -->
        <button id="btnPrev" class="btn"><i class="fa-solid fa-backward fs-1"></i></button>
        <!-- Play -->
        <button id="btnPlay" class="btn"><i class="fa-solid fa-play fs-1"></i></button>
        <!-- Next -->
        <button id="btnNext" class="btn"><i class="fa-solid fa-forward fs-1"></i></button>
    </div>`;

    wrapper.appendChild(div);

    //Catturare i pulsanti
    let btnPrev = document.querySelector('#btnPrev');
    let btnPlay = document.querySelector('#btnPlay');
    let btnNext = document.querySelector('#btnNext');

    //gestione PLAY
    btnPlay.addEventListener('click', () =>{
        if (audio.paused) {
            audio.play();
            // btnPlay.innerHTML = '';
            btnPlay.innerHTML = '<i class="fa-solid fa-pause fs-1"></i>';
        } else {
            audio.pause();
            btnPlay.innerHTML = '<i class="fa-solid fa-play fs-1">';
        }
    })

    //Gestione NEXT
    btnNext.addEventListener('click', () =>{
        if(counterTrack < array.length - 1){
            //incrementiamo il contatore (nostro indice)
            counterTrack++;
        } else {
            counterTrack = 0;
        }
        
        //distruggiamo e ricreiamo le pagine
        createCover(array);
        createInfoTrack(array);
    })

    // Gestione PREV
    btnPrev.addEventListener('click', () =>{
        if(counterTrack > 0){
            //decrementiamo il contatore (nostro indice)
            counterTrack--;
        } else {
            counterTrack = array.length -1;
        }

        //distruggiamo e ricreiamo le pagine
        createCover(array);
        createInfoTrack(array);
    })
}

//invocare al caricamento della pagina:
//le funzioni appena create

createCover(tracks);
createInfoTrack(tracks);