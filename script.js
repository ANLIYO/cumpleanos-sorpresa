const videoId = "k5YzN3sHsfw";

const countdownScreen = document.getElementById("countdown-screen");
const surpriseScreen = document.getElementById("surprise-screen");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const videoElement = document.getElementById("birthday-video");

const targetTime = new Date(2025, 7, 30, 5, 0, 0);
const SURPRISE_ACTIVATED_KEY = "surpriseActivated";

let countdownInterval;

function checkSurpriseStatus() {
  const now = new Date();
  const surpriseActivated = localStorage.getItem(SURPRISE_ACTIVATED_KEY);

  if (now >= targetTime) {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    if (surpriseActivated === "true") {
      showSurpriseDirectly();
      return true;
    }

    triggerSurprise();
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

  createExplosion();

  countdownScreen.classList.add("explode");

  setTimeout(() => {
    countdownScreen.classList.add("hidden");

    videoElement.src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

    videoElement.onload = function () {
      setTimeout(() => {
        videoElement.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`;

        revealSurpriseScreen();
      }, 300);
    };
  }, 800);
}
function createExplosion() {
  const explosion = document.createElement("div");
  explosion.style.position = "fixed";
  explosion.style.left = "50%";
  explosion.style.top = "50%";
  explosion.style.transform = "translate(-50%, -50%)";
  explosion.style.pointerEvents = "none";
  explosion.style.zIndex = "9999";
  document.body.appendChild(explosion);

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "explosion-piece";

    const colors = ["#FFD700", "#000080", "#e94560", "#ffffff"];
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    const angle = Math.random() * Math.PI * 2;
    particle.style.setProperty("--tx", Math.cos(angle) * 3);
    particle.style.setProperty("--ty", Math.sin(angle) * 3);

    const size = 8 + Math.random() * 15;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    explosion.appendChild(particle);
  }

  setTimeout(() => {
    explosion.remove();
  }, 2000);
}

function revealSurpriseScreen() {
  surpriseScreen.classList.remove("hidden");

  const title = surpriseScreen.querySelector("h1");
  const notice = surpriseScreen.querySelector(".property-notice");
  const videoContainer = surpriseScreen.querySelector(".video-container");
  const sportsSection = surpriseScreen.querySelector(".sports-section");
  const button = surpriseScreen.querySelector("button");

  setTimeout(() => {
    title.classList.add("exploding-text");
    title.style.opacity = "1";
  }, 200);

  setTimeout(() => {
    notice.classList.add("fade-in-up");
    notice.style.opacity = "1";
  }, 800);

  setTimeout(() => {
    videoContainer.classList.add("fade-in-up");
    videoContainer.style.opacity = "1";
  }, 1200);

  setTimeout(() => {
    sportsSection.classList.add("fade-in-up", "floating-element");
    sportsSection.style.opacity = "1";
  }, 1600);

  setTimeout(() => {
    button.classList.add("fade-in-up", "shimmer-effect");
    button.style.opacity = "1";

    initializeChess();
    launchConfetti();
  }, 2000);
}

function showSurpriseDirectly() {
  countdownScreen.classList.add("hidden");
  videoElement.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`;
  revealSurpriseScreen();
  initializeChess();
}

// function showSurpriseDirectly() {
//   countdownScreen.classList.add("hidden");
//   videoElement.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`;
//   surpriseScreen.classList.remove("hidden");
//   initializeChess();
// }

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
