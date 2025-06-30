# 자막 자동 번역기 (개발중)

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
│   ├─ components
│   ├─ routes
│   └─ utils
│
├─ public
│
├─ env
├─ next.config.js
├─ package.json
├─ 구현목록.md
└─ README.md
```

<br/>

## 페이지 및 주요 기능

## 개발 후기

#### AI 활용 문제
원하는 형식으로 자막 파일 내용을 번역하는 데 어려움을 겪었습니다. 자막 파일에 맞는 형식이 아닌 모든 내용을 번역하여 형식을 벗어나 자막으로 사용할 수 없도록 번역이 되는 문제를 겪었습니다.   

또한, 요청 시간 제한으로 인해 모든 내용을 번역할 수 없는 문제가 있었습니다. 예를 들어, 20분 길이의 자막 내용을 10분 길이만 번역이 되는 등 원하는 결과를 얻지 못했습니다.   

## 이 프로젝트를 개발한 이유

해외 작품. 특히, 일본 드라마와 영화를 자주 보는 사람으로서 한국에서 저작권을 구입하지 않아 일본드라마 카페에서 다운로드할 수 있는 여러 작품들을 일본어 자막으로 봐야하는 문제가 있었습니다. 이러한 불편함을 개선하고자, 자막 파일의 내용을 한국어로 번역하고 다운로드 할 수 있는 서비스를 개발하고 싶었습니다.   

## 프로젝트 주요 타겟

- 외국어 자막으로 인해 불편함을 겪고 있는 해외 작품 시청자

## 실행

```
npm install
npm run dev
```
