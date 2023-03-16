const date = new Date();
const dateOffset = date.getTimezoneOffset() * 60;
const UTC = addSeconds(date, dateOffset);
let spacing = '\xa0\xa0\xa0\xa0\xa0';

export async function getWeather(city) {
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

    cSubDiv = document.createElement("div")
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

    fSubDiv = document.createElement("div")
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
        fullDate, humid
    }

}

const dateFactory = (date) => {
    let dayOfWeek = date.slice(0, 3);
    switch (dayOfWeek) {
        case "Mon":
            dayOfWeek = "Monday"
            break;
        case "Tue":
            dayOfWeek = "Tuesday"
            break;
        case "Wed":
            dayOfWeek = "Wednesday"
            break;
        case "Thu":
            dayOfWeek = "Thursday"
            break;
        case "Fri":
            dayOfWeek = "Friday"
            break;
        case "Sat":
            dayOfWeek = "Saturday"
            break;
        case "Fri":
            dayOfWeek = "Sunday"
            break;
    }
    let dayOfMonth = date.slice(5, 7);
    let month = date.slice(8, 11);
    switch (month) {
        case "Jan":
            month = "January"
            break;
        case "Feb":
            month = "Febuary"
            break;
        case "Mar":
            month = "March"
            break;
        case "Apr":
            month = "April"
            break;
        case "May":
            month = "May"
            break;
        case "Jun":
            month = "June"
            break;
        case "Aug":
            month = "August"
            break;
        case "Sep":
            month = "September"
            break;
        case "Oct":
            month = "October"
            break;
        case "Nov":
            month = "November"
            break;
        case "Dev":
            month = "December"
            break;
    }
    let hours = date.slice(17, 19);
    console.log(hours)
    let hoursInt = parseInt(hours);
    let minutes = date.slice(20, 22)
    console.log(minutes)
    let amPM = "";
    if (hoursInt > 12) {
        hoursInt - 12
        amPM = "pm"
    } else {
        amPM = "am"
    }
    let time = hoursInt + ":" + minutes + " " + amPM;
    return { dayOfWeek, month, dayOfMonth, time }
}

function addSeconds(date, seconds) {
    date.setSeconds(date.getSeconds() + seconds);

    return date;
}