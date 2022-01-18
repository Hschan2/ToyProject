# 가계부

## 진행 사항
* 기본 컴포넌트로 틀 잡기 (HTML, CSS)
* 예산 추가하기
* 지출 작성하기

## 예정 기능
* 카테고리 선택되지 않은 상황 처리
* 예산 총 지출
* 지출 보기 / 수정/ 삭제

## 오류 수정
* 지출 작성 후 ProgressBar 증가하지 않는 에러 수정
    * contents/BudgetContent.js 에서 addExpense 함수의 인자를 budget => budgetId으로 수정 (다른 컴포넌트에서 받아오는 값이 budgetId이기 때문)