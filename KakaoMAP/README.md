# Coronavirus_Map_Cover
코로나 맵 및 알리미 따라 만들기 (카카오 지도 API)

## 프로젝트 기술
* 집 주변 공공기관   
    * HTML, JAVASCRIPT, CSS, KAKAO MAP API
    * 검색한 위치로 자동 이동
    * 현재 위치로 이동 버튼 (Animation 포함)
    * 표시할 장소 배열에 오브젝트 배열로 저장   

### (Object로 현재 주변 주요 기관을 임의로 위도와 경도 값 추가)
1. 지도 생성
2. customOverlay로 해당 위치에 생성, 마우스 오버 및 아웃 시 툴팁 생성, 클릭 시 장소 정보 (Clrcle Overlay 형태, 숫자로 갯수를 표현)
3. Polyline을 customOverlay와 같은 위치로 생성(버튼으로 보이게 / 안 보이게 가능)
4. 내 위치 버튼 생성 및 CustomOverlay(애니메이션 포함)으로 생성 (내 위치 API를 사용)
5. 검색 기능, 검색하면 관련 장소으로 이동 그리고 클릭 시 장소명 볼 수 있음 (카카오 지도 검색 API 사용)

# 지금 어디?

<br/>

### **지금 어디?** - 위치 기반 서비스

<br/>

지금 어디는 집 주변 주요 기관을 표시함으로써 빠르게 확인할 수 있습니다.   

내 위치와 위치 검색으로 위치 확인이 가능하며, 마커와 툴팁으로 정보를 확인할 수 있습니다.   

<br/>

![지금어디](https://github.com/Hschan2/ToyProject/blob/master/KakaoMAP/image/home_town.gif?raw=true)

<br/>

## 지금 어디 개발자

### 웹 개발
| [홍성찬](https://github.com/Hschan2) |
| :---: |
| <img src="https://avatars.githubusercontent.com/u/39434913?v=4" width="100" height="100"> |
| 카카오맵 지도 출력 구현 <br/> 마커, 툴팁 박스 구현 <br/> 위치 검색 구현 <br/> 다이어리 목록 출력 및 글 삭제 구현 <br/> 내 위치 이동 기능 구현 |

<br/>
<br/>

## 기술 스택

#### 프레임워크 & 라이브러리
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

#### 지도 API
![KakaoMap](https://img.shields.io/badge/KakaoMap-ffcd00.svg?style=for-the-badge&logo=KakaoMap&logoColor=000000)

#### 개발 도구
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

<br/>
<br/>

## 파일 구조
```
src
├─ kakaomap.html
├─ kakaomap.js
├─ kakaoposition.js
├─ search.js
└─ kakaomap.css
```

<br/>
<br/>

## 주요 기능
* Custom Overlay를 이용해 특정 위치에 지도 생성
* 마우스 오버 및 아웃 시 툴팁 생성 및 제거
* Circle Overlay 형태로 숫자를 이용해 마크 갯수 표현
* PolyLine을 Custom Overlay와 같은 위치로 생성 (버튼 노출 유무 가능)
* Custom Overlay를 활용해 내 위치 버튼을 구현하고 내 위치 API로 현재 위치 이동 가능 및 반복적인 애니메이션 구현
* Kakao Map Search API를 활용해 검색 기능 구현 및 검색 시 관련 장소로 이동, 클릭 시 장소명 확인 가능

## 이 프로젝트를 개발한 이유
우리집 주변 주요 기관의 위치를 쉽게 파악하고 지도 검색과 내 위치, 마크, 툴팁을 활용하여 Kakao Map API 프로젝트를 구현하고 싶은 생각으로 개발하였습니다.   

이번 기회로 Kakao Map API 활용법을 익힐 수 있었으며, 다른 프로젝트에 적용할 수 있습니다.   

## 어려웠던 점
* Kakao Map API로 지도 출력이 되지 않는 점
    * Kakao Map API 공식 문서를 다시 확인하여 문제 해결
* Circle Overlay 형태로 마크를 표현할 때, 숫자 또는 마크 크기가 잘못 출력되거나 숫자가 가운데 정렬이 제대로 되지 않은 점
    * 구글 검색으로 다른 사람의 블로그에서 작성자가 프로젝트에서 구현한 코드를 참고하여 해결

## 아쉬운 점
* 툴팁 디자인이 부족한 점
* Kakao Map API를 활용한 특별한 서비스를 구현하지 못한 점
* 주요 기관의 목록을 직접 작성한 점