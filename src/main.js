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

const contadorLetras = (algunTexto) => {
  let Palabras = 0;
  let Caracteres = 0;
  let Vocales = 0;
  let CaracteresRestantes = 2000;

  const maxCaracter = 2000;

  const vocales = "aeiouAEIOUáéíóÁÉÍÓÚ";
  const restriccion = [
    "puto",
    "puta",
    "trolo",
    "pija",
    "trola",
    "chupame",
    "pajero",
    "pelotudo",
    "pelotuda",
    "conchudo",
    "conchida",
  ];

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
  conctactForm();
});
