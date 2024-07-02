export const $ = (selector) => document.querySelector(selector);

const $webSiteBtn = $(".website-btn");
const $gitHubBtn = $(".github-btn");
const $contactBtn = $(".contact-btn");
const $containerContactCard = $(".container-contact-card-info");
const $linkedInIcon = $(".linkedin-icon");
const moreBtn = $(".more-btn");
const $moreBtnContainer = $(".more-btn-container");
const $twitterBtn = $(".twitter-btn");
const $printBtn = $(".print-btn");
const $shareBtn = $(".share-btn");

export function handlePrintBtn() {
  $printBtn.onclick = () => {
    window.print();
  };
}

export function handleShareBtn() {
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
}

export const handleClickMoreBtn = () => {
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

export function outsideClickMore(event) {
  if (!$moreBtnContainer.contains(event.target) && event.target !== moreBtn) {
    $moreBtnContainer.style.display = "none";
  }
}

export function handleLinkedInClick() {
  $linkedInIcon.onclick = () => {
    window.open("https://www.linkedin.com/in/gabriel-calcagni/", "_blank");
  };
}

export function handleWebSiteClick() {
  const mySite = "https://neotecs.vercel.app/";
  $webSiteBtn.setAttribute("title", `Ir a ${mySite}`);

  $webSiteBtn.onclick = () => {
    window.open(mySite, "_blank");
  };
}

export function handleTwittwerBtn() {
  $twitterBtn.setAttribute("title", `Ir al perfil de X de ${document.title}`);
  $twitterBtn.onclick = () => {
    window.open("https://x.com/CalcagniGabriel", "_blank");
  };
}

export function handleGitHubProfile() {
  const github = "https://github.com/solidsnk86";
  $gitHubBtn.setAttribute("title", `Ir al repositorio de ${github}`);

  $gitHubBtn.onclick = () => {
    window.open(github, "_blank");
  };
}

export function closeCard() {
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

export function contactCard() {
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

console.log($(".header .profile-picture"));

export function imagePrevent() {
  const preventHandleImg = (event) => {
    event.preventDefault();
  };

  $(".header img").addEventListener("dragstart", preventHandleImg);
  $(".header img").addEventListener("contextmenu", preventHandleImg);
  $(".header .profile-picture").addEventListener("dragstart", preventHandleImg);
  $(".header .profile-picture").addEventListener(
    "contextmenu",
    preventHandleImg
  );
}
