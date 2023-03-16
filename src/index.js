import UI from "./modules/UI";
import Weather from "./modules/weather";

const userInterface = UI();
const weather = Weather();

document.addEventListener("DOMContentLoaded", userInterface.loadHomePage);

window.addEventListener("load", () => {
  onFormSubmit();
});

const onFormSubmit = () => {
  const form = document.querySelector("form");
  const city = document.querySelector("#city");
  const cityError = document.querySelector(".error");

  form.addEventListener("submit", async (e) => {
    const test = await weather.getRequiredWeatherData(city.value);

    if (Object.values(test).every((x) => !x)) {
      cityError.classList.add("active");
      cityError.textContent = "Invalid location";
    } else {
      console.log(test);

      cityError.className = "error";
      cityError.textContent = "";
    }

    e.preventDefault();
  });
};
