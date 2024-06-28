const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const $body = document.body;
const $toggleDark = $(".right-aside");
const $webSiteBtn = $(".website-btn");
const $gitHubBtn = $(".github-btn");
const $contactBtn = $(".contact-btn");
const $containerContactCard = $(".container-contact-card-info");
const buttons = $$(".container-contact-card button");
const $contactCard = $(".contact-card-info");
const $contactCardHeader = $(".contact-card-info header");
const $linkedInIcon = $(".linkedin-icon");
const moreBtn = $(".more-btn");
const $moreBtnContainer = $(".more-btn-container");
const $printBtn = $(".print-btn");
const $shareBtn = $(".share-btn");
const $twitterBtn = $(".twitter-btn");

function darkMode() {
  $toggleDark.onclick = () => {
    if (!$body.classList.contains("dark-mode")) {
      $body.classList.toggle("dark-mode");
      $(".moon-icon").style.display = "none";
      $(".sun-icon").style.display = "flex";
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
      $(".moon-icon").style.display = "flex";
      $(".sun-icon").style.display = "none";
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

const handleClickMoreBtn = () => {
  moreBtn.onclick = () => {
    if (
      $moreBtnContainer.style.display === "none" ||
      $moreBtnContainer.style.display === ""
    ) {
      $moreBtnContainer.style.display = "flex";
    } else {
      $moreBtnContainer.style.display = "none";
    }
  };

  document.addEventListener("click", outsideClickMore);
};

function outsideClickMore(event) {
  if (!$moreBtnContainer.contains(event.target) && event.target !== moreBtn) {
    $moreBtnContainer.style.display = "none";
  }
}

const handlePrintBtn = () => {
  $printBtn.onclick = () => {
    window.print();
  };
};

const handleShareBtn = () => {
  $shareBtn.onclick = () => {
    if ("share" in navigator) {
      try {
        navigator.share({
          title: document.title,
          text: `Desarrollador Front End`,
          url: location.href,
        });
      } catch (error) {
        throw new Error("El navegador no admite el web share.");
      }
    }
  };
};

const handleLinkedInClick = () => {
  $linkedInIcon.onclick = () => {
    window.open("https://www.linkedin.com/in/gabriel-calcagni/", "_blank");
  };
};

function handleWebSiteClick() {
  const mySite = "https://neotecs.vercel.app/";
  $webSiteBtn.setAttribute("title", `Ir a ${mySite}`);

  $webSiteBtn.onclick = () => {
    window.open(mySite, "_blank");
  };
}

function handleTwittwerBtn() {
  $twitterBtn.setAttribute("title", `Ir al perfil de X de ${document.title}`);
  $twitterBtn.onclick = () => {
    window.open("https://x.com/CalcagniGabriel", "_blank");
  };
}

function handleGitHubProfile() {
  const github = "https://github.com/solidsnk86";
  $gitHubBtn.setAttribute("title", `Ir al repositorio de ${github}`);

  $gitHubBtn.onclick = () => {
    window.open(github, "_blank");
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
    } else {
      closeCard();
    }
  };
}

const saveToLocalStorage = (key, value) => {
  const savedData = localStorage.setItem(key, value);
  return savedData;
};

function conctactForm() {
  const form = $(".contact form");
  const nameForm = $("#name");
  const emailForm = $("#email");
  const subjectForm = $("#subject");
  const messageForm = $("#message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const dataForm = {
      name: nameForm.value,
      email: emailForm.value,
      subject: subjectForm.value,
      message: messageForm.value,
    };

    saveToLocalStorage("data-form", JSON.stringify(dataForm));
    alert(
      `Muchas gracias por contactarme ${dataForm.name}, pronto estaré en contacto a tu dirección de correo: ${dataForm.email}`
    );
    nameForm.value = "";
    emailForm.value = "";
    subjectForm.value = "";
    messageForm.value = "";
  });
}

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

document.addEventListener("DOMContentLoaded", () => {
  darkMode();
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
