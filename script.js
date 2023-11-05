const APIKey = '8cae8249f31a48edac8190500230411';

async function getWeatherObj(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`)
    return await response.json();
}

async function x() {
    const wetherDataObj = await getWeatherObj('london');
    const city = wetherDataObj.location.name;
    const condition = wetherDataObj.current.condition.text;
    const conditionIcon = wetherDataObj.current.condition.icon;
    const tempC = wetherDataObj.current.temp_c;
    const feelslikeC = wetherDataObj.current.feelslike_c;
    const UV = wetherDataObj.current.uv;
    const humidity = wetherDataObj.current.humidity
    const windKPH = wetherDataObj.current.wind_kph;
    console.log(city, condition, conditionIcon);
}

async function penis() {
    const p = await fetch(`http://api.weatherapi.com/v1/future.json?key=8cae8249f31a48edac8190500230411&q=London&dt=2023-12-03`).then(response => response.json());
    console.log(p.forecast.forecastday[0].hour);
}

penis();