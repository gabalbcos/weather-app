async function getWeather(cityName) {
    const URL = `http://api.weatherapi.com/v1/current.json?key=a65ccd428bd445c9af4172452230706&q=${cityName}&aqi=no`
    const result = await fetch(URL);
    const data = await result.json();
    console.log(data)
    return data;
}
