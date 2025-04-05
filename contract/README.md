# 안전의증서

<br/>

### **안전의증서** - 간편하게 계약서를 작성하세요

<br/>

'안전의증서'는 다양한 계약서를 쉽게 작성할 수 있게 제공하는 서비스로, 문서 파일로 내보내거나 저장이 가능합니다.   

<br/>

## 체험(추가예정)
[추가예정]()

<br/>

## 안전의증서 개발자

### 웹 개발

|                           [홍성찬](https://github.com/Hschan2)                            |
| :---------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/39434913?v=4" width="100" height="100"> |
|                       안전의증서 개발 <br/> 전체 디자인                        |

<br/>
<br/>

## 기술 스택

#### 프레임워크

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![NextJS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

#### 라이브러리

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)
![Eslint](https://img.shields.io/badge/Eslint-4B0082?style=flat-square&logo=Eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-FF69B4?style=flat-square&logo=prettier&logoColor=white)

#### 데이터베이스

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

#### 개발 도구

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge)

#### 배포

<!-- ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white) -->

<br/>

## 폴더 구조

```
contract
├─ app
│   ├─ components
│   ├─ contract
│   ├─ home
│   ├─ hooks
│   ├─ notification
│   └─ types
│
├─ public
│
├─ eslint.config.mjs
├─ next.config.ts
├─ postcss.config.mjs
├─ tsconfig.json
├─ package.json
│
└─ README.md
```

<br/>
<br/>

## 페이지/기능

#### 홈

- 계약서 작성 전 본인 확인 페이지
- 계약서 메뉴

#### 계약서

- 각 메뉴에 맞는 계약서 입력 페이지

<br/>

## 실행화면
- 홈
![Home](https://blog.kakaocdn.net/dn/YBUGN/btsNaANgtAR/nkIdM3Imf1hzOv4wkx0Xf0/img.gif)

## 기술 선택
#### Next.js 선택 이유
- 단순 입력 페이지가 아닌, 작성된 계약서 내용을 저장할 수 있는 서버도 구현할 계획으로 'React'와 'Node.js'의 프레임워크를 각각 설치해서 사용하기 보다, 한 번에 구현이 가능한 'Next.js'를 선택했으며, 최근 'Next.js'에 대한 관심이 증가함으로써 관련 경험을 쌓기 위한 이유도 있습니다.   

## 개발 과정 중 겪고 있거나 겪은 고민들
- 계약서 디자인, 각 계약서의 모든 디자인을 공통으로 처리해야 하는지, 아니면 각각 계약서마다 맞는 디자인으로 처리해야 하는지 고민하였으며, 현재는 공통적인 디자인을 기반으로 구현되어 있습니다. 그러나, 계약서라는 특성과 이를 사용하는 사용자 입장에서 디자인을 항상 고민중입니다.   

- '갑'과 '을'의 입장인 경우, 갑이 전달하는 계약서를 을이 작성했을 때, 갑을 기준으로 계약서를 저장하는 방식을 고민하고 있습니다. 갑이 어떤 방법으로 을에게 계약서를 전달할 수 있는지를 고민합니다.   

## 이 프로젝트를 개발한 이유
유튜브 한 채널에서 단순한 학습보다 실제 구현하는 방법을 추천하면서 본인의 학생들의 실제 예시 프로젝트 주제 중 하나였으며, 이를 나만의 방식으로 구현하면 좋을 것 같다는 생각으로 개발을 시작하였습니다. 데이터를 저장하거나, 파일로 내보내는 방식에 대한 학습을 할 수 있을 것이라는 기대감을 갖고 있습니다.   

## 후기
- UI 구현, 이전까지 'Styled Component' 라이브러리를 사용해 디자인을 구현했으나, 이번에는 'Tailwind CSS'를 사용했습니다. 따로 스타일 변수를 생성해 각각 컴포넌트 형식의 디자인으로 적용할 필요 없이 'className'으로 바로 디자인을 적용할 수 있다는 편리함이 있었으나, 복잡해질 수 있다는 단점도 느꼈습니다. 각 장단점이 있음을 느끼며, 프로젝트 규모나 선호도에 따라 사용하면 될 것 같습니다.   

## 프로젝트 주요 타겟
- 계약서를 출력해서 작성한 뒤 제출하는 방식에서 디지털 방식으로 편리하게 계약서 작성을 하고 싶은 사람

## 실행

```
npm install
npm run dev
```
