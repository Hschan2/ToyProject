# 영화 정보 서비스

![banner](https://github.com/Hschan2/ToyProject/blob/master/movie/frontend/src/images/banner.png?raw=true)

<br/>

### **Movie Information** - 영화 정보를 쉽고 빠르게 볼 수 있는 서비스

<br/>

영화 정보 서비스는 특정 주제에 맞게 영화들의 목록들을 확인할 수 있습니다. 영화 목록 뿐만 아니라 상세 내용도 읽을 수 있습니다.   

또한, 인기 영화, 신작 영화, 평가순 영화 등 다양한 카테고리의 영화 목록들을 확인할 수 있습니다.   

![Image](https://github.com/Hschan2/ToyProject/blob/master/movie/frontend/src/images/main.gif?raw=true)

<br/>

## 체험
배포 예정

<br/>

## 영화 정보 서비스 개발자

### 프론트엔드
|[홍성찬](https://github.com/Hschan2)|
|:---:|
|![](https://avatars.githubusercontent.com/u/39434913?v=4)|
|카테고리 별 영화 목록 출력<br/>상세 페이지 구현<br/>전체 디자인|

<br/>

## 기술 스택

#### 프레임워크
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)

#### 라이브러리
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![lottie_files](https://img.shields.io/badge/lottie-files-%236DB33F.svg?style=for-the-badge&logo=lottie-files&logoColor=white)
![recoil](https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white)
![React Slick](https://img.shields.io/badge/React_Slick-CA4245?style=for-the-badge&logo=react-slick&logoColor=white)

#### 통신
![Axios](https://img.shields.io/badge/axios-%23323330.svg?style=for-the-badge)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

#### 개발 도구
![VSCode](https://img.shields.io/badge/VSCODE-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge)

<br/>
<br/>

## 폴더 구조
```
src
├─ components
    ├─ api
    ├─ constants
    └─ pages
        ├─ animation
        ├─ content
        ├─ darkMode
        ├─ footer
        ├─ loading
        ├─ nav
        ├─ scroll
        ├─ search
        └─ seo
├─ constants
├─ hooks
├─ images
├─ pages
├─ style
│
├─ App.js
├─ index.js
├─ package.json
└─ README.md
```

<br/>
<br/>

## 페이지 및 주요 기능

### 페이지
#### 메인 페이지
* 메인 슬라이드 콘텐츠
* 카테고리 별 슬라이드 콘텐츠

<p align="center">
  <img 
  src="https://github.com/Hschan2/ToyProject/blob/master/movie/frontend/src/images/main.gif?raw=true" 
  width="400">
</p>

#### 자세한 페이지
* 자세히 보기 버튼 클릭 또는 카테고리 별 영화 이미지 클릭 시 자세한 페이지 이동

<p align="center">
  <img 
  src="https://blog.kakaocdn.net/dn/oUgVl/btsHSe2y3n7/oL1dEk6MBkq8toDkkN7rz1/img.gif" 
  width="400">
</p>

#### 로딩 페이지
* 페이지 로딩

<p align="center">
  <img 
  src="https://blog.kakaocdn.net/dn/ynYky/btsHQSNaKdH/fkvaFoCPxcJbWwgY0sgtcK/img.gif" 
  width="400">
</p>
   
* 데이터 불러오는 과정에서 스켈레톤 로딩

<p align="center">
  <img 
  src="https://blog.kakaocdn.net/dn/dEEL3J/btsHRvDYLDL/aibSimFu7HMtdt6fVuUU6k/img.gif" 
  width="400">
</p>

#### 검색 페이지
* 영화 검색

<p align="center">
  <img 
  src="https://github.com/Hschan2/ToyProject/blob/master/movie/frontend/src/images/search.gif?raw=true" 
  width="400">
</p>

<p align="center">
  <img 
  src="https://github.com/Hschan2/ToyProject/blob/master/movie/frontend/src/images/mobile_searching.gif?raw=true" 
  width="400">
</p>

### 기능
#### 다크모드
<p align="center">
  <img 
  src="https://blog.kakaocdn.net/dn/cnSyjL/btsHQjkcVP9/IuqoiR5KVQHKBlYSmTpBkK/img.gif" 
  width="400">
</p>

### 그 외 기능
* 상단 이동 버튼 구현
* Lottie Files로 애니메이션 로고 구현
* React-Slick 라이브러리를 활용해 슬라이드 구현 (커스텀 스타일 적용)

<br/>

## 기술 선택
#### React를 선택한 이유
중복적으로 사용되는 부분을 컴포넌트로 분리하여 재사용함으로써 효율적으로 개발이 가능하기 때문에 선택하였습니다.   

필요한 라이브러리를 쉽게 설치하고, 불러와 사용할 수 있기 때문입니다.

#### API 호출에 Spring을 선택한 이유
React + Spring 프로젝트로 구현되는 경우가 많다는 이야기와 스프링을 사용해보고 싶다는 생각에 API 구현에 Spring을 사용하였습니다.   

서버 동작 시, API 호출 URL만 작성하면 쉽게 영화 데이터를 불러올 수 있기 때문에 Spring을 선택하였습니다.

#### themoviedb API을 선택한 이유
무료로 사용이 가능한 API이며, 다양한 카테고리로 영화 데이터를 불러올 수 있으며, 검색 구현이 가능하기 때문에 선택하였습니다.

#### 이 프로젝트를 개발한 이유
무한 스크롤과 검색 구현을 개발해보고 싶다는 생각과 다양한 주제, 카테고리 별로 영화 정보를 확인하고 싶기 때문에 개발하였습니다.

#### 자바스크립트에서 타입스크립트로
자바스크립트에서 타입스크립트로 전환하였습니다. 자바스크립트로 실행해도 문제가 없었으나, 함수에 원하지 않는 값이 전달되어도 바로 오류를 확인할 수 없고, 실행하고 나서야 확인할 수 있다는 것이 문제였습니다.   

그래서 이와 같은 문제들을 빠르게 파악하고 처리하기 위해 타입스크립트로 전환하였습니다.

<br/>

## 개발 예정 목록
* Intersection Observer API을 이용해 무한 스크롤 구현

<br/>

## 프로젝트 주요 타겟
* 다양한 카테고리 별로 영화 정보를 쉽게 확인하고 싶은 사람

<br/>

## 실행
```
npm install

npm start
```