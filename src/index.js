import { getWeather } from "./modules/weather";
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


function addSeconds(date, seconds) {
    date.setSeconds(date.getSeconds() + seconds);
    return date;
}


getWeather("tokyo");