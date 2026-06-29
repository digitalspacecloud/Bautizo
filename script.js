let personas = 1;
let currentSlide = 0;

const URL_SHEET = "https://script.google.com/macros/s/AKfycbxap5tBvoE2inbYs3lvyLC-uD6BnXFlLyaw35vQSUi7DQq7sU613dVHsJaAiU-bSmWE/exec";

/* APERTURA */
function openInvitation() {
  const intro = document.getElementById("introScreen");
  if (!intro) return;

  intro.classList.add("hide-intro");

  setTimeout(() => {
    intro.style.display = "none";
  }, 1100);
}

/* SCROLL */
function scrollToInfo() {
  const confirmacion = document.getElementById("confirmacion");
  if (!confirmacion) return;

  confirmacion.scrollIntoView({ behavior: "smooth" });
}

/* MODAL SÍ */
function openConfirm() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "none";
}

/* MODAL NO */
function openNoConfirm() {
  const modalNo = document.getElementById("modalNo");
  if (modalNo) modalNo.style.display = "flex";
}

function closeNoModal() {
  const modalNo = document.getElementById("modalNo");
  if (modalNo) modalNo.style.display = "none";
}

function goHome() {
  closeNoModal();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* PERSONAS */
function changePeople(value) {
  personas += value;
  if (personas < 1) personas = 1;

  const personasElement = document.getElementById("personas");
  if (personasElement) personasElement.textContent = personas;
}

/* GUARDAR EN SHEET */
async function saveData() {
  const nombreInput = document.getElementById("nombre");

  if (!nombreInput) {
    alert("No se encontró el campo de nombre.");
    return;
  }

  const nombre = nombreInput.value.trim();

  if (nombre === "") {
    alert("Por favor escribe tu nombre.");
    return;
  }

  const datos = {
    nombre: nombre,
    asistencia: "Sí",
    personas: personas
  };

  try {
    await fetch(URL_SHEET, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(datos)
    });

    alert("Gracias " + nombre + ". Tu asistencia ha sido registrada.");

    nombreInput.value = "";
    personas = 1;

    const personasElement = document.getElementById("personas");
    if (personasElement) personasElement.textContent = personas;

    closeModal();

  } catch (error) {
    alert("No se pudo registrar tu asistencia. Intenta nuevamente.");
  }
}

/* CUENTA REGRESIVA */
function updateCountdown() {
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;

  const eventDate = new Date("August 9, 2026 10:00:00").getTime();
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

/* CARRUSEL */
function updateCarousel() {
  const track = document.getElementById("carouselTrack");
  const dots = document.querySelectorAll(".dot");

  if (!track) return;

  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function moveSlide(direction) {
  const totalSlides = document.querySelectorAll(".carousel-slide").length;
  if (totalSlides === 0) return;

  currentSlide += direction;

  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;

  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

/* HACER FUNCIONES GLOBALES PARA ONCLICK */
window.openInvitation = openInvitation;
window.scrollToInfo = scrollToInfo;
window.openConfirm = openConfirm;
window.closeModal = closeModal;
window.openNoConfirm = openNoConfirm;
window.closeNoModal = closeNoModal;
window.goHome = goHome;
window.changePeople = changePeople;
window.saveData = saveData;
window.moveSlide = moveSlide;
window.goToSlide = goToSlide;

/* INICIAR CUANDO CARGUE TODO */
document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  updateCarousel();

  setInterval(updateCountdown, 1000);

  setInterval(() => {
    moveSlide(1);
  }, 5000);
});
