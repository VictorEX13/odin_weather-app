const Weather = () => {
  const getWeatherData = async (location, temp) => {
    try {
      const requestData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a0b3085facdd06d98bafb42ec970107b&units=${temp}`,
        { mode: "cors" }
      );

      const data = await requestData.json();

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const getRequiredWeatherData = async (location, temp) => {
    try {
      const weatherData = await getWeatherData(location, temp);
      const now = new Date();
      const sunrise = new Date(weatherData.sys.sunrise * 1000);
      const sunset = new Date(weatherData.sys.sunset * 1000);

      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const utcSunrise = sunrise.getTime() + now.getTimezoneOffset() * 60000;
      const utcSunset = sunset.getTime() + now.getTimezoneOffset() * 60000;

      const actualDateTime = utc + 1000 * weatherData.timezone;
      const actualSunrise = utcSunrise + 1000 * weatherData.timezone;
      const actualSunset = utcSunset + 1000 * weatherData.timezone;

      return {
        clouds: weatherData.clouds,
        name: weatherData.name,
        main: weatherData.main,
        weather: weatherData.weather,
        wind: weatherData.wind,
        datetime: {
          current: new Date(actualDateTime),
          sunrise: new Date(actualSunrise),
          sunset: new Date(actualSunset),
        },
      };
    } catch (err) {
      console.log(err.message);
    }
  };

  return { getRequiredWeatherData };
};

export default Weather;
