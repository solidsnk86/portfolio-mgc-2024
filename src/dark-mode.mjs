import { $ } from "./actions.mjs";
const $$ = (selector) => document.querySelectorAll(selector);
const $body = document.body;

const $toggleDark = $(".right-aside");
const $contactCard = $(".contact-card-info");
const $contactCardHeader = $(".contact-card-info header");
const $moreBtnContainer = $(".more-btn-container");
const $textAnalyzer = $(".text-anal");
const $tableAnalyzerH = $$(".table-container th");
const $tableAnalyzerB = $$(".table-container td");
const $copy = $(".copy");
const $copied = $(".copied");

export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function darkMode() {
  if (localStorage.getItem("dark-mode") === "true") {
    applyDarkMode();
  }

  $toggleDark.onclick = () => {
    if (!$body.classList.contains("dark-mode")) {
      applyDarkMode();
    } else {
      removeDarkMode();
    }
  };
}

function applyDarkMode() {
  $body.classList.add("dark-mode");
  $(".sun-icon").style.display = "none";
  $(".moon-icon").style.display = "flex";
  saveToLocalStorage("dark-mode", "true");

  $moreBtnContainer.style.background = "#1b1f23";
  $moreBtnContainer.style.border = "1px solid #222";
  $moreBtnContainer.style.color = "#e9e9e9";
  $textAnalyzer.style.border = "1px solid #333";
  $tableAnalyzerH.forEach((table) => {
    table.style.border = "1px solid #333";
  });
  $tableAnalyzerB.forEach((table) => {
    table.style.border = "1px solid #333";
  });
  $copy.style.backgroundColor = "#303030";
  $copied.style.backgroundColor = "#303030";

  $contactCard.style.background = "#1b1f23";
  $contactCard.style.color = "#e9e9e9";
  $contactCard.style.border = "1px solid #222";
  $contactCardHeader.style.borderBottom = "1px solid #222";
}

function removeDarkMode() {
  $body.classList.remove("dark-mode");
  $(".sun-icon").style.display = "flex";
  $(".moon-icon").style.display = "none";
  localStorage.removeItem("dark-mode");

  $moreBtnContainer.style.background = "#eee";
  $moreBtnContainer.style.border = "1px solid #ddd";
  $moreBtnContainer.style.color = "#111";
  $textAnalyzer.style.border = "1px solid #eee";
  $tableAnalyzerH.forEach((table) => {
    table.style.border = "1px solid #eee";
  });
  $tableAnalyzerB.forEach((table) => {
    table.style.border = "1px solid #eee";
  });
  $copy.style.backgroundColor = "#eee";
  $copied.style.backgroundColor = "#eee";

  $contactCard.style.background = "#eee";
  $contactCard.style.color = "#111";
  $contactCard.style.border = "1px solid #ddd";
  $contactCardHeader.style.borderBottom = "1px solid #ddd";
}
