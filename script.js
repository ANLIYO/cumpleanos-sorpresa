const videoId = "k5YzN3sHsfw";

const countdownScreen = document.getElementById("countdown-screen");
const surpriseScreen = document.getElementById("surprise-screen");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const videoElement = document.getElementById("birthday-video");
const interactivePhotoElement = document.getElementById("interactive-photo");
const chessContainer = document.getElementById("chess-container");
const surpriseMessageModal = document.getElementById("surprise-message-modal");
const surpriseMessageElement = document.getElementById("surprise-message");
const closeButton = document.querySelector(".close-button");

const targetTime = new Date(2025, 7, 30, 2, 15, 0);
const SURPRISE_ACTIVATED_KEY = "surpriseActivated";
let countdownInterval;
const surprisePhrases = [
  "te amo",
  "vamos a jugar basquet",
  "toca hacer una manualidad",
  "vamos a ir a bailar",
  "vamos a correr",
  "¿un juego de mesa o qué?",
  "Te toca cargarme",
  "me debes un helado",
  "te debo un elote",
  "noche de pelis y palomitas",
  "vamos a hacer un picnic",
  "sesión de fotos divertida",
  "preparamos juntos algo de comer",
  "reto de karaoke",
  "baile improvisado en la sala",
  "reto de adivinar canciones",
  "te enseño algo nuevo que sé hacer",
  "leemos un libro nuevo juntos",
  "intercambiamos manualidades",
  "escribimos una carta divertida el uno al otro",
  "probamos una receta nueva juntos",
  "hacemos dibujos y los mostramos",
];

function checkSurpriseStatus() {
  const now = new Date();
  const surpriseActivated = localStorage.getItem(SURPRISE_ACTIVATED_KEY);
  if (now >= targetTime) {
    if (countdownInterval) clearInterval(countdownInterval);
    if (surpriseActivated === "true") {
      showSurpriseDirectly();
    } else {
      triggerSurprise();
    }
    return true;
  }
  return false;
}

function updateCountdown() {
  if (checkSurpriseStatus()) return;
  const now = new Date();
  const timeDifference = targetTime - now;
  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    triggerSurprise();
    return;
  }
  const totalSeconds = Math.floor(timeDifference / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  hoursElement.textContent = hours.toString().padStart(2, "0");
  minutesElement.textContent = minutes.toString().padStart(2, "0");
  secondsElement.textContent = seconds.toString().padStart(2, "0");
}

function triggerSurprise() {
  localStorage.setItem(SURPRISE_ACTIVATED_KEY, "true");
  launchConfetti();
  countdownScreen.classList.add("explode");
  setTimeout(() => {
    countdownScreen.classList.add("hidden");
    videoElement.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`;
    revealSurpriseScreen();
  }, 800);
}

function launchConfetti() {
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 1000,
    shapes: ["square", "circle", "star"],
    scalar: 1.5,
  };
  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(250 * particleRatio),
      })
    );
  }
  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

function revealSurpriseScreen() {
  surpriseScreen.classList.remove("hidden");
  const sections = surpriseScreen.querySelectorAll(
    ".message-section, .video-section, .letter-section, .photo-section, button"
  );
  sections.forEach((section, index) => {
    setTimeout(() => {
      section.style.opacity = "1";
      section.style.animationName = "fadeInUp";
    }, 500 * index + 1000);
  });
  addPhotoClickListener();
}

function showSurpriseDirectly() {
  countdownScreen.classList.add("hidden");
  videoElement.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`;
  surpriseScreen.classList.remove("hidden");
  launchConfetti();
  addPhotoClickListener();
}

function addPhotoClickListener() {
  if (interactivePhotoElement) {
    interactivePhotoElement.addEventListener("click", showRandomMessage);
  }
  if (closeButton) {
    closeButton.addEventListener("click", closeMessageAndShowChess);
  }
}

function showRandomMessage() {
  const randomIndex = Math.floor(Math.random() * surprisePhrases.length);
  const randomPhrase = surprisePhrases[randomIndex];
  surpriseMessageElement.textContent = randomPhrase;
  surpriseMessageModal.classList.remove("hidden");
  surpriseMessageModal.classList.add("visible");
}

function closeMessageAndShowChess() {
  surpriseMessageModal.classList.remove("visible");
  surpriseMessageModal.classList.add("hidden");
  showChessSection();
}

function showChessSection() {
  chessContainer.classList.remove("hidden");
  chessContainer.style.opacity = "1";
  chessContainer.style.animationName = "fadeInUp";
  initializeChess();
}

function replay() {
  localStorage.removeItem(SURPRISE_ACTIVATED_KEY);
  location.reload();
}

if (checkSurpriseStatus()) {
  showSurpriseDirectly();
} else {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}
