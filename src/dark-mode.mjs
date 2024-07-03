import { $ } from "./actions.mjs";
const $body = document.body;

const $toggleDark = $(".right-aside");
const $contactCard = $(".contact-card-info");
const $contactCardHeader = $(".contact-card-info header");
const $moreBtnContainer = $(".more-btn-container");

export function darkMode() {
  $toggleDark.onclick = () => {
    if (!$body.classList.contains("dark-mode")) {
      $body.classList.toggle("dark-mode");
      $(".moon-icon").style.display = "flex";
      $(".sun-icon").style.display = "none";
      localStorage.setItem("dark-mode", true);
      $moreBtnContainer.style.background = "#1b1f23";
      $moreBtnContainer.style.border = "1px solid #222";
      $moreBtnContainer.style.color = "#e9e9e9";
      $contactCard.style.background = "#1b1f23";
      $contactCard.style.color = "#e9e9e9";
      $contactCard.style.border = "1px solid #222";
      $contactCardHeader.style.borderBottom = "1px solid #222";
    } else {
      $body.classList.toggle("dark-mode");
      $(".moon-icon").style.display = "none";
      $(".sun-icon").style.display = "flex";
      localStorage.removeItem("dark-mode");
      $moreBtnContainer.classList.toggle("dark-mode");
      $moreBtnContainer.style.background = "#eee";
      $moreBtnContainer.style.border = "1px solid #ddd";
      $moreBtnContainer.style.color = "#111";
      $contactCard.style.background = "#eee";
      $contactCard.style.color = "#111";
      $contactCard.style.border = "1px solid #ddd";
      $contactCardHeader.style.borderBottom = "1px solid #ddd";
    }
  };
}
