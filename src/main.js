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

function getURL() {
  const input = document.getElementById("github-url-input");
  $("#title-pre").textContent = `URL: ${input.value}`;
  return input.value;
}

async function bringMeData(event) {
  event.preventDefault();
  const url = getURL();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  try {
    const response = await fetch(proxyUrl + url, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok" + response.statusText);
    }
    const data = await response.text();
   
    document.getElementById("pre").innerHTML = data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  darkMode();
  getURL();
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

  document
    .querySelector(".fetch-form form")
    .addEventListener("submit", bringMeData);
});
