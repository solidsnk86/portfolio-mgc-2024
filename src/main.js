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
import { updatePhotoProfile } from "./google-sheet-edit/googleSheetEdit.mjs";

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

const contadorLetras = (algunTexto) => {
  let Palabras = 0;
  let Caracteres = 0;
  let Vocales = 0;
  let CaracteresRestantes = 2000;

  const maxCaracter = 2000;

  const vocales = "aeiouAEIOUáéíóÁÉÍÓÚ";
  const restriccion = ["puta", "puto", "trolo", "pija", "trola", "chupame"];

  Palabras = algunTexto.trim().split(/\s+/).length;
  const palabras = algunTexto.trim().split(/\s/);

  const contieneMalaPalabra = palabras.some((p) =>
    restriccion.includes(p.toLowerCase())
  );

  if (contieneMalaPalabra) {
    alert(`El texto contiene palabras no permitidas.`);
    window.location.reload();
    return;
  }

  for (let i = 0; i < algunTexto.length; i++) {
    if (vocales.includes(algunTexto[i])) {
      Vocales++;
    }
    if (
      algunTexto[i] !== " " &&
      algunTexto[i] !== "\n" &&
      algunTexto[i] !== "\t"
    ) {
      Caracteres++;
    }
  }

  CaracteresRestantes -= Caracteres;

  if (Caracteres > maxCaracter) {
    alert(
      `Te has pasado del límite máximo de ${maxCaracter} caracteres. Cantidad ingresada: ${Caracteres} caracteres.`
    );
    window.location.reload();
  }

  const loader = document.getElementById("char-length-loader");
  const container = document.getElementById("progress");
  const percentage = (Caracteres / 2000) * 100;
  loader.style.width = `${percentage}%`;
  container.innerText = `% ${percentage.toFixed(1)}`;

  return { Caracteres, Palabras, Vocales, CaracteresRestantes };
};

async function copyText(str) {
  try {
    await navigator.clipboard.writeText(str);
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const dynamicURL = await updatePhotoProfile();
    let coverPic = $(".cover-photo");
    let profilePic = $(".profile-picture");
    coverPic.src = dynamicURL[0].profileCoverPhoto;
    profilePic.src = dynamicURL[0].profilePhoto;
  })();

  const TEXTO = $(".text-anal");

  TEXTO.addEventListener("input", () => {
    let palabras = $("#palabras");
    let vocales = $("#vocales");
    let caracteres = $("#caracteres");
    let caracteresRestantes = $("#char-length");

    if (TEXTO) {
      const res = contadorLetras(TEXTO.innerText);
      palabras.innerText = res.Palabras;
      vocales.innerText = res.Vocales;
      caracteres.innerText = res.Caracteres;
      caracteresRestantes.innerText = res.CaracteresRestantes;
    } else {
      alert("Algo ha fallado!!");
    }
  });

  const copyBtn = $(".copy");
  copyBtn.onclick = () => {
    const content = $(".text-copy");
    const copied = $(".copied");
    if (copyBtn.onclick) {
      copyText(content.innerText);
      copyBtn.style.display = "none";
      copied.style.display = "flex";
      setTimeout(() => {
        copyBtn.style.display = "flex";
        copied.style.display = "none";
      }, 2300);
    }
  };

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
