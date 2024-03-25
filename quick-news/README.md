# Quick News

![banner](https://github.com/Hschan2/ToyProject/blob/master/quick-news/public/title_image.PNG?raw=true)

<br/>

### **퀵뉴스** - 빠르게 볼 수 있는 주제별 주요 뉴스 제공 서비스

<br/>

퀵뉴스는 오늘의 주요 뉴스와 각 주제별 뉴스들을 빠르게 볼 수 있도록 도와줍니다.   

또한, 버튼 하나로 뉴스 데이터의 갯수를 정할 수 있으며, 클릭 하나로 해당 사이트에서 뉴스를 확인할 수 있습니다.   

![quick-news](https://github.com/Hschan2/ToyProject/assets/39434913/8e2bcb21-6328-43d4-bd01-38a1cb4d320b)

   
버튼 형식에서 무한 스크롤로 데이터를 불러오는 방식을 변경하였습니다.   

![Infinite](https://github.com/Hschan2/ToyProject/blob/master/quick-news/public/screen-recording.gif)

<br/>

## 체험
[Quick-News](https://quick-news-tau.vercel.app/)
* 무료 API 사용으로 배포 시 데이터 확인이 불가능합니다.   

<br/>

## 퀵뉴스 개발자

### 프론트엔드
| [홍성찬](https://github.com/Hschan2) |
| :---: |
| <img src="https://avatars.githubusercontent.com/u/39434913?v=4" width="100" height="100"> |
| 퀵뉴스 전체 개발 <br/> 전체 디자인 |

<br/>
<br/>

## 기술 스택

#### 프레임워크
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![NextJS](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white)

#### 라이브러리
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![RTK-Query(Redux)](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Recoil](https://img.shields.io/badge/recoil-000000?style=flat-square&logo=recoil&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Eslint](https://img.shields.io/badge/Eslint-4B0082?style=flat-square&logo=Eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-FF69B4?style=flat-square&logo=prettier&logoColor=white)

#### 통신
![Axios](https://img.shields.io/badge/axios-%23323330.svg?style=for-the-badge)

#### 개발 도구
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge)

#### 배포
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white)

<br/>
<br/>

## 폴더 구조
```
src
├─ constants
├─ interfaces
│
├─ pages
│  ├─ api
│  ├─ components
│       ├─ btn
│       ├─ fetch
│       ├─ footer
│       ├─ info
│       ├─ nav
│       ├─ page
│       └─ seo
│  ├─ hooks
│  ├─ _app.tsx
│  └─ _document.tsx
│
├─ public
├─ styles
│
├─ next.config.js
├─ package.json
└─ README.md
```

<br/>
<br/>

## 프로젝트 공통 색상
* #4D7653

<br/>
<br/>

## 페이지 및 주요 기능

#### 공통
* 상단 이동 버튼 구현
* 오늘 날짜 출력(Date)
* 내 위치 기반 현재 날씨 출력(openWeatherMap API)
* 페이지 상단에 스크롤 위치 출력

#### 메인 페이지
* 네이버 뉴스 검색 API에서 가져온 데이터로 "오늘의 주요 뉴스" 목록 출력

#### 각 주제별 뉴스 페이지
* News API에서 가져온 데이터로 각 주제별 뉴스 목록 출력
* 뉴스 데이터 갯수 20~40개 설정 버튼 구현

#### 최적화
* 프로젝트 성능 향상을 위해 최적화를 진행하고 있습니다.
* 1차 성능 최적화
    * IntersectionObserver을 이용한 Custom Hook 만들어 처음부터 페이지에 모든 데이터가 출력되지 않고, 스크롤 할 때마다 로드되도록 수정하였습니다.
    * React-Query를 사용하여 API 데이터를 가져오고 사용할 때, 캐시 기능을 사용하였습니다. 또한, 불필요한 리렌더링을 방지하도록 수정하였습니다.
    * 결과적으로, 속도를 약 325m/s에서 약 220m/s으로 감소시켰습니다.
    * 최적화 전
    ![Before](http://naver.me/xQ86jpjD)
    * 최적화 후
    ![After](http://naver.me/5uiAmNcN)
* 2차 성능 최적화
    * 더보기 기능을 위한 무한 스크롤 시, 불필요한 리렌더링 방지를 위해 useMemo, useCallback 기능을 활용하였습니다.
    * 스타일 컴포넌트를 사용 시, 로드 전에 불러오는 방식으로 Dynamic을 활용해 페이지 초기 접근 또는 새로고침할 때 스타일이 적용되지 않은 문제를 해결했습니다.
* 3차 성능 최적화
    * NextJS의 ```<Image>```를 사용해 로딩페이지 및 404 에러페이지의 이미지 최적화를 진행하였습니다.
    * "useRef.current"로 값을 참조하고 조건문으로 비교하여 같은 단어가 중복 검색됨으로써 불필요한 서버 요청을 하지 않도록 이를 방지하였습니다.

#### 뉴스 검색 기능
뉴스 검색 버튼을 하단 오른쪽에 생성하여, 버튼 클릭 시 입력할 수 있는 박스가 애니메이션으로 나타나도록 하였습니다. 그리고 입력한 값으로 뉴스가 검색되며, 해당 내용의 뉴스들이 나타납니다.   

![뉴스 검색](http://naver.me/5ZjY2TVe)

Recoil로 검색 값을 저장해 활용하는 방식에서 NextJS의 Navigation을 이용해 Param으로 값을 넘기는 방식으로 수정하였습니다.   

같은 단어로 중복 검색 시, 불필요한 서버 요청을 방지하기 위해 중복 검색을 방지하였습니다.
   
#### 반응형 만들기
브라우저 크기에 따라 전체적인 크기가 변경되도록 하였습니다. 1차 수정이 이루어졌으며, 더 깔끔하고 자연스러운 반응형으로 개발할 계획입니다.   

![반응형](http://naver.me/G1sU69f9)

2차 수정으로 태블릿, 모바일 버전을 고려하여 폰트 크기, 버튼 크기와 위치를 조절하였습니다.   
   
#### 더보기 버튼에서 무한스크롤
더 많은 데이터를 보기 위해 더보기 버튼을 눌렀던 방식에서 스크롤을 하단으로 이동하였을 때, 자동으로 데이터가 추가되도록 무한 스크롤을 구현하였습니다. 더 나은 사용자 경험을 위해 더보기 버튼을 누르는 액션 단계를 줄일 수 있었습니다.   

<br/>

## 기술 선택
#### Next JS를 선택한 이유
* 최근 프론트엔드 개발자를 준비한다면, 학습할 필요가 있다고 느꼈기 때문에 학습 목적으로 선택했습니다.
* React에서 설치해야 사용가능한 기능들을 바로 사용할 수 있어서 선택하였습니다.
* CSR, SSR, SSG, ISR 등 클라이언트 사이드 렌더링 또는 서버 사이드 렌더링 중 프로젝트에 맞게 선택하여 코드 구현이 가능하기 때문에 선택하였습니다.

#### CSR을 사용한 이유
* Recoil 라이브러리를 사용할 때, 주로 클라이언트 측에서 상태를 관리하기 때문에 CSR을 선택하였습니다.
* 특별하게 SEO(검색엔진 최적화)가 필요하지 않는 서비스라고 생각하였기 때문입니다.
    * 뉴스 모음 사이트이기 때문에 API 호출로 가져온 데이터를 검색엔진을 통해 사이트에 접속하는 것을 의도하지 않습니다.

#### Recoil을 사용한 이유
* 뉴스 데이터 갯수를 뉴스 컴포넌트에서 공통적으로 사용해야 했습니다.
* 해당 변수를 모든 컴포넌트에 직접 전달하는 것으로 구현하기에는 코드가 복잡해졌습니다.
* 위의 문제를 해결하기 위해 상태 관리 라이브러리를 찾아보았고, Redux보다 편리하게 사용할 수 있다고 판단하여 Recoil을 사용하였습니다.
    * Redux보다 편리하게 사용할 수 있다고 판단한 이유는 Store, Dispatch, Reduce, Action을 모두 구현할 필요가 없었기 때문입니다.
* 현재, Recoil을 사용하고 있지 않습니다.

#### Naver Search API와 News API를 선택한 이유
* "오늘의 주요 뉴스"와 같은 특정 데이터를 가져오고 싶었지만, 다른 API를 찾지 못했고, 네이버 검색 API를 활용해 "오늘의 주요 뉴스" 쿼리를 전달하여 해당 데이터를 가져오는 것을 선택하였습니다.
* 다음, 네이버에서 크롤링하여 각 카테고리별 뉴스들을 가져오려고 시도하였으나, 목록을 제대로 가져오지 못하거나 한글이 깨지는 등 여러 문제들이 발생하여 무료 News API를 사용하였습니다.
* 그러나, 무료 API 사용으로 배포 환경에서는 활용하지 못하는 문제가 있습니다.

#### useQuery → RTK Query
* useQuery와 RTK Query 비교 후, RTK Query의 더 많은 장점을 보고 변경하였습니다.
    * 자동 캐시 적용
    * 타입스크립트 적용
    * 코드 수 개선
* Provider, Store를 설정하고, "createApi"로 호출해 데이터를 가져와서 활용하였습니다.
* RTK Query에서 제공하는 "error"를 활용해 toast, console 등으로 에러 처리를 하였습니다.

## 개발 과정 중 겪은 문제
* Vercel 배포 시, 배포가 되지 않는 에러 상황
    * [Vercel 배포 에러 회고](https://hseongchan2.tistory.com/89)   
* 같은 단어로 중복 검색을 방지했던 개선 경험
    * [같은 단어 중복 검색 방지](https://hseongchan2.tistory.com/148)   

## 이 프로젝트를 개발한 이유
오늘 봐야할 주요 뉴스들을 빠르게 확인하거나, 다양한 카테고리 별로 주요한 뉴스들을 빠르게 보고 싶어 이 프로젝트를 개발하였습니다.   

## 프로젝트 주요 타겟
* 출퇴근, 통학에 주요 뉴스를 포함한 다양한 뉴스들을 빠르게 읽고 싶은 사람

## 실행
```
npm install
npm run dev
```