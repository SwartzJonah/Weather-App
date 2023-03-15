/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
const date = new Date();
const dateOffset = date.getTimezoneOffset() * 60;
const UTC = addSeconds(date, dateOffset);
let spacing = '\xa0\xa0\xa0\xa0\xa0';

const searchForm = document.querySelector("#searchForm");

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let location = searchForm.elements['location'].value;
    getWeather(location);
})


async function getWeather(city) {
    const contentDiv = document.querySelector("#content");
    const newcity = city.toString()
    const response = await
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + newcity + '&APPID=0aa2d1d8bde34a199d429347227fd53b');
    const data = await response.json();

    const place = data.name;

    const weatherName = data.weather[0].main;

    const weatherDescription = data.weather[0].description;


    const kelvinTemperature = data.main.temp;
    const kelvinMax = data.main.temp_max;
    const kelvinMin = data.main.temp_min

    const celsiusTemperature = changeToC(kelvinTemperature);
    const celsiusMax = changeToC(kelvinMax);
    const celsiusMin = changeToC(kelvinMin);


    const fahrenheitTemperature = changeToF(celsiusTemperature);
    const fahrenheitMax = changeToF(celsiusMax);
    const fahrenheitMin = changeToF(celsiusMin);


    const timezone = data.timezone

    const humidity = data.main.humidity;


    const localWeather = locationFactory(place, weatherName, weatherDescription,
        celsiusTemperature, celsiusMin, celsiusMax,
        fahrenheitTemperature, fahrenheitMin, fahrenheitMax,
        timezone, humidity);

    const blockDiv = document.createElement("div");
    const locationDiv = document.createElement("div");
    locationDiv.textContent = "Location: " + localWeather.location;
    blockDiv.appendChild(locationDiv)
    const timeDiv = document.createElement("div");
    //switch to date thing
    timeDiv.textContent = "Time: " + localWeather.time;
    blockDiv.appendChild(timeDiv)
    const weatherDiv = document.createElement("div");
    weatherDiv.textContent = "Weather: " + localWeather.weather + spacing + " Subweather: " + localWeather.weatherDesc;
    blockDiv.appendChild(weatherDiv)
    const cTempDiv = document.createElement("div");
    cTempDiv.textContent = "Temperature: " + localWeather.celcTemp + "°C" + spacing + "Max: " + localWeather.celcMax + "°C" + spacing + "Min: " + localWeather.celcMin + "°C";
    blockDiv.appendChild(cTempDiv)
    const fTempDiv = document.createElement("div");
    fTempDiv.textContent = "Temperature: " + localWeather.fahTemp + "°F" + spacing + "Max: " + localWeather.fahMax + "°F" + spacing + "Min: " + localWeather.fahMin + "°F";
    blockDiv.appendChild(fTempDiv)
    const humidDiv = document.createElement("div");
    humidDiv.textContent = "Humidity: " + localWeather.humid + "%";
    blockDiv.appendChild(humidDiv)
    contentDiv.appendChild(blockDiv);
    console.log(localWeather);

    addSeconds(UTC, timezone * -1);
}

const locationFactory = (
    location,
    weather, weatherDesc,
    celcTemp, celcMin, celcMax,
    fahTemp, fahMin, fahMax,
    timezone, humid
) => {
    let time = addSeconds(UTC, timezone);
    let brokenDate = time.toUTCString();
    console.log(brokenDate)
    let fullDate = dateFactory(brokenDate)
    //send in full date
    console.log(fullDate);
    return {
        location, weather, weatherDesc, celcTemp, celcMin, celcMax, fahTemp, fahMin, fahMax,
        time, humid
    }

}

const dateFactory = (date) => {
    let dayOfWeek = date.slice(0,3);
    let dayOfMonth = date.slice(5,7);
    let month = date.slice(8,11);
    let hours = date.slice(17,19);
    console.log(hours)
    let hoursInt = parseInt(hours);
    let minutes = date.slice(20,22)
    console.log(minutes)
    let amPM = "";
    if(hoursInt > 12){
        hoursInt-12
        amPM = "pm"
    } else {
        amPM = "am" 
    }
    let time = hoursInt + ":" + minutes + " " + amPM;
    return {dayOfWeek, month, dayOfMonth, time}
}

function addSeconds(date, seconds) {
    date.setSeconds(date.getSeconds() + seconds);
    
    return date;
}


function changeToC(temp) {
    temp = temp - 273.5;
    temp = Math.round(temp);
    return temp;
}

function changeToF(temp) {
    temp = (temp * 1.8) + 32;
    temp = Math.round(temp);
    return temp;
}

getWeather("tokyo");
/******/ })()
;