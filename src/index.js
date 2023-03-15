const date = new Date();
const dateOffset = date.getTimezoneOffset() * 60;
const UTC = addSeconds(date, dateOffset);
console.log(date)
// timeconversion(dateUTC);


// function timeconversion(date){
//     let dayOfWeek = date.slice(0,3);
//     let month = date.slice(4,7);
//     let actualDate = date.slice(8,10);
//     let hours = date.slice(16,18);
//     let hoursInt = parseInt(hours);
//     let minutes = date.slice(19,21)
//     let amPM = "";
//     if(hoursInt > 12){
//         amPM = "pm"
//     } else {
//         amPM = "am" 
//     }
    
//     console.log(dayOfWeek);
//     console.log(month);
//     console.log(actualDate);
//     console.log(hours);
//     console.log(minutes);
//     console.log(amPM);
// }
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
    console.log(data)
    const place = data.name;
    console.log(place)
    const weatherName = data.weather[0].main;
    console.log(weatherName)
    const weatherDescription = data.weather[0].description;
    console.log(weatherDescription)

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
    
    console.log(timezone)
    console.log("dateUTCbefore:" + UTC);
    const humidity = data.main.humidity;


    const localWeather = locationFactory(place, weatherName, weatherDescription,
        celsiusTemperature, celsiusMin, celsiusMax,
        fahrenheitTemperature, fahrenheitMin, fahrenheitMax,
        timezone, humidity);

    const blockdiv = document.createElement("div")
    blockdiv.textContent = localWeather.time;
    contentDiv.appendChild(blockdiv);
    console.log(localWeather);

    addSeconds(UTC, timezone*-1);
}

const locationFactory = (
    location,
    weather, weatherDesc,
    celcTemp, celcMin, celcMax,
    fahrenheitTemp, fahMin, fahMax,
    timezone, humid
) => {
    let time = addSeconds(UTC, timezone);
    return {
        location, weather, weatherDesc, celcTemp, celcMin, celcMax, fahrenheitTemp, fahMin, fahMax,
        time, humid
    }

}

function addSeconds(date, seconds) {
    date.setSeconds(date.getSeconds() + seconds);
    console.log(date);
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