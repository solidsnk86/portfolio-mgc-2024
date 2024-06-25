const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const $body = document.body;
const $toggleDark = $(".right-aside");
const $webSiteBtn = $(".website-btn");
const $gitHubBtn = $(".github-btn");
const $contactBtn = $(".contact-btn");
const $containerContactCard = $(".container-contact-card");
const buttons = $$(".container-contact-card button");

function darkMode() {
  $toggleDark.onclick = () => {
    if (!$body.classList.contains("dark-mode")) {
      $body.classList.toggle("dark-mode");
      $(".moon-icon").style.display = "none";
      $(".sun-icon").style.display = "flex";
      localStorage.setItem("dark-mode", true);
    } else {
      $body.classList.toggle("dark-mode");
      $(".moon-icon").style.display = "flex";
      $(".sun-icon").style.display = "none";
      localStorage.removeItem("dark-mode");
    }
  };
}

function handleWebSiteClick() {
  const mySite = "https://neotecs.vercel.app/";
  $webSiteBtn.setAttribute("title", `Ir a ${mySite}`);

  $webSiteBtn.onclick = () => {
    window.open(mySite, "_blank");
  };
}

function handleGitHubProfile() {
  const github = "https://github.com/solidsnk86";
  $gitHubBtn.setAttribute("title", `Ir al repositorio de ${github}`);

  $gitHubBtn.onclick = () => {
    window.open(github, "_blank");
  };
}

function sendMail() {
  const email = "calcagni.gabriel86@gmail.com";
  const subject = "Oportunidad de Colaboración Profesional";
  const body =
    "Hola Gabriel,\n\nEspero que te encuentres bien. Me gustaría ponerme en contacto contigo para discutir una interesante oportunidad de trabajo. Tu experiencia y habilidades serían una gran contribución a nuestro proyecto.\n\nPor favor, avísame cuándo sería un buen momento para hablar.\n\nSaludos cordiales,\n[Tu Nombre]";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  buttons[0].style.cursor = "pointer";
  buttons[0].setAttribute("title", `Enviar un correo a ${email}`);

  buttons[0].onclick = () => {
    window.location.href = mailtoLink;
  };
}

function sendWAP() {
  const number = "5492665290020";
  const message =
    "Hola Gabriel, Espero que te encuentres bien. Me gustaría ponerme en contacto contigo para discutir sobre un nuevo proyecto. Contáctame lo antes posible. Saludos";

  const encodedMessage = encodeURIComponent(message);
  const wapLink = `https://api.whatsapp.com/send?phone=${number}&text=${encodedMessage}`;

  buttons[1].style.cursor = "pointer";
  buttons[1].setAttribute("title", `Enviar WhatsApp a +${number}`);

  buttons[1].onclick = () => {
    window.open(wapLink, "_blank");
  };
}

function closeCard() {
  $containerContactCard.style.display = "none";
  document.removeEventListener("click", handleOutSideClick);
}

function handleOutSideClick(event) {
  if (
    $containerContactCard.contains(event.target) &&
    event.target === $containerContactCard
  ) {
    closeCard();
  }
}

function contactCard() {
  $contactBtn.onclick = () => {
    if (
      $containerContactCard.style.display === "none" ||
      !$containerContactCard.style.display
    ) {
      $containerContactCard.style.display = "flex";
      document.addEventListener("click", handleOutSideClick);
      document.addEventListener("click", sendMail);
      document.addEventListener("click", sendWAP);
    } else {
      closeCard();
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  darkMode();
  contactCard();
  handleWebSiteClick();
  handleGitHubProfile();
});
