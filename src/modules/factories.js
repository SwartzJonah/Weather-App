export function getUTC(){
    const date = new Date();
    const dateOffset = date.getTimezoneOffset() * 60;
    const UTC = addSeconds(date, dateOffset);
    
    return UTC;
}

export const locationFactory = (
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

export const dateFactory = (date) => {
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