# 자막 자동 번역기

<br/>

### **자막 자동 번역기** - 자막 파일의 내용을 원하는 언어로 자동으로 번역합니다.

<br/>

`자막 자동 번역기`은 자막 파일(.srt, .smi)의 내용을 읽어 원하는 언어로 번역을 도와주는 서비스입니다.

## 체험

[Subtitle-Translator]()

<br/>

## 자막 자동 번역기 개발자

### 풀스택

|                           [홍성찬](https://github.com/Hschan2)                            |
| :---------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/39434913?v=4" width="100" height="100"> |
|                       자막 자동 번역기 전체 개발 <br/> 전체 디자인                        |

<br/>
<br/>

## 기술 스택

#### 프레임워크

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Remix](https://img.shields.io/badge/remix-%23000.svg?style=for-the-badge&logo=remix&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

#### 라이브러리

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![OpenRouter API](https://img.shields.io/badge/OpenRouter_API-00A67E?style=for-the-badge&logo=openai&logoColor=white)
![Eslint](https://img.shields.io/badge/Eslint-4B0082?style=flat-square&logo=Eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-FF69B4?style=flat-square&logo=prettier&logoColor=white)

#### 개발 도구

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge)

<br/>

## 폴더 구조

```
src
│
├─ app
│   ├─ api
│   ├─ layout.tsx
│   └─ page.tsx
│
├─ components
├─ lib
├─ types
├─ utils
├─ public
│
├─ __tests__
│
├─ jest.config.ts
├─ next.config.js
├─ package.json
├─ 구현목록.md
└─ README.md
```

<br/>

## 페이지 및 주요 기능

## 개발 후기

#### AI 활용 문제
자연스러운 번역을 위해 `openRouter API`의 무료 모델을 사용하였으나, 요청 시도 제한 등 현실적인 문제로 많은 양의 내용을 번역하기 어렵다는 판단을 하였습니다. 유료 모델을 사용하지 않는 이상 AI로 번역 기능을 구현하는 것을 어렵다고 판단해 AI를 제거하고 번역 라이브러리를 사용하였습니다.

#### 파파고 번역과 Lingva 번역
AI 번역을 포기하고, Lingva 라이브러리를 설치해 번역 시도를 하였습니다. 아주 일부 내용을 제외하고 거의 대부분의 내용이 번역되었으나, 부자연스러운 내용으로 번역되는 아쉬움이 존재하였습니다.   

조금 더 자연스러운 내용으로 번역하기 위해 파파고 번역(비공식)을 시도하였습니다. 그러나, 비공식 API로 시도 자체가 불가능한 경우가 존재해 실패 시, 기존 Lingva 라이브러리를 사용하는 것으로 문제를 보완하였습니다.   

#### 테스트
두 가지의 테스트를 진행하였습니다.   

- 첫 번째, 비공식의 `파파고 번역`이 제대로 동작하는가?   
서비스에서 사용하고 있는 비공식 파파고 번역 API를 대신해 테스트에서 실행할 수 있는 파파고 번역의 `fake` API를 사용해 테스트를 진행하였으나, 번역이 진행되지 않음을 확인하였습니다.   

- 두 번째, 비공식 파파고 번역이 동작하지 않을 경우에 Lingva 라이브러리로 번역 시도가 제대로 진행되는가?   
첫 번째 테스트에서 확인하여 비공식 파파고 번역이 제대로 동작하지 않음을 확인해 발생할 문제를 보완하기 위해 실패 시 Lingva으로 번역이 진행되도록 테스트를 시도하였습니다. 여러가지 상황을 고려하여 실제 API를 사용하지 않고, 진짜를 대신할 가짜의 `Mock`으로 테스트를 진행하였으며, 파파고 번역 실패 시, Lingva 라이브러리로 번역이 성공하는 것을 확인하였습니다.   

## 이 프로젝트를 개발한 이유

해외 작품. 특히, 일본 드라마와 영화를 자주 보는 사람으로서 한국에서 저작권을 구입하지 않아 일본드라마 카페에서 다운로드할 수 있는 여러 작품들을 일본어 자막으로 봐야하는 문제가 있었습니다. 이러한 불편함을 개선하고자, 자막 파일의 내용을 한국어로 번역하고 다운로드 할 수 있는 서비스를 개발하고 싶었습니다.   

## 프로젝트 주요 타겟

- 외국어 자막으로 인해 불편함을 겪고 있는 해외 작품 시청자

## 실행

```
npm install
npm run dev
```
