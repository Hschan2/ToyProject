# 영화 정보 서비스

![banner](https://github.com/Hschan2/ToyProject/blob/master/movie/frontend/src/images/banner.png?raw=true)

<br/>

### **Movie Information** - 영화 정보를 쉽고 빠르게 볼 수 있는 서비스

<br/>

영화 정보 서비스는 특정 주제에 맞게 영화들의 목록들을 확인할 수 있습니다. 영화 목록 뿐만 아니라 상세 내용도 읽을 수 있습니다.   

또한, 인기 영화, 신작 영화, 평가순 영화 등 다양한 카테고리의 영화 목록들을 확인할 수 있습니다.   

![movie project](https://github.com/Hschan2/ToyProject/blob/master/movie/frontend/public/screen-recording.gif?raw=true)

<br/>

## 체험
배포 예정

<br/>

## 영화 정보 서비스 개발자

### 프론트엔드
| [홍성찬](https://github.com/Hschan2) |.
| :---: |
| ![](https://avatars.githubusercontent.com/u/39434913?v=4) |
| 카테고리 별 영화 목록 출력 <br/> 상세 페이지 구현 <br/> 전체 디자인 |

<br/>
<br/>

## 기술 스택

#### 프레임워크
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)

#### 라이브러리
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![lottie_files](https://img.shields.io/badge/lottie-files-%236DB33F.svg?style=for-the-badge&logo=lottie-files&logoColor=white)

#### 통신
![Axios](https://img.shields.io/badge/axios-%23323330.svg?style=for-the-badge)

#### 개발 도구
![VSCode](https://img.shields.io/badge/VSCODE-007ACC?style=for-the-badge&logo=visual studio code&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge)

<br/>
<br/>

## 폴더 구조
```
src
├─ components
├─ images
│
├─ pages
│
├─ style
│
├─ App.js
└─ index.js
```

<br/>
<br/>

## 페이지 및 주요 기능

#### 공통
* 상단 이동 버튼 구현
* 고정된 Navbar 구현
* Lottie Files로 애니메이션 로고 구현
* themoviedb API 활용
* 영화 데이터를 불러오지 못할 때, Loading 페이지 출력
<p align="center">
  <img 
  src="https://github.com/Hschan2/ToyProject/blob/master/movie/frontend/src/images/loading.png?raw=true" 
  width="400">
</p>

#### 카테고리
* 인기작, 개봉예정작, 현재개봉작, 높은 평가작의 영화 목록들 출력

#### 상세페이지
* themoviedb API에서 가져온 ID값을 기준으로 상세페이지 구현
* 제목, 장르, 제작사, 영화 시간, 평가 점수, 상세 내용 출력

<br/>

## 기술 선택
#### React를 선택한 이유
* 중복적으로 사용되는 부분을 컴포넌트로 분리하여 재사용함으로써 효율적으로 개발이 가능하기 때문에 선택하였습니다.
* 필요한 라이브러리를 쉽게 설치하고, 불러와 사용할 수 있기 때문입니다.

#### API 호출에 Spring을 선택한 이유
* React + Spring 프로젝트로 구현되는 경우가 많다는 이야기와 스프링을 사용해보고 싶다는 생각에 API 구현에 Spring을 사용하였습니다.
* 서버 동작 시, API 호출 URL만 작성하면 쉽게 영화 데이터를 불러올 수 있기 때문에 Spring을 선택하였습니다.

#### themoviedb API을 선택한 이유
* 무료로 사용이 가능한 API이며, 다양한 카테고리로 영화 데이터를 불러올 수 있으며, 검색 구현이 가능하기 때문에 선택하였습니다.

#### 이 프로젝트를 개발한 이유
* 무한 스크롤과 검색 구현을 개발해보고 싶다는 생각과 다양한 주제, 카테고리 별로 영화 정보를 확인하고 싶기 때문에 개발하였습니다.

<br/>

## 개발 예정 목록
* Intersection Observer API을 이용해 무한 스크롤 구현
* Redux 라이브러리를 활용해 영화 검색 기능 구현

<br/>

## 프로젝트 주요 타겟
* 다양한 카테고리 별로 영화 정보를 쉽게 확인하고 싶은 사람

<br/>

## 실행
```
npm install

npm start
```