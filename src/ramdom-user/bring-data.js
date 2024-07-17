const $ = (el) => document.querySelector(el);

const copy = async (str) => {
  try {
    await navigator.clipboard.writeText(str);
    alert("Texto copiado al portapapeles");
  } catch (err) {
    console.error("Error al copiar al portapapeles:", err);
  }
};

const content = $(".notice span");
const copyBtn = $(".notice copy");

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    copy(content.innerText);
  });
}

const preCopyBtn = $("#title-pre copy");
const preContent = $("#pre");
if (preCopyBtn) {
  preCopyBtn.onclick = () => {
    copy(preContent.innerText);
  };
}

function getURL() {
  const input = $("#github-url-input");
  $(
    "#title-pre"
  ).innerHTML = `URL: <a href="${input.value}">${input.value}</a>`;
  return input.value;
}

async function bringMeData() {
  const url = await getURL();

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
          : "Error en el modo"
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

document.addEventListener("DOMContentLoaded", async () => {
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    bringMeData();
  });
});
