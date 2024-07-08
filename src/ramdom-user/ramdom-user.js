//* API *//

const ids = [
  "fullname",
  "picture",
  "phone",
  "email",
  "city",
  "address",
  "postcode",
  "birthday",
  "age",
];

const formatDate = (input) => {
  const date = new Date(input).toLocaleDateString("es-Es", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return date;
};

const addImageToFavicon = (url) => {
  const favicon = document.createElement("link");
  favicon.rel = "shortcut icon";
  favicon.type = "image/x-icon";
  favicon.href = url;

  if (favicon) {
    document.head.appendChild(favicon);
  } else {
    console.log("Url img does not exist");
  }
};

const api = {
  url: "https://randomuser.me/api/",
  reader: (data) => {
    let readData = [];
    const res = data.results[0];
    readData.email = res.email;
    readData.phone = res.phone;
    readData.fullname = res.name.first + " " + res.name.last;
    readData.birthday = formatDate(res.dob.date);
    readData.age = res.dob.age + " años";
    readData.picture = res.picture.large;
    readData.city = `${res.location.city}, ${res.location.state} - (${res.location.country})`;
    readData.address = `${res.location.street.name} ${res.location.street.number}`;
    readData.postcode = res.location.postcode;

    return readData;
  },
};

const updateLocalStorage = (data) => {
  for (let id of ids) {
    if (data.hasOwnProperty(id)) {
      localStorage.setItem(id, data[id]);
    } else {
      console.log(`Data has not own property ${id}, id = ${data}`);
    }
  }
  return data;
};

const retrieveDataFromLocalStorage = () => {
  let retrieved = [];
  if (localStorage == null) {
    return null;
  }
  for (let id of ids) {
    const value = localStorage.getItem(id);
    if (value == null) {
      console.log("There is no item for =", id);
      return null;
    }
    retrieved[id] = value;
  }
  return retrieved;
};

const populateCv = (data) => {
  for (let id of ids) {
    const element = document.getElementById(id);

    if (element === null || element === undefined) {
      console.log("There is no id for the element =", id);
      continue;
    }

    if (id == "fullname") {
      document.title = `User ${data[id]}`;
    }

    if (id == "picture") {
      element.src = data[id];
      element.alt = document.title;
      addImageToFavicon(data[id]);
    } else {
      element.innerText = data[id];
    }

    if (id == "email") {
      element.href = `mailto:${data[id]}`;
    }
  }
};

//* SECCION RANDOM CLICK *//

const recarga = () => {
  fetch(api.url, { mode: "cors" })
    .then((response) => response.json())
    .then((data) => api.reader(data))
    .then((data) => updateLocalStorage(data))
    .then((data) => populateCv(data));
};

let data = retrieveDataFromLocalStorage();

if (data == null) {
  recarga();
} else {
  populateCv(data);
}