// 천 단위 설정
// currency: "krw" - 원화
// style: "currency" - 통화 서식
// minimumFractionDigits: 0 - 소수부 최대 자릿수 (소수 자리 제거)
export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: "krw",
    style: "currency",
    minimumFractionDigits: 0,
})