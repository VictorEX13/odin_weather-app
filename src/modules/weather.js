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
    const weatherData = await getWeatherData(location, temp);
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const actualDateTime = utc + 1000 * weatherData.timezone;

    return {
      clouds: weatherData.clouds,
      name: weatherData.name,
      main: weatherData.main,
      weather: weatherData.weather,
      wind: weatherData.wind,
      datetime: new Date(actualDateTime),
    };
  };

  return { getRequiredWeatherData };
};

export default Weather;
