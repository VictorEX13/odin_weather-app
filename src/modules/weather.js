const Weather = () => {
  const getWeatherData = async (location) => {
    try {
      const requestData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a0b3085facdd06d98bafb42ec970107b`,
        { mode: "cors" }
      );

      const data = await requestData.json();

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const getRequiredWeatherData = async (location) => {
    const weatherData = await getWeatherData(location);

    return {
      clouds: weatherData.clouds,
      name: weatherData.name,
      main: weatherData.main,
      weather: weatherData.weather,
      wind: weatherData.wind,
    };
  };

  return { getRequiredWeatherData };
};

export default Weather;
