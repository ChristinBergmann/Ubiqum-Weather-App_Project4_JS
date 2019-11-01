let appID = '3038a6bb750f3bd12c90c7b1e2091aae';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm)
        searchMethod = "zip"
    else
        searchMethod = "q"
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);

    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appID}&units=${units}`) /*maybe put ,us back on link in the end*/
        .then(result => {
            return result.json();
        }).then(result => {
            init(result);
        })

}

function init(dataServer) {
    // console.log(dataServer)
    switch (dataServer.weather[0].main) {
        case "Clear":
            document.body.style.backgroundImage = "url('./pictures/clear.jpg')";
            break;

        case "Clouds":
            document.body.style.backgroundImage = "url('./pictures/cloudy.jpg')";
            break;

        case "Rain":
        case "Drizzle":
        case "Mist":
            document.body.style.backgroundImage = "url('./pictures/rainy.jpg')";
            break;

        case "Snow":
            document.body.style.backgroundImage = "url('./pictures/snowy.jpg')";
            break;

        case "Thunderstorm":
            document.body.style.backgroundImage = "url('./pictures/stormy.jpg')";
            break;

        default:
            break;
    }
    let weatherDescriptionText = document.getElementById("weatherDescriptionText")
    let temperatureElement = document.getElementById("temperatureMain")
    let humidityElement = document.getElementById("humidity")
    let windElement = document.getElementById("wind")
    let cityName = document.getElementById("cityName")
    let weatherIcon = document.getElementById("iconImg")

    weatherIcon.src = "http://openweathermap.org/img/wn/" + dataServer.weather[0].icon + ".png";

    let resultDescription = dataServer.weather[0].description;
    weatherDescriptionText.innerText = resultDescription.toUpperCase();

    /* does not work for some reason its displaying in console*/
    temperatureElement.innerHTML = Math.floor(dataServer.main.temp) + " °F" + "...yeah";
    console.log(temperatureElement)
    windElement.innerHTML = "Wind blows like " + Math.floor(dataServer.wind.speed) + " mph" + "...wohoo";
    console.log(windElement)
    cityName.innerHTML = dataServer.name;
    humidityElement.innerHTML = "It`s " + dataServer.main.humidity + "% " + "humid" + "!!!";
    console.log(humidityElement)



}

document.getElementById("searchButton").addEventListener("click", () => {
    let searchTerm = document.getElementById("searchInput").value;
    if (searchTerm)
        searchWeather(searchTerm);
})