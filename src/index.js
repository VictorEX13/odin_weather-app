import UI from "./modules/UI";
import Weather from "./modules/weather";

const userInterface = UI();
const weather = Weather();

const defaultCity = "Tokyo";

document.addEventListener("DOMContentLoaded", () => {
  userInterface.loadHomePage();
  loadDefaultData();
});

window.addEventListener("load", async () => {
  onFormSubmit();
});

const loadDefaultData = async () => {
  const defaultWeatherData = await weather.getRequiredWeatherData(defaultCity);
  userInterface.renderFetchedData(defaultWeatherData);
};

const onFormSubmit = () => {
  const form = document.querySelector("form");
  const city = document.querySelector("#city");
  const cityError = document.querySelector(".error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const weatherData = await weather.getRequiredWeatherData(city.value);

    if (Object.values(weatherData).every((x) => !x)) {
      cityError.classList.add("active");
      cityError.textContent = "Invalid location";
    } else {
      console.log(weatherData);
      userInterface.renderFetchedData(weatherData);

      cityError.className = "error";
      cityError.textContent = "";
    }
  });
};
