const APIKey = '8cae8249f31a48edac8190500230411';
const toggler = document.querySelector('.toggler > input');

async function getWeatherObj(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`)
    return await response.json();
}

async function updateDateTime(time) {
    document.querySelector('.timedate').textContent = new Date(time);
}

const feelsLikeTempSpan = document.querySelector('.feels-like-number');
const tempNumberSpan = document.querySelector('.temp-number');

async function x(chosenCity='new york') {
    const toggler = document.querySelector('.toggler > input');
    const cityDiv = document.querySelector('.city')
    const conditionDiv = document.querySelector('.condition-text');
    const img = document.querySelector('img');

    const wetherDataObj = await getWeatherObj(chosenCity);
    const city = wetherDataObj.location.name;
    const condition = wetherDataObj.current.condition.text;
    const conditionIcon = wetherDataObj.current.condition.icon;

    let temp;
    let feelslike;
    if (toggler.checked) {
        temp =  wetherDataObj.current.temp_f;
        feelslike = wetherDataObj.current.feelslike_f;
    } else {
        temp =  wetherDataObj.current.temp_c;
        feelslike = wetherDataObj.current.feelslike_c;
    }

    const UV = wetherDataObj.current.uv;
    const humidity = wetherDataObj.current.humidity
    const windKPH = wetherDataObj.current.wind_kph;
    const localTime = wetherDataObj.location.localtime;

    cityDiv.textContent = city;
    updateDateTime(localTime);
    feelsLikeTempSpan.textContent = feelslike;
    conditionDiv.textContent = condition;
    tempNumberSpan.textContent = temp;
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

function fehrToCelc(fehr) {
    return ((+fehr - 32) * 5 / 9).toFixed(1);
}

function celcToFehr(celc) {
    return (+celc * 9 / 5 + 32).toFixed(1);
}

toggler.onclick = e => {
    console.log(e.target.checked);
    if (e.target.checked) {
        // temperature is in fehrenheit
        feelsLikeTempSpan.textContent = fehrToCelc(feelsLikeTempSpan.textContent);
        tempNumberSpan.textContent = fehrToCelc(tempNumberSpan.textContent);
    } else {
        feelsLikeTempSpan.textContent = celcToFehr(feelsLikeTempSpan.textContent);
        tempNumberSpan.textContent = celcToFehr(tempNumberSpan.textContent);
    }
}