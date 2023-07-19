# 이미지 편집기

![banner](https://github.com/Hschan2/ToyProject/blob/master/pictureFilter/editor-project/imageFilter.PNG?raw=true)

<br/>

### **이미지 편집기** - 이미지를 쉽게 보정하고 편집할 수 있는 서비스

<br/>

이미지 편집기는 밝기, 대비 등 이미지 보정값을 조절할 수 있고, 크기 조절과 회전 기능, 자르기를 사용하여 이미지를 편집할 수 있습니다.   

또한, 편집한 이미지를 다운로드하여 외부 파일로 추출할 수 있습니다. 만약, 이미지 편집을 다시 하고 싶다면 초기화할 수 있습니다.   

![imageFilter](https://github.com/Hschan2/ToyProject/raw/master/pictureFilter/editor-project/1.gif)

<br/>

## 체험
배포 예정   

## 퀵뉴스 개발자

### 프론트엔드
| [홍성찬](https://github.com/Hschan2) |
| :---: |
| ![](https://avatars.githubusercontent.com/u/39434913?v=4) |
| 이미지 필터 기능 구현 <br/> 이미지 회전 및 전환 기능 <br/> 구현 이미지 자르기 기능 구현 <br/> 필터 초기화 기능 구현 <br/> 이미지 저장 기능 구현 <br/> 전체 디자인 |

<br/>
<br/>

## 기술 스택

#### 프레임워크
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)

#### 개발 도구
![VSCode](https://img.shields.io/badge/VSCODE-007ACC?style=for-the-badge&logo=visual studio code&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge)

#### 배포
예정

<br/>
<br/>

## 폴더 구조
```
src
├─ component
├─ constant
│
├─ style
│
├─ App.js
└─ index.js
```

<br/>
<br/>

## 주요 기능
#### 이미지 필터
* 밝기, 대비, 흑백, 색상, 흐림, 크기 등 필터 조절 기능

#### 이미지 조절
* 이미지 회전, 반전, 자르기 기능으로 이미지 크기 조절
* 이미지 필터 및 조절 초기화 기능으로 적용한 모든 부분 초기화

#### 이미지 저장
* 이미지 조절, 이미지 필터가 적용된 이미지 저장 기능으로 외부로 이미지 파일 추출

![이미지저장](https://github.com/Hschan2/ToyProject/raw/master/pictureFilter/editor-project/2.gif)

## 기술 선택
#### React를 사용한 이유
* 중복적으로 사용되는 코드들을 컴포넌트로 분리하여 재사용함으로써 프로젝트를 효율적으로 구현할 수 있기 때문에 선택하였습니다.

## 이 프로젝트를 개발한 이유
사진 보정 애플리케이션인 어도비 라이트룸의 사용자로서 사진을 보정하는 과정과 기능을 구현에 궁금함으로 이 프로젝트를 개발하였습니다.   

또한, 사진과 관련된 커뮤니티 프로젝트를 기획하고 있으며, 이 프로젝트에 활용 계획으로 이미지 편집 기능을 미리 구현해보고 싶어 개발하였습니다.   

## 프로젝트 주요 타겟
* 간단하게 이미지를 편집하고 저장하고 싶은 사람

## 실행
```
npm install
npm start
```