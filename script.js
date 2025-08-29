// CONFIGURA ESTA VARIABLE CON EL ID DE TU VIDEO DE GOOGLE DRIVE
const videoId = "mx8J_rU02fE"; // Ejemplo: "1abcXYZ123def"

// Elementos del DOM
const countdownScreen = document.getElementById("countdown-screen");
const surpriseScreen = document.getElementById("surprise-screen");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const videoElement = document.getElementById("birthday-video");

// La hora objetivo (5:00 AM de hoy)
const targetTime = new Date();
targetTime.setHours(19, 46, 0, 0); // Configura para las 5:00 AM

// Si ya son más de las 5 AM hoy, configura para las 5 AM del día siguiente
if (new Date() > targetTime) {
  targetTime.setDate(targetTime.getDate() + 1);
}

// Función principal para actualizar la cuenta regresiva
function updateCountdown() {
  const now = new Date();
  const timeDifference = targetTime - now;

  // Si el tiempo se acaba...
  if (timeDifference <= 0) {
    // Detener el intervalo
    clearInterval(countdownInterval);
    // ¡Ejecutar la explosión y revelar la sorpresa!
    triggerSurprise();
    return;
  }

  // Calcular horas, minutos y segundos restantes
  const totalSeconds = Math.floor(timeDifference / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Actualizar el HTML con los valores formateados (00, 01, 02...)
  hoursElement.textContent = hours.toString().padStart(2, "0");
  minutesElement.textContent = minutes.toString().padStart(2, "0");
  secondsElement.textContent = seconds.toString().padStart(2, "0");
}

// Función para la animación de "explosión" y revelación
function triggerSurprise() {
  // 1. Añadir la clase de animación "explode" al contador
  countdownScreen.classList.add("explode");

  // 2. Después de que termine la animación de explosión, ocultar el contador y revelar la sorpresa
  setTimeout(() => {
    countdownScreen.classList.add("hidden");

    // Configurar la URL del video de Drive para que se reproduzca automáticamente
    // &autoplay=1 es el parámetro clave aquí
    videoElement.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`;

    // Mostrar y animar la revelación de la pantalla de sorpresa
    surpriseScreen.classList.remove("hidden");
    surpriseScreen.classList.add("reveal");
  }, 800); // Este tiempo debe coincidir con la duración de la animación "explode" (0.8s)
}

// Función para reiniciar la experiencia (por si quiere volver a verla)
function replay() {
  // Recargar la página para reiniciar el contador (solución simple)
  location.reload();
}

// Iniciar la cuenta regresiva inmediatamente y actualizarla cada segundo
updateCountdown(); // Llamada inicial para evitar un retraso de 1 segundo
const countdownInterval = setInterval(updateCountdown, 1000);
