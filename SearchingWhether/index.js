import exchangeLang from "./exchangeLang.js";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
// 30초마다 새로 고침 변수
let interval = null;

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