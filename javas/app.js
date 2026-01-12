// --- IMPORTS FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// --- CONFIGURACIÓN FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyClsm9dQXvGHazTFISxrU0NLcqhNxXvCls",
  authDomain: "monkey-awards.firebaseapp.com",
  projectId: "monkey-awards",
  storageBucket: "monkey-awards-firebasestorage.app",
  messagingSenderId: "247832993400",
  appId: "1:247832993400:web:c134b1ae66aefb14d2978d",
  measurementId: "G-BZ8HY4C03Z"
};

let db = null;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (err) {
  console.error("Error inicializando Firebase:", err);
}

// --- CATEGORÍAS ---
const categories = [
  { name: "JUNTADA DEL AÑO", options: [
    {text: "Cumple de agus (agus)", foto:"fotos/Juntadas/juntada1.jpeg"},
    {text:"casa de bruno (escondidas turbias)", foto:"fotos/Juntadas/juntada2.jpeg"},
    {text:"casa de fafa (caipirinha)", foto:"fotos/Juntadas/juntada3.jfif"}, 
    {text:"Monkey Awards 2024 (posho)", foto:"fotos/Juntadas/juntada4.jfif"},
    {text:"casa de bruno 2 (maquina de cortar pelo)", foto:"fotos/Juntadas/juntada5.jfif"},
    {text:"cumple del paisa (paisa)", foto:"fotos/Juntadas/juntada6.jfif"},
    {text:"cumple de bruno (bruno)", foto:"fotos/Juntadas/juntada7.jfif"}
  ] 
  },
  { name: "CLIP DEL AÑO", options: [
      { text: "Soy yo, soy yo (juani)", video: "clips/clip1.mp4" },
      { text: "no chau, cague (bruno)", video: "clips/clip2.mp4" },
      { text: "thunderbolt (fafa)", video: "clips/clip3.mp4" },
      { text: "monardo (maxi)", video: "clips/clip4.mp4" },
      { text: "un triciclo (agus)", video: "clips/clip5.mp4" },
      { text: "pendejo hdp (agus)", video: "clips/clip6.mp4" },
      { text: "empezamos bien (maxi)", video: "clips/clip7.mp4" },
      { text: "me metieron un palazo (fafa)", video: "clips/clip8.mp4" }
    ] 
  },
  {   name: "FOTO DEL AÑO",
  options: [
    { text: "Previa pinar (agus, posho y fafa)", foto: "fotos/Fotos/foto1.jfif" },
    { text: "fafa en el baño (bruno)", foto: "fotos/Fotos/foto2.jfif" },
    { text: "iago aspas ahmud (jungle sin agus y maxi)", foto: "fotos/Fotos/foto3.jpeg" },
    { text: "triangular (posho)", foto: "fotos/Fotos/foto4.jpeg" },
    { text: "almorzando (paisa y fafa)", foto: "fotos/Fotos/foto5.jpeg" },
    { text: "soy profe (bruno, fafa y juani)", foto: "fotos/Fotos/foto6.jpeg" },
    { text: "posho silenciado (posho y paisa)", foto: "fotos/Fotos/foto7.jpeg" },
    { text: "lengua nazi (fafa)", foto: "fotos/Fotos/foto8.jfif" },
    { text: "escoliosis (juani)", foto: "fotos/Fotos/foto9.jfif" },
    { text: "cute (paisa y agus)", foto: "fotos/Fotos/foto10.jpeg" },
    { text: "chiquito (agus)", foto: "fotos/Fotos/foto10.jfif" }
  ]
  },
  { name: "FAIL DEL AÑO", options: [
    { text: "fafa se olvida la entrada (fafa)", foto: "fotos/Fail/fail1.jpeg" },
    { text: "caida de jarra en cumple de agus (bruno)", foto: "fotos/Fail/fail2.jfif" },
    { text: "corte de pelo al posho (agus)", foto: "fotos/Fail/fail3.jfif" },
    { text: "juani errando la tortilla (juani)", foto: "fotos/Fail/fail4.jpeg" },
    { text: "pegarle las hojas a fafa (maxi)", foto: "fotos/Fail/fail5.jpeg" },
    { text: "mono comer banana y deleitarse (fafa)", foto: "fotos/Fail/fail6.jpg" },
    { text: "agus quebrando en JLL (agus)", foto: "fotos/Fail/fail7.jfif" }
  ] 
  },
  { name: "MONADA DEL AÑO", options: [
    { text: "Nafta a maxi (fafa)", foto: "fotos/Monadas/monada1.jfif" },
    { text: "espalda escrita de fafa (juani)", foto: "fotos/Monadas/monada2.jfif" },
    { text: "fafa con remera rota en AUD (bruno)", foto: "fotos/Monadas/monada3.jfif" },
    { text: "cascotes en mochila (posho)", foto: "fotos/Monadas/monada4.jpeg" },
    { text: "Alfajor en la remera de fafa (paisa)", foto: "fotos/Monadas/monada5.jfif" },
    {text: "Agus encintado (agus)", foto: "fotos/Monadas/monada6.jpeg"},
    {text: "mesa llena de tinta (fafa y bruno)", foto: "fotos/Monadas/monada7.jpeg"},
  ] 
  },
  { name: "CANCION DEL AÑO", options: [
      { text: "BIGOTE", audio: "canciones/BigoteDTR.mp3", letra: "Cantando en la calle Ercilla\nUn estudiante en Buenos Aires\nDescubrí que la vida\nEs un juego de azar, donde pierde el que gana\n\nPor equipaje una mochila\nUna carpeta y unas hojas del posho\nFue aquella tarde del jueves\nQue el bigote con jeanes, pelaba la verga\n\nLa complací con Rabo de Nube\nCorrespondió poniendo en el sombrero\nUna propina en australes\nCon la misma que al rato la invitaría un café\n\nLa hoja seguia en blanco\ncorrespondio mirandome feo\ncinco preguntas mortales\nlas mismas veces que el culo le entreguéeeee\n\ncomo olvidarme de marco\naquel bigote de la secundaria uuuoooooo eeeeeee\n\nsi me dejo un par de huellas\nen el culo y en la bija uuuoooooo\n\nComo olvidarme (...) de marcooooo\n\nMe fui de canchero en halagos\nMe fumigó con la mirada y me dijo\nPibe tendrás que cuidarte\nYo le dije: ¿De qué?\nEl me dijo: De mi\n\nUn taxi nos esperaba en la esquina\nSin preguntar me llevo a un sitio de strippers\nLe pregunté: ¿estás seguro?\nEl me dijo: Boludo aquí también laburooooooo\n\nEstuve en taller y en El aula\nmientras marco se relame el bigoteee\nToda belleza fue poca\nDespués de ver a bigote pelando la chotaaaaaaa\n\ncomo olvidarme de marco\naquel bigote de la secundaria uuuoooooo eeeeeee\n\nsi me dejo un par de huellas\nen el culo y en la bija uuuoooooo\n\nComo olvidarme (...) de marcooooo\n" },
      { text: "NAFTA", audio: "canciones/NAFTA.mp3", letra: "Entro al aula\n y siento un olor extrañoooo.\n ¿Que sera, que podra ser?\n abro lentamente mi mochila....\n\n !Quien fue!\n !Quien lo hizo!\n Mi mochila....\n tiene naftaaaaaaaaaa.\n\n !El olor, ... me esta matandoooo!\n voy a matar a alguien,\n quien tiro nafta en mi mochila\n mi cartuchera y mis utiles\n\n En el aula\n Se preguntan\n ¿Quien podra haber sido?\n los directores pasando\n !!!y yo cagado en las pataaaaas!!!\n\n Nafta en mi mochilaaaaaa\n fafa la concha de tu madre(NAFTA!)\n mis utiles estan podridos \n ahora de que mierda laburo.(NAFTA)\n\n\n Todos me hechan la culpa y yo no se que hacer\n me quiero tirar de un tercer piso\n para desapareceeeeeeer!!!!!\n\n !Ya me canseeee!\n ahora en mas no laburo\n mi año escolar termina aca\n fafa te voy a culear\n\n!Nafta nafta y nafta por todos lados!!\n\n fafa la concha de tu madre(NAFTA!) mis utiles estan podridos\n ahora de que mierda laburooooo.(NAFTA)\n\n Ahora... fafa lo voy a descuartizar!!\n aunque solo huela\n\n !NAFTAAAAAAAAAA!\n" },
      { text: "NARIGON", audio: "canciones/NARIGON.wav", letra: "Dicen que Fafa anda raro, que no es el mismo campeón,\n en el cole se lo ve mirando a Juani con pasión.\n Le dicen Fafín, Fafita, Bastián o El Father,\n pero cuando pasa Juani se pone rojo, se le cae el carácter.\n Papín camina lento, no pierde la dirección,\n con esa nariz gigante, todos dicen “¡narigón!”.\n Él sonríe, no lo niega, porque sabe que es razón,\n pero lo que guarda adentro es un secreto en explosión.\n\n En su pecho late fuerte, ya no quiere represión,\n no es mentira ni chiste, no es juego ni canción,\n sus ojos se fugan a Juani, sin pedirle perdón,\n porque a Fafa le gustan los hombres… lo grita su corazón.\n\n Narigón, narigón, Fafa quiere confesión,\n que no es fase ni capricho, es pura convicción.\n Narigón, narigón, ya no quiere más presión,\n se besó con un pibe en el boliche… y fue su liberación.\n\n Fue en el boliche esa noche, luces y respiración,\n entre risas con amigos, se cruzó una tentación.\n Ese chico lo miró, le tocó la mano, una conexión,\n y sin pensarlo demasiado, se comieron sin fricción.\n Se habló en todo el grupo, mil versiones, confusión,\n “Fafa está perdido”, dijeron… sin tener comprensión.\n Pero él sintió por dentro que era puro corazón,\n como cuando ve a Juani… la misma sensación.\n\n “¿Cómo digo que me gusta? ¿Cómo afronto la ocasión?”\n se pregunta Fafita, Bastián, Papín, El Father… el narigón.\n “¿Qué dirán mis colegas? ¿Qué dirá mi generación?”\n pero cuando Juani sonríe se le escapa la emoción.\n\n Narigón, narigón, Fafa quiere confesión,\n que no es fase ni capricho, es pura convicción.\n Narigón, narigón, ya no quiere más presión,\n se besó con un pibe en el boliche… y fue su liberación.\n\n Fafa mira al espejo y dice: “esta es mi verdad”,\n no importa el apodo, ni lo que digan detrás.\n Un narigón valiente, listo para declarar:\n le gustan los hombres… y a Juani lo quiere amar." },
    ]
  },
  { name: "MEJOR MONO EN LA ESCUELA", options:[
    { text: "BRUNO", foto: "fotos/monos/bruno.jpeg" },
    { text: "MAXI", foto: "fotos/monos/maxi.jpeg" },
    { text: "AGUS", foto: "fotos/monos/tito.jpeg" },
    { text: "ABUELO", foto: "fotos/monos/abuelo.jpeg" },
    { text: "FAFA", foto: "fotos/monos/fafa.jfif" },
    { text: "POSHO", foto: "fotos/monos/posho.jfif" },
    { text: "PAISA", foto: "fotos/monos/paisa.jfif" },
    { text: "JUANI", foto: "fotos/monos/juani.jfif" }
  
  ] 
  },
  { name: "MEJOR MONO FUERA DEL COLE", options:[
    { text: "BRUNO", foto: "fotos/monos/bruno.jpeg" },
    { text: "MAXI", foto: "fotos/monos/maxi.jpeg" },
    { text: "AGUS", foto: "fotos/monos/tito.jpeg" },
    { text: "ABUELO", foto: "fotos/monos/abuelo.jpeg" },
    { text: "FAFA", foto: "fotos/monos/fafa.jfif" },
    { text: "POSHO", foto: "fotos/monos/posho.jfif" },
    { text: "PAISA", foto: "fotos/monos/paisa.jfif" },
    { text: "JUANI", foto: "fotos/monos/juani.jfif" }
  ] },
  { name: "MONITO DEL AÑO", options:[
    { text: "BRUNO", foto: "fotos/monos/bruno.jpeg" },
    { text: "MAXI", foto: "fotos/monos/maxi.jpeg" },
    { text: "AGUS", foto: "fotos/monos/tito.jpeg" },
    { text: "ABUELO", foto: "fotos/monos/abuelo.jpeg" },
    { text: "FAFA", foto: "fotos/monos/fafa.jfif" },
    { text: "POSHO", foto: "fotos/monos/posho.jfif" },
    { text: "PAISA", foto: "fotos/monos/paisa.jfif" },
    { text: "JUANI", foto: "fotos/monos/juani.jfif" }
  ] },
  { name: "MONO DEL AÑO", options:[
    { text: "BRUNO", foto: "fotos/monos/bruno.jpeg" },
    { text: "MAXI", foto: "fotos/monos/maxi.jpeg" },
    { text: "AGUS", foto: "fotos/monos/tito.jpeg" },
    { text: "ABUELO", foto: "fotos/monos/abuelo.jpeg" },
    { text: "FAFA", foto: "fotos/monos/fafa.jfif" },
    { text: "POSHO", foto: "fotos/monos/posho.jfif" },
    { text: "PAISA", foto: "fotos/monos/paisa.jfif" },
    { text: "JUANI", foto: "fotos/monos/juani.jfif" }
  ] }
];

let index = 0;
let votes = {};
let userName = "";

const singleVoteCategories = [
  "MONITO DEL AÑO",
  "MONO DEL AÑO",
  "CANCION DEL AÑO",
  "JUNTADA DEL AÑO",
  "MEJOR MONO EN LA ESCUELA",
  "MEJOR MONO FUERA DEL COLE"
];

// --- SONIDOS GLOBALES ---
const hoverSound = new Audio("sonidos/hover.wav");
const clickSound = new Audio("sonidos/footer.mp3");

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("categoryContainer");
  const nextBtn = document.getElementById("nextBtn");
  const nameStep = document.getElementById("nameStep");
  const votingStep = document.getElementById("votingStep");
  const footerBtn = document.getElementById("footerBtn");
  const footerSound = document.getElementById("footer-sound");
  const lyricsModal = document.getElementById("lyricsModal");
  const lyricsTitle = document.getElementById("lyricsTitle");
  const lyricsText = document.getElementById("lyricsText");
  const closeLyrics = document.getElementById("closeLyrics");
  const clipOverlay = document.getElementById("clipOverlay");
  const clipVideo = document.getElementById("clipVideo");
  const closeClip = document.getElementById("closeClip");
  const voterInput = document.getElementById("userName");
  const startBtn = document.getElementById("startBtn");

voterInput.addEventListener("input", () => {
  if (voterInput.value.trim().length >= 2) {
    startBtn.disabled = false;
    startBtn.classList.add("enabled");
  } else {
    startBtn.disabled = true;
    startBtn.classList.remove("enabled");
  }
});

  if (clipOverlay) {
    clipOverlay.classList.add("hidden");
    clipVideo.src = "";
  }

  closeClip.addEventListener("click", () => {
  const container = clipOverlay.querySelector(".clip-container");

  // animaciones de salida
  container.classList.add("fade-out-up");
  clipOverlay.classList.add("fade-out-up");

  setTimeout(() => {
    clipVideo.pause();
    clipVideo.currentTime = 0;
    clipVideo.src = "";

    clipOverlay.classList.add("hidden");
    clipOverlay.classList.remove("fade-out-up");
    container.classList.remove("fade-out-up");
  }, 300);
});

  // --- NOTIFICACIONES ---
  function notify(message, type = "error") {
    const box = document.getElementById("notifyBox");
    const errorSound = document.getElementById("error-audio");
    const successSound = document.getElementById("success-audio");
    if(type==="error" && errorSound){ errorSound.currentTime=0; errorSound.play().catch(()=>{});}
    box.className="";
    box.innerHTML=message;
    box.classList.add(type==="success"?"notify-success":"notify-error");
    box.classList.add("notify-show");
    setTimeout(()=>box.classList.remove("notify-show"),2000);
  }

  // --- ANIMACIÓN ENTRE PANTALLAS ---
  function startAnimation(callback) {
    // sale el nameStep
    nameStep.classList.add("fade-out-up");

    setTimeout(() => {
      nameStep.style.display = "none";

      // entra el votingStep
      votingStep.style.display = "block";
      votingStep.classList.add("fade-in-down");

      // ejecuta la primera categoría
      callback();

      // limpiar clases después
      setTimeout(() => {
        votingStep.classList.remove("fade-in-down");
      }, 450);

    }, 450);
  }

  function animateSwap(element, callback){
    element.classList.add("slide-exit");
    requestAnimationFrame(()=>{
      element.classList.add("slide-exit-active");
      setTimeout(()=>{
        element.className="";
        callback();
        element.classList.add("slide-enter");
        requestAnimationFrame(()=>{
          element.classList.add("slide-enter-active");
          setTimeout(()=>element.className="",350);
        });
      },350);
    });
  }

  // --- BOTÓN COMENZAR ---
  startBtn.addEventListener("click", async ()=>{
    const input = voterInput.value.trim();
    if (input.length < 2) {
      notify("No flaquito, no me sirve ese nombre.");
      return;
    }

    const q = query(collection(db,"votosSecuenciales"), where("name","==", input));
    const existing = await getDocs(q);
    if (!existing.empty) {
      notify("Ya se uso ese nombre dolobu, elegi otro wachin.");
      return;
    }

    userName = input;

    // 👉 fade-out de la card
    const nameCard = document.querySelector(".name-card");
    nameCard.classList.add("fade-out-up");

    // esperamos a que termine la animación
    setTimeout(() => {
      startAnimation(() => showCategory());
    }, 400);
  });

  // --- FUNCION GENERAL BOTONES (hover + click) ---
  function addButtonSounds(buttons){
    buttons.forEach(btn=>{
      btn.addEventListener("mouseenter", ()=>{
        hoverSound.currentTime=0;
        hoverSound.play().catch(()=>{});
      });
      btn.addEventListener("click", ()=>{
        clickSound.currentTime=0;
        clickSound.play().catch(()=>{});
      });
    });
  }

  // --- MOSTRAR CATEGORÍA ---
  function showCategory() {
  const c = categories[index];
  const max = singleVoteCategories.includes(c.name) ? 1 : 2;

  // ============================
  // CONTENEDOR BASE
  // ============================
  container.innerHTML = `
    <div class="category">
      <h2>${c.name}</h2>
      <p class="category-subtitle">
        Puedes elegir <b>${max}</b> opción(es).
      </p>
      <div class="options-grid"></div>
    </div>
  `;

  const grid = container.querySelector(".options-grid");

  /* =====================================================
     🎵 CANCIÓN DEL AÑO
  ===================================================== */
  if (c.name === "CANCION DEL AÑO") {
    renderSongCategory(grid, c);
  }

  /* =====================================================
     🎬 CLIP DEL AÑO
  ===================================================== */
  else if (c.name === "CLIP DEL AÑO") {
    renderClipCategory(grid, c);
  }

  /* =====================================================
     📦 OTRAS CATEGORÍAS
  ===================================================== */
  else {
    renderDefaultCategory(grid, c);
  }

  /* =====================================================
     📖 LETRAS
  ===================================================== */
  bindLyricsButtons(grid);

  /* =====================================================
     ✅ SELECCIÓN DE CARDS
  ===================================================== */
  bindCardSelection(grid);
// después de bindCardSelection(grid);

const saved = votes[c.name] || [];

grid.querySelectorAll(".card-option").forEach(card => {
  if (saved.includes(card.dataset.value)) {
    card.classList.add("selected");
  }
});


}

  // --- TOGGLE CARD ---
function toggleCard(card){
  const c = categories[index];
  const max = singleVoteCategories.includes(c.name) ? 1 : 2;
  const value = card.dataset.value;

  if (!votes[c.name]) votes[c.name] = [];

  const list = votes[c.name];
  const idx = list.indexOf(value);

  // quitar
  if (idx !== -1) {
    list.splice(idx, 1);
  } 
  // agregar
  else {
    if (list.length >= max) {
      notify(`Solo puedes seleccionar ${max} opción(es)`);
      return;
    }
    list.push(value);
  }

  // refrescar UI
  document.querySelectorAll(".card-option").forEach(c => {
    c.classList.toggle(
      "selected",
      list.includes(c.dataset.value)
    );
  });
}


function renderSongCategory(grid, category) {
  grid.innerHTML = `
    <div class="songs-grid">
      ${category.options.map(opt => `
        <div class="card-option card-clip" data-value="${opt.text}">
          <div class="clip-title">${opt.text}</div>

          <audio src="${opt.audio}" preload="none"></audio>

          <div class="song-buttons">
            <button class="play-btn">▶️</button>
            <button
              class="lyrics-button"
              data-letra="${(opt.letra ?? "").replace(/\n/g, "\\n")}">
              Letra
            </button>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="global-volume-wrapper">
      <div class="global-volume">
        <label>🔊 Volumen</label>
        <input
          id="globalVolume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value="0.7">
      </div>
    </div>
  `;

  const playButtons = grid.querySelectorAll(".play-btn");
  const audios = grid.querySelectorAll("audio");
  const globalVolume = grid.querySelector("#globalVolume");

  addButtonSounds(playButtons);

  // ▶️ Play / Pause exclusivo
  playButtons.forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();

      const card = btn.closest(".card-option");
      const audio = card.querySelector("audio");

      playButtons.forEach(b => {
        const a = b.closest(".card-option").querySelector("audio");
        if (a !== audio) {
          a.pause();
          b.textContent = "▶️";
          b.classList.remove("active-btn");
        }
      });

      if (audio.paused) {
        audio.play();
        btn.textContent = "⏸️";
        btn.classList.add("active-btn");
      } else {
        audio.pause();
        btn.textContent = "▶️";
        btn.classList.remove("active-btn");
      }

      audio.onended = () => {
        btn.textContent = "▶️";
        btn.classList.remove("active-btn");
      };
    });
  });

  // 🔊 Volumen global
  if (globalVolume) {
    audios.forEach(a => (a.volume = globalVolume.value));

    globalVolume.addEventListener("input", e => {
      audios.forEach(a => (a.volume = e.target.value));
    });

    globalVolume.addEventListener("click", e => e.stopPropagation());
  }
}


function setupSongAudio(grid) {
  const playButtons = grid.querySelectorAll(".play-btn");
  const audios = grid.querySelectorAll("audio");
  const globalVolume = document.getElementById("globalVolume");

  addButtonSounds([...playButtons]);

  // volumen inicial
  if (globalVolume) {
    audios.forEach(a => a.volume = globalVolume.value);

    globalVolume.addEventListener("input", e => {
      audios.forEach(a => (a.volume = e.target.value));
    });

    globalVolume.addEventListener("click", e => e.stopPropagation());
  }

  // ▶️ play / pausa
  playButtons.forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();

      const card = btn.closest(".card-option");
      const audio = card.querySelector("audio");

      playButtons.forEach(b => {
        const a = b.closest(".card-option").querySelector("audio");
        if (a !== audio) {
          a.pause();
          b.textContent = "▶️";
          b.classList.remove("active-btn");
        }
      });

      if (audio.paused) {
        audio.play();
        btn.textContent = "⏸️";
        btn.classList.add("active-btn");
      } else {
        audio.pause();
        btn.textContent = "▶️";
        btn.classList.remove("active-btn");
      }

      audio.onended = () => {
        btn.textContent = "▶️";
        btn.classList.remove("active-btn");
      };
    });
  });
}

function renderClipCategory(grid, category) {
  grid.innerHTML = category.options.map(opt => `
    <div class="card-option card-clip" data-value="${opt.text}">
      <div class="clip-title">${opt.text}</div>
      <button class="clip-button" data-video="${opt.video}">
        Ver clip
      </button>
    </div>
  `).join("");

  const clipButtons = grid.querySelectorAll(".clip-button");
  addButtonSounds(clipButtons);

  clipButtons.forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();

      // setear video
      clipVideo.src = btn.dataset.video;
      clipVideo.currentTime = 0;

      // mostrar overlay
      clipOverlay.classList.remove("hidden", "fade-out-up");
      clipOverlay.classList.add("final-visible", "fade-in-down");

      // limpiar clase de animación después
      setTimeout(() => {
        clipOverlay.classList.remove("fade-in-down");
      }, 350);

      clipVideo.play();
    });
  });
}



function renderDefaultCategory(grid, category) {
  grid.innerHTML = category.options.map(opt => {
    // si viene string (por si quedó algo viejo), lo normalizamos
    if (typeof opt === "string") {
      opt = { text: "", foto: opt };
    }

    const value = opt.text || opt.foto || "";

    return `
      <div class="card-option photo-card" data-value="${value}">
        
        ${opt.foto ? `
          <div class="photo-wrapper">
            <img src="${opt.foto}" class="option-img">
          </div>
        ` : ""}

        ${opt.text ? `
          <div class="option-text">${opt.text}</div>
        ` : ""}
      </div>
    `;
  }).join("");
}



function bindLyricsButtons(grid) {
  grid.querySelectorAll(".lyrics-button").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();

      lyricsTitle.textContent =
        btn.closest(".card-option").dataset.value;

      lyricsText.textContent =
        btn.dataset.letra.replace(/\\n/g, "\n");

      lyricsModal.classList.remove("final-hidden");
      lyricsModal.classList.add("final-visible");
    });
  });
}


function bindCardSelection(grid) {
  const selectSound = document.getElementById("select-sound");

  grid.querySelectorAll(".card-option").forEach(card => {
    card.addEventListener("click", () => {
      if (selectSound) {
        selectSound.currentTime = 0;
        selectSound.play().catch(() => {});
      }
      toggleCard(card);
    });
  });
}



  // --- SIGUIENTE ---
  const nextSound=document.getElementById("next-category-sound");
  nextBtn.addEventListener("click", async ()=>{
    const selected=[...document.querySelectorAll(".card-option.selected")].map(c=>c.dataset.value);
    const c=categories[index];
    const max=singleVoteCategories.includes(c.name)?1:2;
    if(selected.length!==max){ notify(`elegi bien bobo`); return;}
    if(nextSound){ nextSound.currentTime=0; nextSound.play().catch(()=>{});}
    votes[c.name]=selected;
    index++;
    if(index>=categories.length){
      notify("Guardando paa...","success");
      try{ await addDoc(collection(db,"votosSecuenciales"),{name:userName,votes,timestamp:new Date()}); showFinalScreen(); nextBtn.style.display="none";}
      catch(err){ notify("Error guardando votos","error"); console.error(err);}
      return;
    }
    animateSwap(container, showCategory);
  });

  // --- OVERLAY FINAL ---
function showFinalScreen() {
  const fs = document.getElementById("final-screen");
  const circle = fs.querySelector(".check-circle-bg");
  const check = fs.querySelector(".check-path");

  // reset animaciones SVG
  circle.style.animation = "none";
  check.style.animation = "none";

  fs.classList.remove("final-hidden", "fade-out-down");
  fs.classList.add("final-visible");

  // forzar reflow para reiniciar animaciones
  void circle.offsetWidth;

  // volver a activar animaciones
  circle.style.animation = "";
  check.style.animation = "";

  const audio = document.getElementById("success-audio");
  if (audio) {
    audio.currentTime = 0;
    audio.volume = 0.8;
    audio.play().catch(() => {});
  }

  // ⏳ esperar a que se vea el check
  setTimeout(() => {
    fs.classList.add("fade-out-down");

    // 🧹 limpiar del todo
    setTimeout(() => {
      fs.classList.remove("final-visible");
      fs.classList.add("final-hidden");
      fs.classList.remove("fade-out-down");
    }, 400);

  }, 1800); // ← tiempo visible del check
}




// --- FOOTER ---

  if (footerBtn) {

    // HOVER (usa hoverSound global)
    footerBtn.addEventListener("mouseenter", () => {
      hoverSound.currentTime = 0;
      hoverSound.play().catch(() => {});
    });

    // CLICK (usa clickSound global)
    footerBtn.addEventListener("click", (e) => {
      e.preventDefault();

      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});

      setTimeout(() => {
        window.location.href = "admin.html";
      }, 300);
    });
  }



  // --- MODAL LETRA ---
  closeLyrics.addEventListener("click",()=>{
    lyricsModal.classList.add("final-hidden");
    lyricsModal.classList.remove("final-visible");
  });
  lyricsModal.addEventListener("click",(e)=>{
    if(e.target===lyricsModal){ lyricsModal.classList.add("final-hidden"); lyricsModal.classList.remove("final-visible"); }
  });
});

