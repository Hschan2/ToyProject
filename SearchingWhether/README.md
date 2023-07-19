# 도시 검색 날씨 서비스

<br/>

### **도시 검색 날씨 서비스** - 대한민국의 주요 도시 날씨 정보 서비스

<br/>

도시 검색 날씨 서비스는 대한민국의 주요 도시의 날씨 정보를 검색 한 번으로 확인할 수 있습니다.   

또한, 날씨에 맞는 이미지를 애니메이션으로 확인할 수 있으며, 날씨에 따라 다른 배경색으로 나타냅니다.   

![city-weather](https://github.com/Hschan2/ToyProject/blob/master/SearchingWhether/weather_search.gif?raw=true)

<br/>

## 도시 검색 날씨 서비스 개발자

### 프론트엔드
| [홍성찬](https://github.com/Hschan2) |.
| :---: |
| ![](https://avatars.githubusercontent.com/u/39434913?v=4) |
| 날씨 검색 기능 구현 <br/> 검색에 따른 날씨 데이터 출력 구현 <br/> 전체 디자인 |

<br/>
<br/>

## 기술 스택

#### 프레임워크 및 라이브러리
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

#### 개발 도구
![VSCode](https://img.shields.io/badge/VSCODE-007ACC?style=for-the-badge&logo=visual studio code&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge)

#### API
![openweathermap](https://img.shields.io/badge/openweathermap-%23E34F26.svg?style=for-the-badge&logo=openweathermap&logoColor=white)

<br/>
<br/>

## 파일 구조
```
src
├─ addWeatherToPage (전체적인 날씨 출력 함수)
├─ backgroundImages (날씨에 따른 배경색 변경 함수)
├─ Entitles (한글화를 위한 한글값 저장 함수)
├─ exchangeLang (영어로 가져온 데이터 한글화)
├─ getWeatherByLocation (위치에 따른 날씨 정보 가져오기)
├─ Ktoc.css (F˚ -> C˚)
│
├─ index.html
├─ index.css
└─ index.js
```

<br/>
<br/>

## 주요 기능
#### 날씨 검색
* 검색한 위치 값을 API URL의 위치 값에 추가하여 해당 위치의 날씨 데이터 출력

#### 날씨 이미지 및 배경색
* 날씨에 맞는 이미지를 애니메이션 동작을 추가하여 구현
* 날씨에 따라 배경색이 달라지는 효과 구현

#### 주기적인 업데이트
* 30초마다 새로고침을 발생시켜 날씨 변화를 자동으로 수정

## 이 프로젝트를 개발한 이유
개발 프로젝트 중 기초적인 프로젝트인 날씨 애플리케이션를 개발하면서 검색과 위치 기반 날씨 프로젝트를 구현해보고자 계획하였고, 개발하였습니다.

## 프로젝트 주요 타겟
* 대한민국 주요 도시의 날씨 정보를 확인하고 싶은 사람
