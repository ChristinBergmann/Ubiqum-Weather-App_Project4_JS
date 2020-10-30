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
    `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appID}&units=${units},us`
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
    switch (dataServer.weather[0].main) {
      case "Clear":
        document.body.style.backgroundImage = "url('./picturesHOR/res_clear-hor.jpg')";
        break;
      case "Clouds":
        document.body.style.backgroundImage = "url('./picturesHOR/res_brokenclouds-hor.jpg')";
        break;
      case "Fog":
        document.body.style.backgroundImage = "url('./picturesHOR/res_foggy-hor.jpg')";
        break;
      case "Rain":
        document.body.style.backgroundImage = "url('./picturesHOR/res_rainy-hor.jpg')";
        break;
      case "Drizzle":
        document.body.style.backgroundImage = "url('./picturesHOR/res_lightrain-hor.jpg')";
        break;
      case "Smoke":
        document.body.style.backgroundImage = "url('./picturesHOR/res_smoke-hor.jpg')";
        break;
      case "Mist":
        document.body.style.backgroundImage = "url('./picturesHOR/res_mist-hor.jpg')";
        break;
      case "Smog":
        document.body.style.backgroundImage = "url('./picturesHOR/res_smog-hor.jpg')";
        break;
      case "Snow":
        document.body.style.backgroundImage = "url('./picturesHOR/res_snowy-hor.jpg')";
        break;
      case "Thunderstorm":
        document.body.style.backgroundImage = "url('./picturesHOR/res_thunder1-hor.jpg')";
        break;
      // case "clear sky":
      //   document.body.style.backgroundImage = "url('./picturesHOR/res_clear-hor.jpg')";
      //   break;
      // case "light clouds", "few clouds":
      //   document.body.style.backgroundImage = "url('./picturesHOR/res_lightclouds-hor.jpg')";
      //   break;
      // case "overcast clouds":
      //   document.body.style.backgroundImage = "url('./picturesHOR/res_overcast1-ver.jpg')";
      //   break;
      // case "broken clouds":
      //   document.body.style.backgroundImage = "url('./picturesHOR/res_brokenclouds-hor.jpg')";
      //   break;
      // case "scattered clouds":
      //   document.body.style.backgroundImage = "url('./picturesHOR/res_brokenclouds-hor.jpg')";
      //   break;
      // case "light rain", "dizzle":
      //   document.body.style.backgroundImage = "url('./picturesHOR/res_lightrain-hor.jpg')";
      //   break;
      // case "moderate rain":
      //   document.body.style.backgroundImage = "url('./picturesHOR/res_rainy-hor.jpg')";
      //   break;
      // case "thunderstorm", "light thunderstorm", "heavy thunderstorm":
      //   document.body.style.backgroundImage = "url('./picturesHOR/res_thunder1-hor.jpg')";
      //   break;
      // case "smoke":
      //   document.body.style.backgroundImage = "url('./picturesHOR/res_smoke-hor.jpg')";
      //   break;
      // case "smog":
      //   document.body.style.backgroundImage = "url('./picturesHOR/res_smog-hor.jpg')";
      //   break;
      // case "snow", "light snow":
      //   document.body.style.backgroundImage = "url('./picturesHOR/res_snowy-hor.jpg')";
      //   break;
      //     case "mist":
      //   document.body.style.backgroundImage = "url('./picturesHOR/res_mist-hor.jpg')";
      //   break;

      default:
        document.body.style.backgroundImage = "url('./picturesHOR/res2_default.jpg')";
        break;
    }


    let weatherDescriptionMain = document.getElementById("weatherDescriptionMain");
    let temperatureElement = document.getElementById("temperatureMain");
    let humidityElement = document.getElementById("humidity");
    let windElement = document.getElementById("wind");
    let cityName = document.getElementById("cityName");
    let countryName = document.getElementById("countryName");
    let weatherIcon = document.getElementById("iconImg");
    let resultDescription;


    resultDescription = dataServer.weather[0].description;
    weatherIcon.src = "http://openweathermap.org/img/wn/" + dataServer.weather[0].icon + ".png";
    weatherDescriptionMain.innerText = resultDescription.toUpperCase();
    temperatureElement.innerHTML = Math.floor(dataServer.main.temp / 10) + " °C";
    windElement.innerHTML = "Wind blows at " + Math.floor(dataServer.wind.speed) + " mph" + "...";
    cityName.innerHTML = dataServer.name;
    countryName.innerHTML = " ( " + dataServer.sys.country + " ) ";
    humidityElement.innerHTML = "Humidity is by " + dataServer.main.humidity + "% ";

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

function handleKeyPress(e) {
  let searchButton = document.getElementById("searchButton");

  e = e || window.event;
  if (e.keyCode === 13) {
    searchButton.click();
    return false;
  }
}

let searchInput;
searchInput = document.getElementById("searchInput");
searchInput.onkeypress = handleKeyPress;
