import { locationFactory, dateFactory } from "./factories";
const date = new Date();
const dateOffset = date.getTimezoneOffset() * 60;
const UTC = addSeconds(date, dateOffset);
let spacing = '\xa0\xa0\xa0\xa0\xa0';

export async function getWeather(city) {
    const contentDiv = document.querySelector("#content");
    contentDiv.replaceChildren();
    const newcity = city.toString()
    console.log(newcity)
    try {
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
        blockDiv.classList.add("blockDiv");


        //block one is weather, time and date
        const blockOneDiv = document.createElement("div");
        blockOneDiv.classList.add("blockOneDiv")

        const locationDiv = document.createElement("div");
        locationDiv.classList.add("locationDiv")
        locationDiv.textContent = "Location: " + localWeather.location;
        blockOneDiv.appendChild(locationDiv)

        const timeDiv = document.createElement("div");
        timeDiv.classList.add("timeDiv")
        timeDiv.textContent = "Time: " + localWeather.fullDate.time;
        blockOneDiv.appendChild(timeDiv);

        const dateDiv = document.createElement("div");
        dateDiv.classList.add("dateDiv")
        dateDiv.textContent = "Date: " + localWeather.fullDate.dayOfWeek + ", " + localWeather.fullDate.month + " " + localWeather.fullDate.dayOfMonth;
        blockOneDiv.appendChild(dateDiv)

        blockDiv.appendChild(blockOneDiv)

        //block two div is weather and humidity

        const blockTwoDiv = document.createElement("div");
        blockTwoDiv.classList.add("blockTwoDiv")

        const weatherDiv = document.createElement("div");
        weatherDiv.classList.add("weatherDiv")
        weatherDiv.textContent = "Weather: " + localWeather.weather;
        blockTwoDiv.appendChild(weatherDiv)

        const weatherDescDiv = document.createElement("div");
        weatherDescDiv.classList.add("weatherDescDiv")
        weatherDescDiv.textContent = "Subweather: " + localWeather.weatherDesc;
        blockTwoDiv.appendChild(weatherDescDiv)

        const humidDiv = document.createElement("div");
        humidDiv.classList.add("humidDiv")
        humidDiv.textContent = "Humidity: " + localWeather.humid + "%";
        blockTwoDiv.appendChild(humidDiv)

        blockDiv.appendChild(blockTwoDiv)

        //block three is the temperatures

        const blockThreeDiv = document.createElement("div");
        blockThreeDiv.classList.add("blockThreeDiv");

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
        blockThreeDiv.appendChild(cTempDiv)
        

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
    
        blockThreeDiv.appendChild(fTempDiv)
        blockDiv.appendChild(blockThreeDiv)


        contentDiv.appendChild(blockDiv);
        console.log(localWeather);

        addSeconds(UTC, timezone * -1);
    } catch (error) {
        console.log(error);
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