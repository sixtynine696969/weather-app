const APIKey = '8cae8249f31a48edac8190500230411';

async function getWeatherObj(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`)
    return await response.json();
}

async function x() {
    const cityDiv = document.querySelector('.city')
    const timeDateDiv = document.querySelector('.timedate')
    const feelsLikeDiv = document.querySelector('.feels-like-text');
    const conditionDiv = document.querySelector('.condition-text');
    const tempDiv = document.querySelector('.temp');
    const img = document.querySelector('img');

    const wetherDataObj = await getWeatherObj('mogilany');
    const city = wetherDataObj.location.name;
    const condition = wetherDataObj.current.condition.text;
    const conditionIcon = wetherDataObj.current.condition.icon;
    const tempC = wetherDataObj.current.temp_c;
    const feelslikeC = wetherDataObj.current.feelslike_c;
    const UV = wetherDataObj.current.uv;
    const humidity = wetherDataObj.current.humidity
    const windKPH = wetherDataObj.current.wind_kph;

    cityDiv.textContent = city;
    timeDateDiv.textContent = new Date();
    feelsLikeDiv.textContent = `Feels like ${feelslikeC}°`
    conditionDiv.textContent = condition
    tempDiv.textContent = `${tempC}°`
    img.src = `https:${conditionIcon}`
}

x();