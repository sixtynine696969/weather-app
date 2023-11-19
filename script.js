const APIKey = '8cae8249f31a48edac8190500230411';
const IPDataIPKey = 'd9d5b6df69ad7c4f070ec05c3b6c41837c893ebd3dfa6b153740322e';

const toggler = document.querySelector('.toggler > input');

async function getWeatherObj(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`)
    return await response.json();
}

async function getClientIP() {
    const response = await fetch(`https://api.ipdata.co?api-key=${IPDataIPKey}`)
    const json = await response.json()
    return json.ip
}

async function updateDateTime(time) {
    document.querySelector('.timedate').textContent = new Date(time);
}

const feelsLikeTempSpan = document.querySelector('.feels-like-number');
const tempNumberSpan = document.querySelector('.temp-number');

let fehr;
let celc;
let feelsLikeFehr;
let feelsLikeCelc;

async function fillWithData(chosenCity) { // lookup city and display data
    const currentToggler = document.querySelector('.toggler > input');
    const cityDiv = document.querySelector('.city')
    const conditionDiv = document.querySelector('.condition-text');
    const img = document.querySelector('img');
    let wetherDataObj;

    if (chosenCity) {
        wetherDataObj = await getWeatherObj(chosenCity)
    } else {
        wetherDataObj = await getWeatherObj(await getClientIP());
    }
    
    const city = wetherDataObj.location.name;
    const condition = wetherDataObj.current.condition.text;
    const conditionIcon = wetherDataObj.current.condition.icon;

    fehr = wetherDataObj.current.temp_f;
    feelsLikeFehr = wetherDataObj.current.feelslike_f;
    celc =  wetherDataObj.current.temp_c;
    feelsLikeCelc = wetherDataObj.current.feelslike_c;

    const UV = wetherDataObj.current.uv;
    const humidity = wetherDataObj.current.humidity
    const windKPH = wetherDataObj.current.wind_kph;
    const localTime = wetherDataObj.location.localtime;

    cityDiv.textContent = city;
    updateDateTime(localTime);
    if (currentToggler.checked) {
        feelsLikeTempSpan.textContent = feelsLikeFehr;
        tempNumberSpan.textContent = fehr;
    } else {
        feelsLikeTempSpan.textContent = feelsLikeCelc;
        tempNumberSpan.textContent = celc;
    }
    conditionDiv.textContent = condition;
    img.src = `https:${conditionIcon}`
}

fillWithData();
const submitButton = document.querySelector('form button');
const inputField = document.querySelector('input');
const form = document.querySelector('form')

submitButton.onclick = (e) => {
    const inputField = document.querySelector('input');
    fillWithData(inputField.value);
}

form.onkeydown = (e) => {
    if (e.key == 'Enter') {
        e.preventDefault();
        fillWithData(inputField.value);
    }
}

toggler.onclick = e => {
    if (e.target.checked) {
        // temperature is in fehrenheit
        feelsLikeTempSpan.textContent = feelsLikeFehr;
        tempNumberSpan.textContent = fehr;
    } else {
        feelsLikeTempSpan.textContent = feelsLikeCelc;
        tempNumberSpan.textContent = celc;
    }
}