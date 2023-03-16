/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWeather": () => (/* binding */ getWeather)
/* harmony export */ });
/* harmony import */ var _factories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

const date = new Date();
const dateOffset = date.getTimezoneOffset() * 60;
const UTC = addSeconds(date, dateOffset);
let spacing = '\xa0\xa0\xa0\xa0\xa0';

async function getWeather(city) {
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

        const localWeather = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.locationFactory)(place, weatherName, weatherDescription,
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

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dateFactory": () => (/* binding */ dateFactory),
/* harmony export */   "getUTC": () => (/* binding */ getUTC),
/* harmony export */   "locationFactory": () => (/* binding */ locationFactory)
/* harmony export */ });
function getUTC() {
    const date = new Date();
    const dateOffset = date.getTimezoneOffset() * 60;
    const UTC = addSeconds(date, dateOffset);

    return UTC;
}

const locationFactory = (
    location,
    weather, weatherDesc,
    celcTemp, celcMin, celcMax,
    fahTemp, fahMin, fahMax,
    timezone, humid
) => {
    const UTC = getUTC();

    let time = addSeconds(UTC, timezone);
    ;
    let brokenDate = time.toString();

    let fullDate = dateFactory(brokenDate)
    //send in full date
    console.log(fullDate);
    return {
        location, weather, weatherDesc, celcTemp, celcMin, celcMax, fahTemp, fahMin, fahMax,
        fullDate, humid
    }

}

const dateFactory = (date) => {
    console.log(date)
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
    let dayOfMonth = date.slice(8, 10);
    let month = date.slice(4, 7);
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
    let hours = date.slice(16, 18);
    let hoursInt = parseInt(hours);
    let minutes = date.slice(19, 21)
    let amPM = "";
    if (hoursInt > 12) {
        hoursInt = hoursInt - 12;
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

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


const searchForm = document.querySelector("#searchForm");
const changeTempBtn = document.querySelector("#changeTempBtn");
let active = "C";

changeTempBtn.addEventListener("click", (event) => {
    const fDiv = document.querySelector(".fTempDiv");
    const cDiv = document.querySelector(".cTempDiv");
    event.preventDefault();
    if (active === "C") {
        fDiv.style.display = "table";
        cDiv.style.display = 'none';
        console.log('C')
        active = "F"
    } else if (active === "F"){
        cDiv.style.display = "table";
        fDiv.style.display = 'none';
        console.log('F')
        active = "C"
    }
})

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let location = searchForm.elements['location'].value;
    (0,_modules_weather__WEBPACK_IMPORTED_MODULE_0__.getWeather)(location);
    searchForm.elements['location'].value = "";
})



;(0,_modules_weather__WEBPACK_IMPORTED_MODULE_0__.getWeather)("New York");
})();

/******/ })()
;