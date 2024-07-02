import {
  $,
  handlePrintBtn,
  handleShareBtn,
  handleClickMoreBtn,
  handleLinkedInClick,
  handleGitHubProfile,
  handleTwittwerBtn,
  handleWebSiteClick,
  contactCard,
  imagePrevent,
} from "./actions.mjs";
import { conctactForm } from "./contact-form.mjs";
import { darkMode } from "./dark-mode.mjs";

function formatDate(dat) {
  const day = dat.substring(0, 2);
  const month = dat.substring(2, 4) - 1;
  const year = dat.substring(4, 8);

  const date = new Date(year, month, day).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return date;
}

const createDate = () => {
  $("time").innerHTML = `
  <small style="font-weight: 600">${formatDate("26021986")}</small>
  `;
};

const bringMeData = async () => {
  const response = await fetch("/src/challenges.js");
  const data = await response.text();
  $("#pre").innerHTML = data;
};

document.addEventListener("DOMContentLoaded", () => {
  darkMode();
  imagePrevent();
  contactCard();
  handleLinkedInClick();
  handleWebSiteClick();
  handleGitHubProfile();
  handleTwittwerBtn();
  handleClickMoreBtn();
  handlePrintBtn();
  handleShareBtn();
  createDate();
  conctactForm();
});
