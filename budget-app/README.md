# Budget Application (가계부)

![banner](https://github.com/Hschan2/ToyProject/blob/master/budget-app/public/banner.PNG?raw=true)

<br/>

### **가계부** - 쉽고 간단하게 작성하는 가계부 서비스

<br/>

가계부는 카테고리 별 가계부를 작성할 수 있습니다. 예산과 지출을 추가하고 수정하고 삭제할 수 있습니다.   

또한, 일정 범위에 따라 양호, 경고, 위험을 색상으로 나타내어 가계부 상태를 직관적으로 알려줍니다.   

![budget](https://github.com/Hschan2/ToyProject/assets/39434913/bc3c331f-7772-4f76-9ffb-e2e68b7dda20)

<br/>

## 체험
[Budget](https://hong-budget-app.netlify.app/)

<br/>

## 가계부 개발자

### 프론트엔드
| [홍성찬](https://github.com/Hschan2) |
| :---: |
| <img src="https://avatars.githubusercontent.com/u/39434913?v=4" width="100" height="100"> |
| 가계부 전체 개발 <br/> 전체 디자인 |

<br/>
<br/>

## 기술 스택

#### 프레임워크
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)

#### 라이브러리
![Bootstrap](https://img.shields.io/badge/Bootstrapap-7952B3?style=flat-square&logo=bootstrap&logoColor=white)

#### 데이터
![LocalStorage](https://img.shields.io/badge/LocalStorage-F7DF1E?style=flat-square&logo=localstorage&logoColor=black)

#### 개발 도구
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge)

#### 배포
[![Netlify](https://badges.netlify.com/api/site-name.svg?branch=master)](https://hong-budget-app.netlify.app/)

<br/>
<br/>

## 폴더 구조
```
src
├─ component
|
├─ constants
├─ context
|
├─ hooks(LocalStorage)
|
├─ images
│
├─ App.js
├─ utils.js
└─ index.js
```

<br/>
<br/>

## 프로젝트 색상
* Blue
* Green
* Yellow
* Red

<br/>
<br/>

## 주요 기능

#### 지출 및 예산 저장
* 지출, 예산 기능에서 값 입력 후 저장 시, LocalStorage에 저장
* 지출 저장 시, LocalStorage에 저장된 시간 저장

#### 지출 내역
* 지출 내역 확인 시, 이름, 저장시간, 비용, 수정 및 삭제 버튼 출력

#### 예산 수정 및 삭제
* 지출 내역에서 예산 내역의 이름과 값 수정 가능
* 예산 삭제 시, 예산의 지출까지 모두 삭제
* 지출 삭제 시, 지출 목록에서 삭제 및 전체 값에서 삭제

#### 상태 색상 표시
* 예산 지출 전체 상태를 색상으로 표현
* 50% 이하 시 초록색(양호), 50% 초과 75% 이하 시 노란색(경고), 75% 초과 시 빨간색(위험)으로 표시

## 기술 선택
#### React를 선택한 이유
* 중복 사용하는 코드를 컴포넌트로 분리해 재사용할 수 있기 때문입니다.
* 부트스트랩 등 원하는 라이브러리를 설치만으로 쉽게 사용할 수 있기 때문입니다.
* 변수 상태 관리가 가능하기 때문입니다.

#### LocalStorage를 사용한 이유
* 거대하지 않고 회원 가입 등의 기능이 없는 작은 크기의 프로젝트이기 때문에 데이터 베이스를 사용하기 보다 LocalStorage를 사용하는 것이 적절하다고 판단하였기 때문입니다.

## 개발한 이유
* 지출 현황을 제대로 기록하지 않는 본인의 습관을 고치기 위해 가계부 작성할 수 있는 서비스를 개발하였습니다.

## 프로젝트 주요 타겟
* 쉽고 간단하게 브라우저에서 가계부를 관리하고 싶은 사람