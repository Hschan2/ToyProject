import Ktoc from './Ktoc.js';
import weatherKorean from './weatherKorean.js';
import backgroundImages from './backgroundImages.js';

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

export default addWeatherToPage;