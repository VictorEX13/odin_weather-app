import "../styles/main.css";
import { format } from "date-fns";

const UI = () => {
  const loadHomePage = () => {
    const body = document.querySelector("body");

    const header = getHeader();
    const main = getMain();

    body.append(header, main);
  };

  // Default Header

  const getHeader = () => {
    const header = document.createElement("header");
    const form = document.createElement("form");

    const switchTemperature = document.createElement("div");
    const inputContainer = document.createElement("div");

    const metricButton = document.createElement("button");
    const imperialButton = document.createElement("button");
    const cityInput = document.createElement("input");
    const searchButton = document.createElement("button");
    const errorSpan = document.createElement("span");

    cityInput.id = "city";

    switchTemperature.className = "switch-temperature";
    inputContainer.className = "input-container";

    metricButton.className = "celsius";
    imperialButton.className = "fahrenheit";
    searchButton.className = "search-button";
    errorSpan.className = "error";

    metricButton.textContent = "metric";
    imperialButton.textContent = "imperial";
    searchButton.textContent = "Search";

    metricButton.setAttribute("type", "button");
    imperialButton.setAttribute("type", "button");
    cityInput.setAttribute("placeholder", "Input a city name...");
    cityInput.setAttribute("autocomplete", "off");

    switchTemperature.append(metricButton, imperialButton);
    inputContainer.append(cityInput, searchButton);

    form.append(switchTemperature, inputContainer, errorSpan);

    header.appendChild(form);

    return header;
  };

  // ----------------------------------------------

  // Default Main

  const getMain = () => {
    const main = document.createElement("main");
    const weatherInfo = document.createElement("section");
    const weatherDetails = document.createElement("section");

    weatherInfo.className = "weather-info";
    weatherDetails.className = "weather-details";

    // Info

    const cityName = document.createElement("p");
    const cityDate = document.createElement("p");
    const cityTime = document.createElement("p");
    const temperature = document.createElement("p");
    const weatherDescription = document.createElement("p");

    cityName.className = "city-name";
    cityDate.className = "city-date";
    cityTime.className = "city-time";
    temperature.className = "temperature";
    weatherDescription.className = "weather-description";

    // Details

    const rainArticle = document.createElement("div");
    const feelsLikeArticle = document.createElement("div");
    const humidityArticle = document.createElement("div");
    const pressureArticle = document.createElement("div");
    const windSpeedArticle = document.createElement("div");
    const windDirectionArticle = document.createElement("div");

    const rainLabel = document.createElement("span");
    const feelsLikeLabel = document.createElement("span");
    const humidityLabel = document.createElement("span");
    const pressureLabel = document.createElement("span");
    const windSpeedLabel = document.createElement("span");
    const windDirectionLabel = document.createElement("span");

    const rain = document.createElement("p");
    const feelsLike = document.createElement("p");
    const humidity = document.createElement("p");
    const pressure = document.createElement("p");
    const windSpeed = document.createElement("p");
    const windDirection = document.createElement("p");

    rainArticle.className = "weather-details-article rain-article";
    feelsLikeArticle.className = "weather-details-article feels-like-article";
    humidityArticle.className = "weather-details-article humidity-article";
    pressureArticle.className = "weather-details-article pressure-article";
    windSpeedArticle.className = "weather-details-article wind-speed-article";
    windDirectionArticle.className =
      "weather-details-article wind-direction-article";

    rain.className = "rain";
    feelsLike.className = "feels-like";
    humidity.className = "humidity";
    pressure.className = "pressure";
    windSpeed.className = "wind-speed";
    windDirection.className = "wind-direction";

    rainLabel.textContent = "Chances of rain";
    feelsLikeLabel.textContent = "Fees like";
    humidityLabel.textContent = "Humidity";
    pressureLabel.textContent = "Pressure";
    windSpeedLabel.textContent = "Wind speed";
    windDirectionLabel.textContent = "Wind direction";

    rainArticle.append(rainLabel, rain);
    feelsLikeArticle.append(feelsLikeLabel, feelsLike);
    humidityArticle.append(humidityLabel, humidity);
    pressureArticle.append(pressureLabel, pressure);
    windSpeedArticle.append(windSpeedLabel, windSpeed);
    windDirectionArticle.append(windDirectionLabel, windDirection);

    // -------------------------

    weatherInfo.append(
      cityName,
      cityDate,
      cityTime,
      temperature,
      weatherDescription
    );

    weatherDetails.append(
      rainArticle,
      feelsLikeArticle,
      humidityArticle,
      pressureArticle,
      windSpeedArticle,
      windDirectionArticle
    );

    main.append(weatherInfo, weatherDetails);

    return main;
  };

  // Render Weather Data

  const renderFetchedData = async (data, temp) => {
    const cityName = document.querySelector(".city-name");
    const cityDate = document.querySelector(".city-date");
    const cityTime = document.querySelector(".city-time");
    const temperature = document.querySelector(".temperature");
    const weatherDescription = document.querySelector(".weather-description");

    const rain = document.querySelector(".rain");
    const feelsLike = document.querySelector(".feels-like");
    const humidity = document.querySelector(".humidity");
    const pressure = document.querySelector(".pressure");
    const windSpeed = document.querySelector(".wind-speed");
    const windDirection = document.querySelector(".wind-direction");

    cityName.textContent = `${data.name},`;
    cityDate.textContent = format(data.datetime.current, "EEEE, do MMM `yy");
    cityTime.textContent = format(data.datetime.current, "h:mm a");
    temperature.textContent = `${Math.round(data.main.temp)} ${
      temp === "metric" ? "°C" : "°F"
    }`;
    weatherDescription.textContent = `${data.weather[0].description}`;

    rain.textContent = `${data.clouds.all} %`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)} ${
      temp === "metric" ? "°C" : "°F"
    }`;
    humidity.textContent = `${data.main.humidity} %`;
    pressure.textContent = `${data.main.pressure} hPa`;
    windSpeed.textContent =
      temp === "metric"
        ? `${Math.round(3.6 * data.wind.speed * 10) / 10} km/h`
        : `${Math.round(data.wind.speed * 10) / 10} mph`;
    windDirection.textContent = `${data.wind.deg} °`;

    const timeStatus =
      data.datetime.current > data.datetime.sunrise &&
      data.datetime.current < data.datetime.sunset
        ? 1
        : 2;

    changeBackgroundGif(timeStatus);
  };

  // Set gif according to current time

  const changeBackgroundGif = async (timeStatus) => {
    try {
      const body = document.querySelector("body");
      let response;

      if (timeStatus === 1) {
        response = await fetch(
          "https://api.giphy.com/v1/gifs/1TpGKApbHmkZa?api_key=RsgcI9BI1Jwa6MH5xJRLuX0YMiJlA5wV",
          { mode: "cors" }
        );

        body.className = "dark";
      } else {
        response = await fetch(
          "https://api.giphy.com/v1/gifs/XgtJCYMbPvMe4?api_key=RsgcI9BI1Jwa6MH5xJRLuX0YMiJlA5wV",
          { mode: "cors" }
        );

        body.className = "light";
      }

      const gifData = await response.json();

      body.style.backgroundImage = `url(${gifData.data.images.original.url})`;
    } catch (err) {
      console.log(err.message);
    }
  };

  return { loadHomePage, renderFetchedData };
};

export default UI;
