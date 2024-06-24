const $ = (selector) => document.querySelector(selector);
const $body = document.body;
const $moonIcon = $(".moon-icon");
const $webSiteBtn = $(".website-btn");
const $gitHubBtn = $(".github-btn");

function handleWebSiteClick() {
  $webSiteBtn.onclick = () => {
    window.open("https://neotecs.vercel.app/", "_blank");
  };
}

function handleGitHubProfile() {
  $gitHubBtn.onclick = () => {
    window.open("https://github.com/solidsnk86", "_blank");
  };
}

document.addEventListener("DOMContentLoaded", () => {
  handleWebSiteClick();
  handleGitHubProfile();
});
