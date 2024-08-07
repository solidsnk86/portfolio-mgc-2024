import { $ } from "./actions.mjs";

const saveToLocalStorage = (key, value) => {
  const savedData = localStorage.setItem(key, value);
  return savedData;
};

export async function sendData({ name, email, subject, message }) {
  const dataForm = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  };
  const urlPortfolio = "https://github.com/solidsnk86/portfolioWeb";
  const res = await fetch("/src/form-sender.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  });

  if (res.ok) {
    alert(
      `Estimado/a ${dataForm.name} su mensaje se ha enviado correctamente.`
    );
  } else {
    console.error(
      `This form not could be send in this static environment from Github pages, you need a service like Vercel to introduce your env data for Supabase credentials you need to checkout my repo in: ${urlPortfolio}`
    );
  }
}

const createContainer = () => {
  const containerCard = document.createElement("section");
  containerCard.classList.add("container-message-card");
  return containerCard;
};

const createCard = (name, email) => {
  const card = document.createElement("div");
  card.classList.add("contact-message-card");
  card.innerHTML = `
    <article>
      <p>Estimada/o: <span>${name}</span>, muchas gracias por contactarme. Pronto estaré enviando un mensaje a tu correo: <span>${email}</span></p>
      <button>Entendido</button>
    </article>
  `;

  return card;
};

const appendCardToBody = (name, email) => {
  const containerCard = createContainer();
  const card = createCard(name, email);
  containerCard.appendChild(card);
  document.body.appendChild(containerCard);

  const handleClickOutside = (event) => {
    if (containerCard.contains(event.target)) {
      containerCard.removeChild(card);
      document.body.removeChild(containerCard);
      document.removeEventListener("click", handleClickOutside);
    }
  };

  document.addEventListener("click", handleClickOutside);
};

export function conctactForm() {
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

    sendData(dataForm.name, dataForm.email, dataForm.subject, dataForm.message);
    saveToLocalStorage("data-form", JSON.stringify(dataForm));
    appendCardToBody(dataForm.name, dataForm.email);
    nameForm.value = "";
    emailForm.value = "";
    subjectForm.value = "";
    messageForm.value = "";
  });
}
