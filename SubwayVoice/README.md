# Subway Voice

<br/>

### **지하철 목소리** - 각 역에 가까워질 때마다 목소리로 알려줍니다

<br/>

`지하철 목소리`는 각 역에 가까워지거나 도착할 때마다 목소리로 알려줍니다. 우리는 출·퇴근을 하거나, 지하철을 이용할 때, 모니터를 확인하지 못하는 경우가 발생해 현재 어떤 역에 도착했는지 알지 못하는 경우가 발생합니다. 이를 방지하기 위해서, `지하철 목소리`는 역에 가까워지거나 도착할 때마다 목소리로 알려줌으로써 사용자가 역을 바로 알 수 있도록 도와줍니다.

<br/>

## 지하철 목소리 개발자

### 모바일

|                           [홍성찬](https://github.com/Hschan2)                            |
| :---------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/39434913?v=4" width="100" height="100"> |
|                         지하철 목소리 전체 개발 <br/> 전체 디자인                         |

<br/>

## 기술 스택

#### 프레임워크

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

#### 라이브러리

![Eslint](https://img.shields.io/badge/Eslint-4B0082?style=flat-square&logo=Eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-FF69B4?style=flat-square&logo=prettier&logoColor=white)

#### 개발 도구

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge)

<br/>

## 폴더 구조

```
├─ android
├─ ios
│
├─ App.tsx
├─ index.js
├─ jest.config.js
├─ metro.config.js
├─ package.json
├─ tsconfig.json
│
└─ README.md
```

<br/>

## 스케치
#### 메인 화면
![Main](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcGNkoS%2FbtsKc1fwOjo%2FC5cRfPRdT3bv91r0UiZNbk%2Fimg.png)

#### 경로 검색
![Searching](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FrqOOi%2FbtsKcjufuVa%2FJB5pNrhg50lkjka1wPwYg1%2Fimg.png)

#### 경로 진행
![Progressing](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FFUcAN%2FbtsKc1mgJqx%2FHG2wRbjPFWwMRdoMhxhbc1%2Fimg.png)

<br/>

## 기술 선택

#### React-Native를 선택한 이유

가장 익숙한 언어인 `React`와 비슷한 기술이기 때문에 `React-Native`를 선택했습니다. 그리고, 안드로이드와 IOS를 동시에 개발이 가능하다는 장점이 있다는 것도 하나의 이유입니다.

## 이 프로젝트를 개발한 이유

지하철을 이용할 때, 가끔씩 모니터를 확인할 수 없는 상황을 마주하였습니다. 그럴 때마다, 창밖을 확인하는 등 불편한 상황들이 많았습니다. 그래서 이런 상황을 방지하기 위해서 각 역에 근접하거나, 도착할 때 해당 역을 목소리로 알려줌으로써 모니터를 확인하지 않아도 역 확인을 할 수 있기 위해 기획하였습니다.

## 프로젝트 주요 타겟

지하철 이용 시, 역을 확인하기 어려운 상황을 자주 마주했던 사람

## 실행

```
npm install

npm start

// npm run android
// npm run ios
```
