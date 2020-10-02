let units = "metric";
let searchMethod;

function getSearchMethod(searchTerm) {
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + "" === searchTerm
  )
    searchMethod = "zip";
  else searchMethod = "q";
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);

  fetch(
    `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appID}&units=${units},us`
  )
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      if (result.cod === 200) {
        init(result);
      } else {
        resultMessage = window.alert(
          result.message +
            ": " +
            " add ' a comma and country code ' and try again!"
        );
      }
    });
}

function init(dataServer) {
  console.log(dataServer);
  switch (dataServer.weather[0].description) {
    case "Clear":
      document.body.style.backgroundImage = "url('./pictures/clear1.jpg')";
      break;
    case "Clouds":
      document.body.style.backgroundImage = "url('./pictures/cloudy.jpg')";
      break;
    case "Fog":
      document.body.style.backgroundImage = "url('./pictures/foggy.jpg')";
      break;
    case "Rain":
    case "Drizzle":
      document.body.style.backgroundImage = "url('./pictures/rainy.jpg')";
      break;
    case "Smoke":
      document.body.style.backgroundImage = "url('./pictures/smoke.jpg')";
      break;
    case "Mist":
      document.body.style.backgroundImage = "url('./pictures/mist.jpg')";
      break;
    case "Snow":
      document.body.style.backgroundImage = "url('./pictures/snowy.jpg')";
      break;
    case "Thunderstorm":
      document.body.style.backgroundImage = "url('./pictures/stormy.jpg')";
      break;
    case "clear sky":
      document.body.style.backgroundImage = "url('./pictures/clear1.jpg')";
      break;
    case "light clouds":
      document.body.style.backgroundImage = "url('./pictures/cloudylight.jpg')";
      break;
    case "overcast clouds":
      document.body.style.backgroundImage = "url('./pictures/overcast1.jpg')";
      break;
    case "broken clouds":
      document.body.style.backgroundImage =
        "url('./pictures/broken-clouds.jpg')";
      break;
    case "scattered clouds":
      document.body.style.backgroundImage = "url('./pictures/cloudy2.jpg')";
      break;
    case "light rain":
      document.body.style.backgroundImage = "url('./pictures/lightrain.jpg')";
      break;
    case "moderate rain":
      document.body.style.backgroundImage = "url('./pictures/rainy.jpg')";
      break;

    default:
      document.body.style.backgroundImage = "url('./pictures/clear.jpg')";
      break;
  }
  // console.log(dataServer.weather[0].main);
  // console.log(dataServer.weather[0].description);
  let weatherDescriptionMain = document.getElementById(
    "weatherDescriptionMain"
  );
  let temperatureElement = document.getElementById("temperatureMain");
  let humidityElement = document.getElementById("humidity");
  let windElement = document.getElementById("wind");
  let cityName = document.getElementById("cityName");
  let weatherIcon = document.getElementById("iconImg");

  weatherIcon.src =
    "http://openweathermap.org/img/wn/" + dataServer.weather[0].icon + ".png";

  let resultDescription = dataServer.weather[0].description;
  weatherDescriptionMain.innerText = resultDescription.toUpperCase();

  temperatureElement.innerHTML =
    Math.floor(dataServer.main.temp / 10) + " °C" + "...yeah";
  console.log(temperatureElement);
  windElement.innerHTML =
    "Wind blows at " + Math.floor(dataServer.wind.speed) + " mph" + "...wohoo";
  console.log(windElement);
  cityName.innerHTML = dataServer.name;
  humidityElement.innerHTML =
    "Humidity is by " + dataServer.main.humidity + "% ";
  console.log(humidityElement);

  setPositionWeatherBox();
}

function setPositionWeatherBox() {
  let weatherContainer = document.getElementById("weatherContainer");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 2}px)`;
  weatherContainer.style.visibility = "visible";
}

document.getElementById("searchButton").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) searchWeather(searchTerm);
});
