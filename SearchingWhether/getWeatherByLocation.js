import addWeatherToPage from './addWeatherToPage.js';

const apiKey = "a03004bf971234fd4cb532f6df20b7af";

async function getWeatherByLocation(city) {
    const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const resp = await fetch(url(city), {
        origin: "cros"
    });

    const respData = await resp.json();

    addWeatherToPage(respData);
}

export default getWeatherByLocation;