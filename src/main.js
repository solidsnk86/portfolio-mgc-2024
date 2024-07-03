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
    <small style="font-weight: 500; color: #666;">
      ${formatDate("26021986")}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="14" 
        height="14" 
        fill="currentColor" 
        class="bi bi-cake" 
        viewBox="0 0 16 16"
        style="margin-inline: 3px;"
        >
        <path 
        d="m7.994.013-.595.79a.747.747 0 0 0 .101 1.01V4H5a2 2 0 0 0-2 2v3H2a2 2 0 0 0-2 2v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a2 2 0 0 0-2-2h-1V6a2 2 0 0 0-2-2H8.5V1.806A.747.747 0 0 0 8.592.802zM4 6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v.414a.9.9 0 0 1-.646-.268 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0A.9.9 0 0 1 4 6.414zm0 1.414c.49 0 .98-.187 1.354-.56a.914.914 0 0 1 1.292 0c.748.747 1.96.747 2.708 0a.914.914 0 0 1 1.292 0c.374.373.864.56 1.354.56V9H4zM1 11a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.793l-.354.354a.914.914 0 0 1-1.293 0 1.914 1.914 0 0 0-2.707 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0L1 11.793zm11.646 1.854a1.915 1.915 0 0 0 2.354.279V15H1v-1.867c.737.452 1.715.36 2.354-.28a.914.914 0 0 1 1.292 0c.748.748 1.96.748 2.708 0a.914.914 0 0 1 1.292 0c.748.748 1.96.748 2.707 0a.914.914 0 0 1 1.293 0Z"
        />
      </svg>
    </small>
  `;
};

function getURL() {
  const input = document.getElementById("github-url-input");
  $(
    "#title-pre"
  ).innerHTML = `URL: <a href="${input.value}">${input.value}</a>`;
  return input.value;
}

async function bringMeData(event) {
  event.preventDefault();
  const url = getURL();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error(
        response.statusText === "Not Found"
          ? "Archivo no encontrado"
          : "Error de tipeo"
      );
    }
    const data = await response.text();

    const lines = data.split("\n");
    let numberedLines = "";
    /*
     * Ciclos que se pueden llegar a utilizar tambíén para listar las lineas:

      lines.forEach((line, index) => {
       numeredLines += `<span style="margin-right: 5px">${index + 1}</span> ${line}<br>`;
      })

      let counter = 0;
      for (const line of lines) {
        counter++;
        numeredLines += `<span style="margin-right: 5px">${counter}</span> ${line}<br>`;
      }
      Método clásico:
     */
    for (let i = 0; i < lines.length; i++) {
      numberedLines += `<span style="margin-right: 10px">${i + 1}</span> ${
        lines[i]
      }<br>`;
    }

    document.getElementById("pre").innerHTML = numberedLines;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    document.getElementById("pre").innerHTML = error;
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
