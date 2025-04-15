const API_URL_ALL = "https://restcountries.com/v3.1/all";
const API_URL_REGION = "https://restcountries.com/v3.1/region/";
const API_URL_NAME = "https://restcountries.com/v3.1/name/";

const countryCards = document.getElementById("country-cards");
const searchInput = document.getElementById("search");
const regionButtons = document.querySelectorAll("#region-filters button");


fetchCountries(API_URL_ALL);

function fetchCountries(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => renderCountries(data))
    .catch(err => console.error("Klaida:", err));
}

function renderCountries(countries) {
  countryCards.innerHTML = ""; 

  countries.forEach(country => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${country.flags.svg}" alt="Vėliava" />
      <h3>${country.name.common}</h3>
      <p>Sostinė: ${country.capital ? country.capital[0] : "Nėra duomenų"}</p>
      <p>Regionas: ${country.region}</p>
      <button onclick="openCountryDetails('${country.name.common}')">Daugiau</button>
    `;

    countryCards.appendChild(card);
  });
}


regionButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const region = btn.dataset.region;
    const url = region === "all" ? API_URL_ALL : API_URL_REGION + region;
    fetchCountries(url);
  });
});


searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value;
  if (searchTerm.length > 1) {
    fetchCountries(API_URL_NAME + searchTerm);
  } else {
    fetchCountries(API_URL_ALL);
  }
});


function openCountryDetails(name) {
  alert(`Rodoma daugiau informacijos apie: ${name}`);
  
}
