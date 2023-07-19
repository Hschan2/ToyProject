# World Corona Information (세계 코로나 현황)

<br/>

### **코로나 현황** - 빠르고 쉽게 전 세계 코로나를 차트로 확인하는 서비스

<br/>

코로나 현황 서비스는 대한민국(국내)를 포함한 전 세계의 코로나 현황 정보를 빠르게 차트로 확인할 수 있습니다.

또한, 전 세계 코로나 확진자, 사망자, 회복 현황을 파악할 수 있습니다.

![corona_graph](https://github.com/Hschan2/ToyProject/blob/master/corona_graph/public/corona.PNG.png?raw=true)

<br/>
<br/>

## 코로나 현황 서비스 개발자

### 프론트엔드
| [홍성찬](https://github.com/Hschan2) |
| :---: |
| ![](https://avatars.githubusercontent.com/u/39434913?v=4) |
| 코로나 서비스 전체 개발 <br/> 차트 구현 <br/> 전체 디자인 |

<br/>
<br/>

## 기술 스택

#### 프레임워크
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)

#### 라이브러리
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)

#### 통신
![Axios](https://img.shields.io/badge/Axios-000000?style=for-the-badge)

#### 개발 도구
![VSCode](https://img.shields.io/badge/VSCODE-007ACC?style=for-the-badge&logo=visual studio code&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge)

#### API
![Covid19Api](https://img.shields.io/badge/covid19api-000000?style=for-the-badge)

<br/>
<br/>

## 폴더 구조
```
src
├─ components
|
├─ App.js
└─ index.js
```

<br/>
<br/>

## 주요 기능

#### 코로나 정보
* Chart.js 라이브러리로 누적 확진자, 월별 격리자, 확진자 & 격리 해제 & 사망 비율 현황 표현
* Select로 전 세계 데이터 선택 및 해당 나라의 코로나 현황 데이터 출력
국내 누적 확진자 현황, 월별 격리자 현황, 확진자 & 격리 해제 & 사망 비율

#### 데이터 업데이트
* 일정 시간 경과 후 자동 새로고침
* 새로고침 버튼 클릭으로 수동 새로고침

#### 코로나 현황 차트
* 각 정보 별 다른 색상으로 표현
* 원형 차트, 막대 차트, 라인 차트 등 다양한 차트로 알맞게 표현

## 기술 선택
#### React를 선택한 이유
* 중복 사용하는 코드를 컴포넌트로 분리해 재사용할 수 있기 때문입니다.
* Chart.js 라이브러리 설치로 쉽게 차트 표현이 가능하기 때문입니다.
* 변수 상태 관리가 가능하기 때문입니다.

#### Chart.js를 사용한 이유
* 가장 자주 사용하고 있는 차트 라이브러리 중 하나이며, 검색 하나로 쉽게 배우고 사용할 수 있다고 판단하였기 때문입니다.

## 프로젝트 주요 타겟
* 전 세계 코로나 현황을 쉽고 정확하게 파악하고 싶은 사람