import "../styles/main.css";

const UI = () => {
  const loadHomePage = () => {
    const body = document.querySelector("body");

    const header = getHeader();
    const main = getMain();

    body.append(header, main);
  };

  const getHeader = () => {
    const header = document.createElement("header");
    const form = document.createElement("form");

    const inputContainer = document.createElement("div");

    const cityInput = document.createElement("input");
    const searchButton = document.createElement("button");
    const errorSpan = document.createElement("span");

    cityInput.id = "city";

    inputContainer.className = "input-container";
    searchButton.className = "search-button";
    errorSpan.className = "error";

    searchButton.textContent = "Search";

    cityInput.setAttribute("placeholder", "Input a city name...");

    inputContainer.append(cityInput, searchButton);

    form.append(inputContainer, errorSpan);

    header.appendChild(form);

    return header;
  };

  const getMain = () => {
    const main = document.createElement("main");

    return main;
  };

  return { loadHomePage };
};

export default UI;
