const $ = (el) => document.querySelector(el);

const copy = async (str) => {
  try {
    await navigator.clipboard.writeText(str);
    alert("URL copiada al portapapeles");
  } catch (err) {
    console.error("Error al copiar al portapapeles:", err);
  }
};

function getURL() {
  const input = $("#github-url-input");
  $(
    "#title-pre"
  ).innerHTML = `URL: <a href="${input.value}">${input.value}</a>`;
  return input.value;
}

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
          ? "File not found 404"
          : "Method not allowed 403"
      );
    }
    const data = await response.text();

    const lines = data.split("\n");
    let numberedLines = "";

    for (let i = 0; i < lines.length; i++) {
      numberedLines += `<small>${i + 1}</small> <code>${lines[i]}</code>
      <br>`;
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
