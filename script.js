// DOM
const searchBox = document.getElementById("search");
const submitSearch = document.getElementById("search-button");
const cityName = document.getElementById("city-name");
const todayDate = document.getElementById("today-date");
const todayTime = document.getElementById("time");
const temperature = document.getElementById("temperature");
const changeUnity = document.getElementById("changeUnity");


async function getWeather(cityName) {
    const URL = `http://api.weatherapi.com/v1/current.json?key=a65ccd428bd445c9af4172452230706&q=${cityName}&aqi=no`
    const result = await fetch(URL);
    const data = await result.json();
    console.log(data)
    return data;
}

//submit search
submitSearch.addEventListener("click", async () => {
    const cityData = await getWeather(searchBox.value);
    await setCityData(cityData);
})

// dom functions
function setCityData(data) {
    cityName.innerText = data.location.name;
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

let temperatureUnity = "f";

function setTemperature(temperature) {
    if (temperatureUnity === "c") {
        temperatureUnity = "f";
        return `${temperature["current"]['temp_f']}F`
        console.log(temperatureUnity)
    }
    else {
        temperatureUnity = "c";
        console.log(temperatureUnity);
        return `${temperature["current"]['temp_c']}Cº`;
    }


}