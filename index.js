const api_key = "19d91d18506d2d1acc4cba08e5f56a84";
const city = "Novi Sad";

fetch(
  `http://api.openweathermap.org/data/2.5/forecast?q=${"Novi Sad"}&appid=${"19d91d18506d2d1acc4cba08e5f56a84"}`
)
  .then((response) => response.json())
  .then((data) => {
    let previousDate;
    const oneForecastPerDay = data.list.filter((weatherObject) => {
      const currentDate = new Date(weatherObject.dt_txt).getDate();
      if (currentDate !== previousDate) {
        previousDate = currentDate;
        return true;
      }
      return false;
    });
    const days = [
      "Ponedeljak",
      "Utorak",
      "Sreda",
      "Četvrtak",
      "Petak",
      "Subota",
      "Nedelja",
    ];

    oneForecastPerDay.slice(0, 5).forEach((forecast, index) => {
      const tempInCelsius = (forecast.main.temp - 273.15).toFixed(2);
      const date = new Date(forecast.dt_txt);
      const dayName = days[date.getDay()];
      const weatherBox = document.getElementById(`box${index + 1}`);
      weatherBox.textContent = `${dayName}: Temperatura je ${tempInCelsius}°C`;
    });
  })
  .catch((error) => console.log("Error:", error));
