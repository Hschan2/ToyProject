// 환율 정보
let currencyRatio = {
    USD: {
        KRW: 1193.32,
        USD: 1,
        JPY: 115.04,
        unit: "달러"
    },
    KRW: {
        KRW: 1,
        USD: 0.00084,
        JPY: 0.096,
        unit: "원"
    },
    JPY: {
        KRW: 10.38,
        USD: 0.0087,
        JPY: 1,
        unit: "엔"
    }
}

// 현재 나라 환율
let fromCurrency = 'USD';

document.querySelectorAll("#from-currency-list a").forEach((menu) =>
    menu.addEventListener("click", function () {
        document.getElementById("from-button").textContent = this.textContent;
        fromCurrency = this.textContent;
        convert();
    })
);

// 바꾸고 싶은 나라의 환율
let toCurrency = 'USD';

document.querySelectorAll("#to-currency-list a").forEach((menu) =>
    menu.addEventListener("click", function () {
        document.getElementById("to-button").textContent = this.textContent;
        toCurrency = this.textContent;
        convert();
    })
);

// 압룍 값 변경 감지 시 실시간 업데이트
function convert() {
    let amount = document.getElementById("from-input").value;
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];

    document.getElementById("to-input").value = convertedAmount;
}