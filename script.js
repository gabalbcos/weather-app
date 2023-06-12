// DOM
const searchBox = document.getElementById("search");
const submitSearch = document.getElementById("search-button");
const cityName = document.getElementById("city-name");
const todayDate = document.getElementById("today-date");
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
    todayDate.innerText = data["current"]['last_updated'];
    temperature.innerText = data["current"]['temp_c']
}