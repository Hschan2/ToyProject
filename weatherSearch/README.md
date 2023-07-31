# 도시 검색 날씨 서비스 확장형

<br/>

### **도시 검색 날씨 서비스 확장형** - 확장된 대한민국의 주요 도시 날씨 정보 서비스

<br/>

도시 검색 날씨 서비스 확장형은 대한민국의 주요 도시의 날씨 정보와 풍향, 습도 그리고 4일 간의 날씨 정보를 확인할 수 있습니다.   

또한, 섭씨와 화씨를 토글 버튼으로 모두 확인할 수 있으며, 날씨 이미지에 애니메이션을 적용해 동적인 느낌을 전달합니다.   

![city-weather](https://github.com/Hschan2/ToyProject/blob/master/weatherSearch/Image/searchingWeather.gif?raw=true)

<br/>

## 도시 검색 날씨 서비스 개발자

### 프론트엔드
| [홍성찬](https://github.com/Hschan2) |
| :---: |
| <img src="https://avatars.githubusercontent.com/u/39434913?v=4" width="100" height="100"> |
| 날씨 검색 기능 구현 <br/> 검색에 따른 날씨 데이터 출력 구현 <br/> 섭씨&화씨 토글 버튼 구현 <br/> 전체 디자인 |

<br/>
<br/>

## 기술 스택

#### 프레임워크 및 라이브러리
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

#### 개발 도구
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge)

#### API
![openweathermap](https://img.shields.io/badge/openweathermap-%23E34F26.svg?style=for-the-badge&logo=openweathermap&logoColor=white)

<br/>
<br/>

## 파일 구조
```
src
├─ image
│
├─ index.html
├─ style.css
└─ function.js
```

<br/>
<br/>

## 주요 기능
#### 날씨 검색
* 검색한 위치 값을 API URL의 위치 값에 추가하여 해당 위치의 날씨 데이터 출력
* 날씨, 풍향, 습도, 4일 간 날씨 등 여러 날씨 정보를 출력
* 섭씨&화씨 토글 버튼 구현
* 오늘 날짜 출력

#### 날씨 이미지
* 날씨에 맞는 이미지를 애니메이션 동작을 추가하여 구현

## 문제점
* API의 특성 상 한글 입력 값을 호환하지 않아 영어로 입력하여 검색 필요
    * KR, Seoul처럼 작성 필수

## 이 프로젝트를 개발한 이유
검색한 도시의 날씨 데이터만 출력했던 이전에 개발한 도시 검색 날씨 서비스에서 확장시키고 싶었고, 다른 디자인으로 구현하고 싶었습니다.   

추가적으로 오늘 날짜, 풍향, 습도, 더 많은 날씨 정보를 전달하고 싶어 개발하게 되었습니다.   

## 프로젝트 주요 타겟
* 대한민국 주요 도시의 날씨 정보를 확인하고 싶은 사람
