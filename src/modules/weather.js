const Weather = () => {
  const getWeatherData = async (location) => {
    try {
      const requestData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a0b3085facdd06d98bafb42ec970107b`,
        { mode: "cors" }
      );

      const data = requestData.json();

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  return { getWeatherData };
};

export default Weather;
