// DOM
const searchBox = document.getElementById("search");
const errorMsg = document.querySelector(".error-message");
const submitSearch = document.getElementById("search-button");
const weatherIcon = document.getElementById("weather-icon");
const cityName = document.getElementById("city-name");
const countryName = document.getElementById("country-name")
const todayDate = document.getElementById("today-date");
const todayTime = document.getElementById("time");
const temperature = document.getElementById("temperature");
const changeUnity = document.getElementById("change-unity");


async function getWeather(cityName) {
    const URL = `http://api.weatherapi.com/v1/current.json?key=a65ccd428bd445c9af4172452230706&q=${cityName}&aqi=no`;
        let result = await fetch(URL);
        const data = await result.json();  
        return data;
}

const updateWeather = async () => {
    try {
        let cityData = await getWeather(searchBox.value);
        console.log(cityData)
        errorMsg.classList.add("hidden");
        await setCityData(cityData);
    } catch {
        errorMsg.classList.toggle("hidden");
    }

}

// dom functions
function setCityData(data) {
    
    weatherIcon.setAttribute("src", `${data.current.condition.icon}`);
    cityName.innerText = data.location.name;
    countryName.innerText = data.location.country;
    const cityLocalTime = data["location"]["localtime"];
    let cityLocalTimeHour = cityLocalTime.split(" ");
    todayDate.innerText = formatDate(cityLocalTimeHour[0])
    todayTime.innerText = cityLocalTimeHour[1];
    temperature.innerText = setTemperature(data);
}


// formating functions

function formatDate(date) {
    let splitDate = date.split("-");
    return formatedDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
}

// global variables
let temperatureUnity = "f";

function setTemperature(temperature) {
    if (temperatureUnity === "c") {
        temperatureUnity = "f";
        changeUnity.innerText = "Display Cº";
        return `${temperature["current"]['temp_f']}F`
    }
    else {
        temperatureUnity = "c";
        console.log(temperatureUnity);
        changeUnity.innerText = "Display F";
        return `${temperature["current"]['temp_c']}Cº`;
    }
}

//submit search
submitSearch.addEventListener("click", 
updateWeather)

changeUnity.addEventListener("click", 
updateWeather)

getWeather("Buenos Aires")