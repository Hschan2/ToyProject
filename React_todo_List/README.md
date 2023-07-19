# ToDo List
React JS로 ToDo List 만들기

## 프로젝트 기술
* To Do List   
    * REACT, REACT HOOK
    * Color List를 생성하여 To Do 색상 적용   

# 메모 리스트

### **메모 리스트** - 4개의 색상으로 메모할 수 있는 서비스

<br/>

메모 리스트는 메모하고 싶은 모든 내용들을 기록할 수 있습니다.   

또한, 꾸미기를 좋아하거나, 메모의 특성에 따라 다른 색상으로 기록할 수 있습니다.   

![todo_list](https://github.com/Hschan2/ToyProject/blob/master/React_todo_List/public/todo_list.gif?raw=true)

<br/>

## 메모 리스트 개발자

### 프론트엔드
| [홍성찬](https://github.com/Hschan2) |
| :---: |
| ![](https://avatars.githubusercontent.com/u/39434913?v=4) |
| ToDo List 구현 <br/> 색상 선택 버튼 구현 <br/> Checked 및 삭제 버튼 구현 <br/>전체 디자인 |

<br/>
<br/>

## 기술 스택

#### 프레임워크 및 라이브러리
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)

#### 데이터 저장
![LocalStorage](https://img.shields.io/badge/LocalStorage-%23323330.svg?style=for-the-badge&logo=LocalStorage&logoColor=%23F7DF1E)

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
├─ interfaces
│
├─ App.js
└─ index.js
```

<br/>
<br/>

## 메모 선택 색상
* #343A40
* #F03E3E
* #12B886
* #228AE6

<br/>
<br/>

## 주요 기능
#### ToDo List
* 메모를 추가하면 LocalStorage에 저장
* LocalStorage의 Set, Get으로 메모 데이터 관리

#### 색상 선택
* 검정색, 빨간색, 파란색, 초록색의 4가지 색상으로 메모 작성
    * Color 값을 key 값으로 주어 이를 기준으로 색상 선택
    * 작성 및 추가 시 해당 색상으로 스타일 적용하여 저장

<br/>

## 기술 선택
#### React를 선택한 이유
* 컴포넌트를 분리하여 중복 사용되는 함수 또는 코드들을 재사용할 수 있기 때문에 선택
* 필요한 라이브러리를 설치해서 쉽게 사용하기 때문에 사용

<br/>

## npm start를 하면 webpack 에러가 발생하는 문제
["npm start" 시 webpack 에러가 나는 경우](https://hseongchan2.tistory.com/100)

<br/>

## 이 프로젝트를 개발한 이유
개발을 시작하고 나서, 가장 기초적인 프로젝트로 ToDo List를 구현하고자 하였으며, 추가적으로 색상을 선택할 수 있는 ToDo List를 구현하고 싶어 이 프로젝트를 개발하였습니다.   

<br/>

## 프로젝트 주요 타겟
* 여러 색상으로 메모를 기록하고 싶은 사람

<br/>

## 실행
```
npm install
npm run dev
```