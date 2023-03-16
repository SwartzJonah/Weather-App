import { getWeather } from "./modules/weather";

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
        active = "F"
    } else if (active === "F"){
        cDiv.style.display = "table";
        fDiv.style.display = 'none';
        active = "C"
    }
})

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let location = searchForm.elements['location'].value;
    getWeather(location);
    searchForm.elements['location'].value = "";
})



getWeather("New York");