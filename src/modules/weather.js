import { locationFactory, dateFactory } from "./factories";
const date = new Date();
const dateOffset = date.getTimezoneOffset() * 60;
const UTC = addSeconds(date, dateOffset);
let spacing = '\xa0\xa0\xa0\xa0\xa0';

export async function getWeather(city) {
    const contentDiv = document.querySelector("#content");
    const newcity = city.toString()
    console.log(newcity)
    try{
    const response = await
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + newcity + '&APPID=0aa2d1d8bde34a199d429347227fd53b');
    const data = await response.json();
    contentDiv.replaceChildren();   
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
    blockDiv.classList.add("blockDiv");

    const locationDiv = document.createElement("div");
    locationDiv.classList.add("locationDiv")
    locationDiv.textContent = "Location: " + localWeather.location;
    blockDiv.appendChild(locationDiv)

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("timeDiv")
    timeDiv.textContent = "Time: " + localWeather.fullDate.time;
    blockDiv.appendChild(timeDiv);
    //switch to date thing
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("dateDiv")
    dateDiv.textContent = "Date: " + localWeather.fullDate.dayOfWeek + ", " + localWeather.fullDate.month + " " + localWeather.fullDate.dayOfMonth ;
    blockDiv.appendChild(dateDiv)

    const weatherDiv = document.createElement("div");
    weatherDiv.classList.add("weatherDiv")
    weatherDiv.textContent = "Weather: " + localWeather.weather + spacing + " Subweather: " + localWeather.weatherDesc;
    blockDiv.appendChild(weatherDiv)

    const cTempDiv = document.createElement("div");
    cTempDiv.classList.add("cTempDiv")

    const cMainDiv = document.createElement("div")
    cMainDiv.classList.add("cMainDiv")
    cMainDiv.textContent = "Temperature: " + localWeather.celcTemp + "°C";
    cTempDiv.appendChild(cMainDiv);

    const cSubDiv = document.createElement("div")
    cSubDiv.classList.add("cSubDiv")
    cSubDiv.textContent = "Max: " + localWeather.celcMax + "°C" + spacing + "Min: " + localWeather.celcMin + "°C";
    cTempDiv.appendChild(cSubDiv);
    blockDiv.appendChild(cTempDiv)

    const fTempDiv = document.createElement("div");
    fTempDiv.classList.add("fTempDiv")

    const fMainDiv = document.createElement("div")
    fMainDiv.classList.add("fMainDiv")
    fMainDiv.textContent = "Temperature: " + localWeather.fahTemp + "°F";
    fTempDiv.appendChild(fMainDiv);

    const fSubDiv = document.createElement("div")
    fSubDiv.classList.add("fSubDiv")
    fSubDiv.textContent = "Max: " + localWeather.fahMax + "°F" + spacing + "Min: " + localWeather.fahMin + "°F";
    fTempDiv.appendChild(fSubDiv);
    blockDiv.appendChild(fTempDiv)

    const humidDiv = document.createElement("div");
    humidDiv.classList.add("humidDiv")
    humidDiv.textContent = "Humidity: " + localWeather.humid + "%";
    blockDiv.appendChild(humidDiv)

    contentDiv.appendChild(blockDiv);
    console.log(localWeather);

    addSeconds(UTC, timezone * -1);
    } catch (error){
        getWeather("New York");
        alert("City does not exist");
        
    }
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