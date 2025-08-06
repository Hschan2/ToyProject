# 사진 자동 보정

<br/>

### **사진 자동 보정** - 사진을 자동으로 보정해 드립니다.

<br/>

`사진 자동 보정`은 사진을 직접 수동으로 보정할 필요없이 상황별, 주제별로 자동으로 보정해주는 서비스입니다.

## 체험

[Auto-Photo-Enhancer](https://auto-photo-enhancer.vercel.app/)

<br/>

## 사진 자동 보정 개발자

### 풀스택

|                           [홍성찬](https://github.com/Hschan2)                            |
| :---------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/39434913?v=4" width="100" height="100"> |
|                            사진 자동 보정 전체 개발 <br/> 전체 디자인                             |

<br/>
<br/>

## 기술 스택

#### 프레임워크

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![NextJS](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white)

#### 라이브러리

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![OpenRouter API](https://img.shields.io/badge/OpenRouter_API-00A67E?style=for-the-badge&logo=openai&logoColor=white)
![Eslint](https://img.shields.io/badge/Eslint-4B0082?style=flat-square&logo=Eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-FF69B4?style=flat-square&logo=prettier&logoColor=white)
![FFmpeg](https://img.shields.io/badge/FFmpeg-FF69B4?style=flat-square&logo=FFmpeg&logoColor=white)

#### 개발 도구

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge)

#### 통신
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

#### 유틸
![Lucide](https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white)

<br/>

## 폴더 구조

```
src
│
├─ app
│   └─ api
│
├─ components
│   └─ ui
├─ constants
├─ hooks
├─ types
├─ utils
│
├─ public
│
├─ next.config.js
├─ package.json
├─ 구현목록.md
└─ README.md
```

<br/>

## 페이지 및 주요 기능
- 시작
![Start](https://blog.kakaocdn.net/dn/cg43LM/btsNTSrTSkC/IaafxfojfHoKLRkz9OmoUk/img.gif)

- 기본 보정
![Basic](https://blog.kakaocdn.net/dn/bpkoHr/btsNSyVG9Id/GvW1qU7xvaoGkUdYIqmYKk/img.gif)

- AI 보정
![AI](https://blog.kakaocdn.net/dn/boFIJp/btsNSdqAsJq/ncY8lm68nKIIejsZ0OIHK1/img.gif)

- 초기화
![Reset](https://blog.kakaocdn.net/dn/brNkj1/btsNR3oeAOI/kA2jEpkiOlru3CJAJHe6Q0/img.gif)

- 다운로드
![Download](https://blog.kakaocdn.net/dn/cwhBSS/btsNScE8Qzs/LDFeHaDuiW5UpkCwhir1Yk/img.gif)
![Result](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FK9CG2%2FbtsNSMTyxze%2FMJmEG7LYn6kvZHtenkuh70%2Fimg.png)

## 개발 후기
#### AI 활용 문제
초반 계획은 첨부된 이미지를 AI가 읽고 요청한 느낌에 맞게 보정하는 것으로 구현하고자 하였으나, 이러한 기능을 구현하기 위해서는 유료 AI API를 사용해야 한다는 문제로 과금 문제가 발생할 수 있어 보류하였습니다.   

대신, openRouter API의 무료 모델을 활용해 원하는 느낌의 보정을 진행하기 위해 자세한 내용의 Prompt로 요청사항을 보내고, 이미지에 적용할 수 있는 CSS Filter 값들을 JSON으로 반환받아 이미지에 바로 적용하였습니다.   

#### 서비스 구현 및 디자인 고민
전체적인 기능은 간단하지만, 트렌드에 맞는 보정을 적용하기 위해 CSS Filter 값들을 조정하는 데 고민과 여러 시도가 있었습니다. 보정된 결과물에 대한 만족도는 주관적이지만 최대한 좋은 느낌으로 적용될 수 있도록 하였습니다.   

또한, 단순하면서도 트렌디한 느낌의 UI 디자인을 구현하기 위해 노력하였습니다. 적절한 아이콘을 사용하고, 각 필터 조정 버튼마다 알맞는 텍스트로 나타냈습니다.   

그리고 최대한 스크롤이 없이 한 화면에서 이용할 수 있도록 하였으며, 스크롤이 발생하더라도 불편함이 없이 최대한 적은 스크롤로 사용할 수 있도록 사이즈를 조절하였습니다.   

#### 동영상 보정 (FFmpeg 라이브러리를 클라이언트 측에서 서버 측으로 호출)
이미지 보정에서 범위를 넓혀 동영상 보정을 추가하였습니다. 이 과정에서 `FFmpeg` 라이브러리를 알게 되었고, 기존 방식을 유지하여 클라이언트 방식으로 요청하여 보정된 동영상을 다운로드할 수 있도록 시도하였습니다.   

그러나, 클라이언트 방식으로는 요청이 계속 실패되었고, 이 때, `FFmpeg` 라이브러리를 서버 측에 요청하여 처리해야 한다는 것을 배웠습니다. 이 후, `openRouter API`를 서버에서 호출했던 방식을 그대로 `FFmpeg` 라이브러리에도 적용하였고, 첨부된 동영상을 녹화한 내용본을 그대로 다운로드를 할 수 있도록 문제를 해결하였습니다.   

또한, 기존 동영상 보정을 위한 필터값을 변수에 담아 CSS Filter에 담는 방식으로 시도하였으나, 다운로드된 동영상이 필터가 적용되지 않는 문제가 발생했습니다. 이는, useState의 비동기적 업데이트로 최신 값이 적용되기 전의 이전 값이 적용될 수 있는 문제로 인해 발생하는 것으로, `useRef`를 활용함으로써 항상 최신 값이 적용되도록 하여 필터를 적용시킬 수 있었습니다.   

#### 기능 테스트
기본적으로 CSS Filter 값이 제대로 적용이 되는지 테스트를 진행하는 것부터 시작해 openRouter API가 제대로 동작하는지 테스트를 진행했습니다. 또한, 파일 첨부가 제대로 이루어지는지 테스트를 진행했습니다.   

이 과정에서 `FileReader`를 비동기로 처리해 `onload`가 완료되기 전에 테스트가 종료되어 실패하였습니다. 이를 수동으로 `Mock` 처리해 테스트가 성공되도록 수정하였습니다.   

`openRouter API` 테스트 또한, 비동기로 처리되어 비슷한 문제가 발생하였고, 비슷한 방법으로 해결했습니다.   

또한, 이미 `getByLabelText`로 `input`을 받고 있음에도 불구하고, `querySelector`를 사용했고, null이 발생하는 문제가 있었습니다. `querySelector`를 삭제해 null 전달 에러를 해결했습니다.   

## 이 프로젝트를 개발한 이유
매번 직접 사진을 보정하면서 귀찮을 때가 종종 발생하였습니다. 이러한 경우, 클릭 한 번으로 원하는 사진으로 보정해주는 기능을 원하는 마음으로 구현하였습니다.

## 프로젝트 주요 타겟
- 사진 보정이 귀찮은 사람, 보정을 할 줄 몰라 자동으로 보정을 원하는 사람

## 실행

```
npm install
npm run dev
```
