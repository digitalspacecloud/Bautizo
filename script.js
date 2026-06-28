let personas = 1;

const URL_SHEET = "https://script.google.com/macros/s/AKfycbxap5tBvoE2inbYs3lvyLC-uD6BnXFlLyaw35vQSUi7DQq7sU613dVHsJaAiU-bSmWE/exec";

function scrollToInfo() {
  document.getElementById("confirmacion").scrollIntoView({
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

async function saveNoData() {
  const nombre = document.getElementById("nombreNo").value.trim();

  if (nombre === "") {
    alert("Por favor escribe tu nombre.");
    return;
  }

  const datos = {
    nombre: nombre,
    asistencia: "No",
    personas: 0
  };

  await fetch(URL_SHEET, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(datos)
  });

  alert("Gracias por responder.");

  document.getElementById("nombreNo").value = "";
  closeNoModal();
}