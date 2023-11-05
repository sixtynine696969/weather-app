const APIKey = '8cae8249f31a48edac8190500230411';

async function getWeatherObj(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`)
    return await response.json();
}

async function updateDateTime(time) {
    document.querySelector('.timedate').textContent = new Date(time);
}

async function x(chosenCity='new york') {
    const cityDiv = document.querySelector('.city')
    const feelsLikeDiv = document.querySelector('.feels-like-text');
    const conditionDiv = document.querySelector('.condition-text');
    const tempDiv = document.querySelector('.temp');
    const img = document.querySelector('img');

    const wetherDataObj = await getWeatherObj(chosenCity);
    const city = wetherDataObj.location.name;
    const condition = wetherDataObj.current.condition.text;
    const conditionIcon = wetherDataObj.current.condition.icon;
    const tempC = wetherDataObj.current.temp_c;
    const feelslikeC = wetherDataObj.current.feelslike_c;
    const UV = wetherDataObj.current.uv;
    const humidity = wetherDataObj.current.humidity
    const windKPH = wetherDataObj.current.wind_kph;
    const localTime = wetherDataObj.location.localtime;

    cityDiv.textContent = city;
    updateDateTime(localTime);
    feelsLikeDiv.textContent = `Feels like ${feelslikeC}°`
    conditionDiv.textContent = condition
    tempDiv.textContent = `${tempC}°`
    img.src = `https:${conditionIcon}`
}

x();

const submitButton = document.querySelector('form button');
const inputField = document.querySelector('input');

submitButton.onclick = (e) => {
    const inputField = document.querySelector('input');
    x(inputField.value);
}

window.onkeydown = (e) => {
    if (e.key == 'Enter') {
        e.preventDefault();
        x(inputField.value);
    }
}