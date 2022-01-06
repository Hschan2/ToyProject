// 환율 정보
let currencyRatio = {
    USD: {
        KRW: 1193.32,
        USD: 1,
        JPY: 115.04,
        unit: "달러",
        img: 'https://cdn-icons-png.flaticon.com/512/555/555526.png'
    },
    KRW: {
        KRW: 1,
        USD: 0.00084,
        JPY: 0.096,
        unit: "원",
        img: 'https://cdn.countryflags.com/thumbs/south-korea/flag-400.png'
    },
    JPY: {
        KRW: 10.38,
        USD: 0.0087,
        JPY: 1,
        unit: "엔",
        img: 'https://cdn.countryflags.com/thumbs/japan/flag-400.png'
    },
};

// 변수 선언
const unitWords = ["", "만", "억", "조", "경"];
const splitUnit = 10000;
let fromCurrency = 'KRW'; // 현재 나라 환율 기본값
let toCurrency = 'KRW'; // 바꾸고 싶은 나라의 환율 기본값
let fromButton = document.getElementById("from-button");
let toButton = document.getElementById("to-button");

document.querySelectorAll("#from-currency-list li").forEach((menu) =>
    menu.addEventListener("click", function () {
        fromCurrency = this.id;
        console.log(fromCurrency);
        fromButton.innerHTML = `<img class="flag-img" src="${currencyRatio[fromCurrency].img}" /> ${fromCurrency}`;
        convert('from');
    })
);



document.querySelectorAll("#to-currency-list li").forEach((menu) =>
    menu.addEventListener("click", function () {
        toCurrency = this.id;
        toButton.innerHTML = `<img class="flag-img" src="${currencyRatio[toCurrency].img}" /> ${toCurrency}`;
        convert('from');
    })
);

// 압룍 값 변경 감지 시 실시간 업데이트
function convert(type) {
    let amount = 0;

    if (type == 'from') {
        amount = document.getElementById('fromAmount').value;
        let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
        document.getElementById('toAmount').value = convertedAmount;
        renderKoreanNumber(amount, convertedAmount);
    } else {
        amount = document.getElementById('toAmount').value;
        let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
        document.getElementById('fromAmount').value = convertedAmount;
        renderKoreanNumber(convertedAmount, amount);
    }
}

function renderKoreanNumber(from, to) {
    document.getElementById('fromNumToKorea').textContent = readNum(from) + currencyRatio[fromCurrency].unit;
    document.getElementById('toNumToKorea').textContent = readNum(to) + currencyRatio[toCurrency].unit;

}

function readNum(num) {
    let resultString = "";
    let resultArray = [];

    for (let i = 0; i < unitWords.length; i++) {
        let unitResult = (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);

        if (unitResult > 0) resultArray[i] = unitResult;
    }

    for (let i = 0; i < resultArray.length; i++) {
        if (!resultArray[i]) continue;
        resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }

    return resultString;
}