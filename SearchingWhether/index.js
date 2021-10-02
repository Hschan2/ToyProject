const apiKey = "a03004bf971234fd4cb532f6df20b7af";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
// 30초마다 새로 고침 변수
let interval = null;

const cloud_ids = [201, 200, 202, 210, 211, 212, 221, 230, 231, 232];
const shower_ids = [300, 301, 302, 310, 311, 312, 313, 314, 321];
const rain_ids = [500, 501, 502, 503, 504, 511, 520, 521, 522, 531];
const snow_ids = [600, 601, 602, 611, 612, 615, 616, 620, 621, 622];
const mist_ids = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];
const clear_ids = [800, 801, 802, 803, 804];
const wind_ids = [900, 901, 902, 903, 904, 905, 906, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962];
const weather_ids = cloud_ids.concat(shower_ids, rain_ids, snow_ids, mist_ids, clear_ids, wind_ids);

const enLocation = ['Seoul', 'Busan', 'Daegu', 'Daejeon', 'Gwangju', 'Incheon', 'Ulsan', 'Gyeonggi-do', 'Gyeongsangbuk-do', 'Gyeongsangnam-do', 'Jeollabuk-do', 'Jeollanam-do', 'Chungcheongbuk-do', 'Chungcheongnam-do', 'Gangwon-do', 'Jeju', 'Sejong'];
const krLocation = ['서울', '부산', '대구', '대전', '광주', '인천', '울산', '경기', '경북', '경남', '전북', '전남', '충북', '충남', '강원', '제주', '세종'];

const weather_ids_kr = ["가벼운 비를 동반한 천둥구름","비를 동반한 천둥구름","폭우를 동반한 천둥구름","약한 천둥구름",
    "천둥구름","강한 천둥구름","불규칙적 천둥구름","약한 연무를 동반한 천둥구름","연무를 동반한 천둥구름",
    "강한 안개비를 동반한 천둥구름","가벼운 안개비","안개비","강한 안개비","가벼운 적은비","적은비",
    "강한 적은비","소나기와 안개비","강한 소나기와 안개비","소나기","약한 비","중간 비","강한 비",
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

function exchangeLang(city) {
    for (let i = 0; i < enLocation.length; i++) {
        if (krLocation[i] == city) {
            getWeatherByLocation(enLocation[i]);
        }
    }
}

function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);
    const weatherKrName = weatherKorean(data);
    const BgColors = backgroundImages(data);

    const weather = document.createElement('div')
    weather.classList.add('weather');

    weather.innerHTML = `
        <h4><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h4>
        <h2>${temp}˚C</h2>
        <small>${weatherKrName}</small>
    `;

    // 검색된 날씨 출력
    main.innerHTML = "";
    main.appendChild(weather);

    document.body.style.background = `linear-gradient(300deg, ${BgColors[0]}, ${BgColors[1]})`;
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

function backgroundImages(data) {
    const weatherId = data.weather[0].id;
    const cloudyColor = ['#CFCFC4', '#A9A9A0'];
    const showerColor = ['#85857E', '#62625D'];
    const rainColor = ['#41413E', '#232322'];
    const snowColor = ['#AEAEAE', '#EEECF1'];
    const mistColor = ['#B0B8B2', '#838D8F'];
    const clearColor = ['#B4D9EF', '#88AED0'];
    const windColor = ['#CFEBF7', '#87CEEB'];

    if (cloud_ids.includes(weatherId)) return cloudyColor;
    else if (shower_ids.includes(weatherId)) return showerColor;
    else if (rain_ids.includes(weatherId)) return rainColor;
    else if (snow_ids.includes(weatherId)) return snowColor;
    else if (mist_ids.includes(weatherId)) return mistColor;
    else if (clear_ids.includes(weatherId)) return clearColor;
    else if (wind_ids.includes(weatherId)) return windColor;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        exchangeLang(city);
        clearInterval(interval);
        interval = setInterval(() => {
            exchangeLang(city);
            console.log("실행 중");
        }, 60000);
    }
});