// admin.js — versión completa con sonidos del carrusel y footer funcionando

// ===============================
//  IMPORTS FIREBASE
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// ===============================
//  CONFIG FIREBASE
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyClsm9dQXvGHazTFISxrU0NLcqhNxXvCls",
  authDomain: "monkey-awards.firebaseapp.com",
  projectId: "monkey-awards",
  storageBucket: "monkey-awards.firebasestorage.app",
  messagingSenderId: "247832993400",
  appId: "1:247832993400:web:c134b1ae66aefb14d2978d",
  measurementId: "G-BZ8HY4C03Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ===============================
//  UID DEL ADMIN
// ===============================
const ADMIN_UID = "hd6wskPepSZkDmb6OTyvtKOekrX2";

// ===============================
//  ELEMENTOS DOM
// ===============================
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const emailEl = document.getElementById("email");
const passEl = document.getElementById("password");
const authMsg = document.getElementById("authMsg");
const authDiv = document.getElementById("auth");
const resultsDiv = document.getElementById("results");

// ===============================
//  SONIDOS DEL CARRUSEL Y LOGIN
// ===============================
const hoverSound = document.getElementById("carousel-hover-sound");
const slideSound = document.getElementById("carousel-move-sound");

hoverSound.volume = 0.4;
slideSound.volume = 0.4;

function notifyAdmin(message, type = "error") {
  const box = document.getElementById("notifyBox");
  const errorSound = document.getElementById("notify-error-sound");
  const successSound = document.getElementById("notify-success-sound");

  if (!box) return;

  box.className = "notify-box";
  box.textContent = message;
  box.classList.add(type === "success" ? "notify-success" : "notify-error");

  box.classList.add("show");

  if (type === "success" && successSound) {
    successSound.currentTime = 0;
    successSound.play().catch(() => {});
  }

  if (type === "error" && errorSound) {
    errorSound.currentTime = 0;
    errorSound.play().catch(() => {});
  }

  setTimeout(() => {
    box.classList.remove("show");
  }, 2200);
}


// ===============================
//  LOGIN
// ===============================
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    // evitar doble click
    if (loginBtn.disabled) return;

    const originalText = loginBtn.textContent;
    loginBtn.textContent = "Ingresando...";
    loginBtn.disabled = true;
    loginBtn.classList.add("loading");

    notifyAdmin("ojo...?", "success");

    try {
      await signInWithEmailAndPassword(
        auth,
        emailEl.value,
        passEl.value
      );
      // 👉 si entra bien, NO reactivamos
      // porque Firebase va a disparar onAuthStateChanged
    } 
    catch (err){
      console.error("Login error:", err);

      // 🔔 notificación roja (ya la tenés)
      notifyAdmin("Tas equivocado flaquito", "error");

      // 🔁 reset botón
      loginBtn.disabled = false;
      loginBtn.textContent = "Ingresar";
      loginBtn.classList.remove("loading");

       // ❌ glow rojo
      loginBtn.classList.remove("glow-error"); // reset por si estaba
      void loginBtn.offsetWidth; // fuerza reflow
      loginBtn.classList.add("glow-error");
    }
  });
}
// ===============================
//  LOGOUT
// ===============================
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    // animación de salida de resultados
    resultsDiv.classList.remove("slide-center");
    resultsDiv.classList.add("slide-right");

    // mostrar login
    authDiv.classList.remove("hidden", "slide-left");

    setTimeout(() => {
      authDiv.classList.add("slide-center");

      // 🔁 reset botón login
      loginBtn.disabled = false;
      loginBtn.textContent = "Ingresar";
      loginBtn.classList.remove("loading");

      // ✨ glow suave post-slide
      loginBtn.classList.add("glow-once");
      setTimeout(() => {
        loginBtn.classList.remove("glow-once");
      }, 900);

    }, 650); // ⏱️ después del slide

    // limpiar inputs
    emailEl.value = "";
    passEl.value = "";
    authMsg.textContent = "";

    signOut(auth);
  });

}

// ===============================
//  AUTENTICACIÓN
// ===============================
onAuthStateChanged(auth, async (user) => {
  if (user && user.uid === ADMIN_UID) {
    authDiv.classList.remove("slide-center");
    authDiv.classList.add("slide-left");

    resultsDiv.classList.remove("hidden", "slide-right");
    setTimeout(() => resultsDiv.classList.add("slide-center"), 10);

    await loadResults();
  } else {
    resultsDiv.classList.add("hidden");
    authDiv.classList.remove("hidden");

    if (user && user.uid !== ADMIN_UID) {
      authMsg.textContent = "Usuario no autorizado.";
    }
  }
});

// ===============================
//     CARRUSEL + RESULTADOS
// ===============================
const ordenCategorias = [
  "JUNTADA DEL AÑO",
  "CLIP DEL AÑO",
  "FOTO DEL AÑO",
  "FAIL DEL AÑO",
  "MONADA DEL AÑO",
  "CANCION DEL AÑO",
  "MEJOR MONO EN LA ESCUELA",
  "MEJOR MONO FUERA DEL COLE",
  "MONITO DEL AÑO",
  "MONO DEL AÑO"
];

const labelMap = {
  "FOTO DEL AÑO": {
    "fotos/monnnkey.jpg": "Paisa",
    "fotos/juan.jpg": "Juan",
    "fotos/pedro.jpg": "Pedro",
    "": "",
    "": ""
  },
  "FAIL DEL AÑO": {
    "fails/caida1.mp4": "La caída épica",
    "fails/caida2.mp4": "El resbalón"
  }
};

async function loadResults() {
  const track = document.getElementById("carouselTrack");
  const dotsContainer = document.getElementById("carouselDots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!track || !dotsContainer) {
    console.error("Faltan elementos del carrusel.");
    return;
  }

  track.innerHTML = "Cargando...";

  try {
    const q = query(
    collection(db, "votosSecuenciales"),
    orderBy("timestamp", "asc")   // 👈 primer votó → último votó
    );

    const snap = await getDocs(q);


    if (!snap.size) {
      track.innerHTML = "<p>No hay votos aún.</p>";
      return;
    }

    track.innerHTML = "";
    dotsContainer.innerHTML = "";

    const slides = [];
    let idx = 0;

    snap.forEach(doc => {
      const data = doc.data();
      const nombre = data.name ?? "Sin nombre";
      const votos = data.votes ?? {};

      const slide = document.createElement("div");
      slide.className = "carousel-slide";

      const box = document.createElement("div");
      box.className = "voter-box";

      const title = document.createElement("h3");
      title.textContent = nombre;
      box.appendChild(title);

      const list = document.createElement("ul");
      const keys = ordenCategorias.filter(cat => cat in votos);

      if (!keys.length) {
        const li = document.createElement("li");
        li.textContent = "No votó en ninguna categoría.";
        list.appendChild(li);
      } else {
        keys.forEach(cat => {
          const li = document.createElement("li");
          let value = votos[cat];
          // Si hay un mapa de labels para esta categoría
          if (labelMap[cat]) {
            if (Array.isArray(value)) {
              value = value.map(v => labelMap[cat][v] || v).join(", ");
            } else {
              value = labelMap[cat][value] || value;
            }
          }
          li.innerHTML = `<strong>${cat}:</strong> ${value}`;
          list.appendChild(li);
        });

      }

    box.appendChild(list);
    slide.appendChild(box);
    track.appendChild(slide);

    slides.push(slide);
    const dot = document.createElement("span");
    dot.className = idx === 0 ? "active" : "";
    dot.dataset.index = idx;
    dotsContainer.appendChild(dot);
    idx++;
    });
  let current = 0;

  function updateCarousel() {
    if (!slides.length) return;
    track.style.transform = `translateX(-${current * 100}%)`;

    const allDots = dotsContainer.querySelectorAll("span");
    allDots.forEach(d => d.classList.remove("active"));
    dotsContainer.querySelector(`span[data-index="${current}"]`)?.classList.add("active");
  }

    // ======================
    // EVENTOS DE BOTONES
    // ======================
    prevBtn.addEventListener("mouseenter", () => {
      hoverSound.currentTime = 0;
      hoverSound.play();
    });
    nextBtn.addEventListener("mouseenter", () => {
      hoverSound.currentTime = 0;
      hoverSound.play();
    });

    prevBtn.onclick = () => {
      slideSound.currentTime = 0;
      slideSound.play();
      current = (current - 1 + slides.length) % slides.length;
      updateCarousel();
    };
    nextBtn.onclick = () => {
      slideSound.currentTime = 0;
      slideSound.play();
      current = (current + 1) % slides.length;
      updateCarousel();
    };

    // ======================
    // DOTS
    // ======================
    dotsContainer.querySelectorAll("span").forEach(dot => {
      dot.addEventListener("click", () => {
        slideSound.currentTime = 0;
        slideSound.play();
        current = parseInt(dot.dataset.index, 10);
        updateCarousel();
      });
    });

    // ======================
    // TECLAS IZQ/DER
    // ======================
    document.addEventListener("keydown", (e) => {
      if (!slides.length) return;

      if (e.key === "ArrowRight") {
        slideSound.currentTime = 0;
        slideSound.play();
        current = (current + 1) % slides.length;
        updateCarousel();
      }
      if (e.key === "ArrowLeft") {
        slideSound.currentTime = 0;
        slideSound.play();
        current = (current - 1 + slides.length) % slides.length;
        updateCarousel();
      }
    });

    updateCarousel();

    // ======================
// SWIPE MOBILE
// ======================
const carouselWindow = document.querySelector(".carousel-window");

// ======================
// TOUCH + INERCIA iOS
// ======================
let startX = 0;
let currentX = 0;
let dragging = false;
let deltaX = 0;

track.addEventListener("touchstart", (e) => {
  if (e.touches.length !== 1) return;

  startX = e.touches[0].clientX;
  dragging = true;
  deltaX = 0;

  track.style.transition = "none";
}, { passive: true });

track.addEventListener("touchmove", (e) => {
  if (!dragging) return;

  currentX = e.touches[0].clientX;
  deltaX = currentX - startX;

  const percent = (deltaX / track.offsetWidth) * 100;
  track.style.transform = `translateX(calc(-${current * 100}% + ${percent}%))`;
}, { passive: true });

track.addEventListener("touchend", () => {
  if (!dragging) return;
  dragging = false;

  track.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";

  const threshold = track.offsetWidth * 0.18;

  if (deltaX > threshold && current > 0) {
    slideSound.currentTime = 0;
    slideSound.play();
    current--;
  } else if (deltaX < -threshold && current < slides.length - 1) {
    slideSound.currentTime = 0;
    slideSound.play();
    current++;
  }

  updateCarousel();
});


  } catch (err) {
    console.error("Error cargando votos:", err);
    track.innerHTML = "<p>Error cargando resultados.</p>";
  }
}

// ===============================
//  SONIDO FOOTER + NAVEGACIÓN
// ===============================
// ===============================
//  SONIDOS FOOTER + NAVEGACIÓN
// ===============================
const adminFooterBtn = document.getElementById("footerBtn");
const adminFooterHover = document.getElementById("footer-sound");
const adminFooterClick = document.getElementById("click-sound");

if (adminFooterBtn && adminFooterHover && adminFooterClick) {

  // Sonido al pasar el mouse (hover)
  adminFooterBtn.addEventListener("mouseenter", () => {
    adminFooterHover.currentTime = 0;
    adminFooterHover.play().catch(() => {});
  });

  // Sonido distinto al hacer click
  adminFooterBtn.addEventListener("click", (e) => {
    e.preventDefault(); // evita cortar el sonido

    adminFooterClick.currentTime = 0;
    adminFooterClick.play().catch(() => {});

    setTimeout(() => {
      window.location.href = "index.html";
    }, 300); // tiempo suficiente para escuchar el "click"
  });
}
