const currencyData = async () => {
  try {
    const res = await fetch("https://neotecs.vercel.app/api/currency", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching currency data:", error);
  }
};

const convertion = (currency, rate) => {
  const result = currency * rate;
  return parseFloat(result.toFixed(2));
};

const loadCurrencyData = async () => {
  const data = await currencyData();

  if (data) {
    const { success, timestamp, base, update, rates } = data;
    console.log(timestamp);
    document.body.innerText = timestamp;
  } else {
    document.body.innerText = "Failed to load currency data.";
  }
};

// Llama a la función para cargar los datos de la moneda
loadCurrencyData();
