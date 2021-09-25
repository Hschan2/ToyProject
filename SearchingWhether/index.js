const apiKey = "a03004bf971234fd4cb532f6df20b7af";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const cloud_ids = [201, 200, 202, 210, 211, 212, 221, 230, 231, 232];
const shower_ids = [300, 301, 302, 310, 311, 312, 313, 314, 321];
const rain_ids = [500, 501, 502, 503, 504, 511, 520, 521, 522, 531];
const snow_ids = [600, 601, 602, 611, 612, 615, 616, 620, 621, 622];
const mist_ids = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];
const clear_ids = [800, 801, 802, 803, 804];
const wind_ids = [900, 901, 902, 903, 904, 905, 906, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962];
const weather_ids = cloud_ids.concat(shower_ids, rain_ids, snow_ids, mist_ids, clear_ids, wind_ids);

const weather_ids_kr = ["가벼운 비를 동반한 천둥구름","비를 동반한 천둥구름","폭우를 동반한 천둥구름","약한 천둥구름",
    "천둥구름","강한 천둥구름","불규칙적 천둥구름","약한 연무를 동반한 천둥구름","연무를 동반한 천둥구름",
    "강한 안개비를 동반한 천둥구름","가벼운 안개비","안개비","강한 안개비","가벼운 적은비","적은비",
    "강한 적은비","소나기와 안개비","강한 소나기와 안개비","소나기","악한 비","중간 비","강한 비",
    "매우 강한 비","극심한 비","우박","약한 소나기 비","소나기 비","강한 소나기 비","불규칙적 소나기 비",
    "가벼운 눈","눈","강한 눈","진눈깨비","소나기 진눈깨비","약한 비와 눈","비와 눈","약한 소나기 눈",
    "소나기 눈","강한 소나기 눈","박무","연기","연무","모래 먼지","안개","모래","먼지","화산재","돌풍",
    "토네이도","구름 한 점 없는 맑은 하늘","약간의 구름이 낀 하늘","드문드문 구름이 낀 하늘","구름이 거의 없는 하늘",
    "구름으로 뒤덮인 흐린 하늘","토네이도","태풍","허리케인","한랭","고온","바람부는","우박","바람이 거의 없는",
    "약한 바람","부드러운 바람","중간 세기 바람","신선한 바람","센 바람","돌풍에 가까운 센 바람","돌풍",
    "심각한 돌풍","폭풍","강한 폭풍","허리케인"];

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {
        origin: "cros"
    });

    const respData = await resp.json();

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);
    const weatherKrName = weatherKorean(data);
    const weatherBG = backgroundVideos(data);

    const weather = document.createElement('div')
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />     ${temp}˚C</h2>
        <small>${weatherKrName}</small>
    `;

    // 검색된 날씨 출력
    main.innerHTML = "";
    main.appendChild(weather);
};

function Ktoc(k) {
    return Math.floor(k - 273.15);
}

function weatherKorean(data) {
    const weatherId = data.weather[0].id;

    for (let i = 0; i < weather_ids.length; i++) {
        if (weather_ids[i] === weatherId) {
            return weather_ids_kr[i];
        }
    }
}

function backgroundVideos(data) {
    const weatherId = data.weather[0].id;

    if (cloud_ids.includes(weatherId)) return "./videos/cloud.mp4";
    else if (shower_ids.includes(weatherId)) return "./videos/shower.mp4";
    else if (rain_ids.includes(weatherId)) return "./videos/rain.mp4";
    else if (snow_ids.includes(weatherId)) return "./videos/snow_hori.mp4";
    else if (mist_ids.includes(weatherId)) return "./videos/mist.mp4";
    else if (clear_ids.includes(weatherId)) return "./videos/clear.mp4";
    else if (wind_ids.includes(weatherId)) return "./videos/wind.mp4";
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});