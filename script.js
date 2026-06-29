let personas = 1;

const URL_SHEET = "https://script.google.com/macros/s/AKfycbxap5tBvoE2inbYs3lvyLC-uD6BnXFlLyaw35vQSUi7DQq7sU613dVHsJaAiU-bSmWE/exec";


function openInvitation() {
  const intro = document.getElementById("introScreen");

  intro.classList.add("hide-intro");

  setTimeout(() => {
    intro.style.display = "none";
  }, 1100);
}



function scrollToInfo() {
  document.getElementById("confirmacion").scrollIntoView({
    behavior: "smooth"
  });
}

function goHome() {
  closeNoModal();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function openConfirm() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function openNoConfirm() {
  document.getElementById("modalNo").style.display = "flex";
}

function closeNoModal() {
  document.getElementById("modalNo").style.display = "none";
}

function changePeople(value) {
  personas += value;

  if (personas < 1) {
    personas = 1;
  }

  document.getElementById("personas").textContent = personas;
}

async function saveData() {
  const nombre = document.getElementById("nombre").value.trim();

  if (nombre === "") {
    alert("Por favor escribe tu nombre.");
    return;
  }

  const datos = {
    nombre: nombre,
    asistencia: "Sí",
    personas: personas
  };

  await fetch(URL_SHEET, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(datos)
  });

  alert("Gracias " + nombre + ". Tu asistencia ha sido registrada.");

  document.getElementById("nombre").value = "";
  personas = 1;
  document.getElementById("personas").textContent = personas;

  closeModal();
}

function updateCountdown() {
  const eventDate = new Date("August 9, 2026 10:00:00").getTime();
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

let currentSlide = 0;

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

  currentSlide += direction;

  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }

  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }

  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

setInterval(() => {
  moveSlide(1);
}, 5000);
