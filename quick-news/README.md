# Quick News

![banner](https://github.com/Hschan2/ToyProject/blob/master/quick-news/public/title_image.PNG?raw=true)

<br/>

### **퀵뉴스** - 빠르게 볼 수 있는 주제별 주요 뉴스 제공 서비스

<br/>

퀵뉴스는 오늘의 주요 뉴스와 각 주제별 뉴스들을 빠르게 볼 수 있도록 도와줍니다. 각 총 60개의 뉴스들을 볼 수 있고, 20개 씩 무한스크롤이 구현됩니다. 또한, 뉴스를 검색할 수 있고, 저장/삭제가 가능합니다.

##### 기본

<img src="./public/gif/main.gif" width="500" />
   
##### 뉴스 카테고리 & 다크모드

<img src="https://blog.kakaocdn.net/dn/b4sp0n/btsGq99zZIj/LyyLl08bjRnPNrJ0xLGkuk/img.gif" width="500" />
   
##### 뉴스 검색

<img src="./public/gif/search.gif" width="500" />
   
##### 뉴스 저장/삭제

<img src="https://blog.kakaocdn.net/dn/dSqOG0/btsGsh0o90v/tLvXkvfkk6Qariax2RXbzK/img.gif" width="500" />

<br/>

## 체험

[Quick-News](https://quick-news-tau.vercel.app/)

- 무료 API 사용으로 배포 시 데이터 확인이 불가능합니다.

<br/>

## 퀵뉴스 개발자

### 프론트엔드

|                           [홍성찬](https://github.com/Hschan2)                            |
| :---------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/39434913?v=4" width="100" height="100"> |
|                            퀵뉴스 전체 개발 <br/> 전체 디자인                             |

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

- #4D7653

<br/>
<br/>

## 페이지 및 주요 기능

#### 공통

- 상단 이동 버튼 구현
- 오늘 날짜 출력(Date)
- 내 위치 기반 현재 날씨 출력(openWeatherMap API)
- 페이지 상단에 스크롤 위치 출력

#### 메인 페이지

- 네이버 뉴스 검색 API에서 가져온 데이터로 "오늘의 주요 뉴스" 목록 출력
- 오늘의 주요 뉴스 중 AI가 추천하는 오늘의 뉴스

#### 각 주제별 뉴스 페이지

- ~~News API~~ WorldWire RSS에서 가져온 데이터로 각 주제별 뉴스 목록 출력
- 뉴스 데이터 갯수 10~40개 설정 버튼 구현

#### 최적화

- 프로젝트 성능 향상을 위해 최적화를 진행하고 있습니다.
- 1차 성능 최적화
  - IntersectionObserver을 이용한 Custom Hook 만들어 처음부터 페이지에 모든 데이터가 출력되지 않고, 스크롤 할 때마다 로드되도록 수정하였습니다.
  - React-Query를 사용하여 API 데이터를 가져오고 사용할 때, 캐시 기능을 사용하였습니다. 또한, 불필요한 리렌더링을 방지하도록 수정하였습니다.
  - 결과적으로, 속도를 약 325m/s에서 약 220m/s으로 감소시켰습니다.
  - 최적화 전
    ![Before](http://naver.me/xQ86jpjD)
  - 최적화 후
    ![After](http://naver.me/5uiAmNcN)
- 2차 성능 최적화
  - 더보기 기능을 위한 무한 스크롤 시, 불필요한 리렌더링 방지를 위해 useMemo, useCallback 기능을 활용하였습니다.
  - 스타일 컴포넌트를 사용 시, 로드 전에 불러오는 방식으로 Dynamic을 활용해 페이지 초기 접근 또는 새로고침할 때 스타일이 적용되지 않은 문제를 해결했습니다.
- 3차 성능 최적화
  - NextJS의 `<Image>`를 사용해 로딩페이지 및 404 에러페이지의 이미지 최적화를 진행하였습니다.
  - "useRef.current"로 값을 참조하고 조건문으로 비교하여 같은 단어가 중복 검색됨으로써 불필요한 서버 요청을 하지 않도록 이를 방지하였습니다.
- 4차 성능 최적화
  - 중복 사용되는 스타일 코드를 통일시켜 하나의 스타일 코드를 사용해 `Props`에 따라 다르게 출력
  - `BFCache` 문제를 개선시킬 수 있도록 페이지 전환이 완료된 후 이전 스크롤 위치를 복원하는 `useScrollRestoration` 훅 생성하여 적용
  - PNG, JPG 이미지 파일을 WEBP 파일로 압축하여 사용

#### 뉴스 검색 기능

뉴스 검색 버튼을 하단 오른쪽에 생성하여, 버튼 클릭 시 입력할 수 있는 박스가 애니메이션으로 나타나도록 하였습니다. 그리고 입력한 값으로 뉴스가 검색되며, 해당 내용의 뉴스들이 나타납니다.

![뉴스 검색](http://naver.me/5ZjY2TVe)

Recoil로 검색 값을 저장해 활용하는 방식에서 NextJS의 Navigation을 이용해 Param으로 값을 넘기는 방식으로 수정하였습니다.

같은 단어로 중복 검색 시, 불필요한 서버 요청을 방지하기 위해 중복 검색을 방지하였습니다.

#### 반응형 만들기

브라우저 크기에 따라 전체적인 크기가 변경되도록 하였습니다. 1차 수정이 이루어졌으며, 더 깔끔하고 자연스러운 반응형으로 개발할 계획입니다.

![반응형](http://naver.me/G1sU69f9)

```
Example

const media = {
  tablet: (styles: TemplateStringsArray, ...interpolations: any[]) => css`
    @media screen and (max-width: 768px) {
      ${css(styles, ...interpolations)}
    }
  `,
  mobile: (styles: TemplateStringsArray, ...interpolations: any[]) => css`
    @media screen and (max-width: 480px) {
      ${css(styles, ...interpolations)}
    }
  `,
}

export const Style = styled.div`
  // Web ver.

  ${media.tablet`
    // Tablet ver.
  `}

  ${media.mobile`
    Mobile ver.
  `}
`
```

2차 수정으로 태블릿, 모바일 버전을 고려하여 폰트 크기, 버튼 크기와 위치를 조절하였습니다.

#### 더보기 버튼에서 무한스크롤

더 많은 데이터를 보기 위해 더보기 버튼을 눌렀던 방식에서 스크롤을 하단으로 이동하였을 때, 자동으로 데이터가 추가되도록 무한 스크롤을 구현하였습니다. 더 나은 사용자 경험을 위해 더보기 버튼을 누르는 액션 단계를 줄일 수 있었습니다.

#### 뉴스 저장

보관하고 싶은 뉴스를 저장할 수 있습니다. 제목 옆에 '저장' 버튼을 클릭하면 뉴스가 저장되고, 오른쪽 하단 뉴스 아이콘 버튼을 클릭하면 저장된 뉴스들을 확인할 수 있습니다.   

또한, 저장된 뉴스들을 확인할 수 있는 페이지에서 저장된 뉴스를 삭제할 수 있습니다.   

뉴스 저장은 'localStorage'에 저장되며, 가장 간단한 방법이기 때문에 데이터 베이스 없이 사용자의 브라우저를 이용할 수 있다는 장점으로 선택하였습니다.

<br/>

## 기술 선택

#### Next JS를 선택한 이유

- 최근 프론트엔드 개발자를 준비한다면, 학습할 필요가 있다고 느꼈기 때문에 학습 목적으로 선택했습니다.
- React에서 설치해야 사용가능한 기능들을 바로 사용할 수 있어서 선택하였습니다.
- CSR, SSR, SSG, ISR 등 클라이언트 사이드 렌더링 또는 서버 사이드 렌더링 중 프로젝트에 맞게 선택하여 코드 구현이 가능하기 때문에 선택하였습니다.

#### CSR을 사용한 이유

- Recoil 라이브러리를 사용할 때, 주로 클라이언트 측에서 상태를 관리하기 때문에 CSR을 선택하였습니다.
- 특별하게 SEO(검색엔진 최적화)가 필요하지 않는 서비스라고 생각하였기 때문입니다.
  - 뉴스 모음 사이트이기 때문에 API 호출로 가져온 데이터를 검색엔진을 통해 사이트에 접속하는 것을 의도하지 않습니다.

##### 초기 페이지 데이터, ~~SSR~~ SSG 방식으로 수정한 이유

기존 데이터들은 모두 `CSR 방식`으로 가져왔습니다. 그러나, 사용자가 처음으로 접하게 되는 초기 페이지의 경우, 빠르게 로드되는 것이 중요했습니다.   

~~(Lighthouse의 Performance 요구사항) 그래서 초기 데이터의 경우 `SSR 방식`으로 데이터를 가져오도록 수정하여 초기 렌더링이 전보다 더 빠르게 이루어지도록 수정하였습니다. (SSR 방식의 경우, 초기 렌더링은 빠르지만 그 이후의 렌더링은 시간이 더 필요하다는 단점이 있습니다)~~

`SSR 방식`에서 `SSG 방식`으로 변경하여 정해진 Validation에만 렌더링이 되도록 수정하였습니다. `SSR 방식`을 사용하면서 데이터를 실시간으로 가져올 수 있지만, 불필요한 렌더링이 발생하는 것을 방지하기 동시에 1시간 마다 데이터를 가져오는 것으로 캐시 기능을 적용하여 데이터 호출 방식을 변경함으로써 `SSG 방식`으로 수정하였습니다. 이를 통해, '오늘의 주요 뉴스' 데이터와 'AI 추천 뉴스' 데이터를 1시간 마다 갱신하면서 매번 API 호출되는 것을 방지하여 과금과 비효율적인 호출 및 렌더링 속도를 개선하였습니다.


#### Recoil을 사용한 이유

- 뉴스 데이터 갯수를 뉴스 컴포넌트에서 공통적으로 사용해야 했습니다.
- 해당 변수를 모든 컴포넌트에 직접 전달하는 것으로 구현하기에는 코드가 복잡해졌습니다.
- 위의 문제를 해결하기 위해 상태 관리 라이브러리를 찾아보았고, Redux보다 편리하게 사용할 수 있다고 판단하여 Recoil을 사용하였습니다.
  - Redux보다 편리하게 사용할 수 있다고 판단한 이유는 Store, Dispatch, Reduce, Action을 모두 구현할 필요가 없었기 때문입니다.
- 현재, Recoil을 사용하고 있지 않습니다.

#### Naver Search API와 ~~News API~~ WorldWire RSS를 선택한 이유

- "오늘의 주요 뉴스"와 같은 특정 데이터를 가져오고 싶었지만, 다른 API를 찾지 못했고, 네이버 검색 API를 활용해 "오늘의 주요 뉴스" 쿼리를 전달하여 해당 데이터를 가져오는 것을 선택하였습니다.
- ~~다음, 네이버에서 크롤링하여 각 카테고리별 뉴스들을 가져오려고 시도하였으나, 목록을 제대로 가져오지 못하거나 한글이 깨지는 등 여러 문제들이 발생하여 무료 News API를 사용하였습니다.~~
- News API에서 WorldWire RSS로 변경하였습니다. News API의 경우, 미국 뉴스를 중심으로 제공되며, 한국을 포함한 다른 나라의 뉴스 데이터 제공을 보장하지 않는 경우가 많았습니다. 데이터 제공을 하지 않는 경우가 여러 번 발생함에 따라 안정적으로 각 카테고리 별 뉴스 데이터를 가져올 필요성을 느꼈으며, 네이버, 각 언론사 등 RSS를 시도하였으나, 현재 이들의 뉴스 데이터 RSS를 사용할 수 없어 제공하고 있는 월드와이어(WorldWire) RSS를 사용해 각 뉴스 데이터들을 가져오는 것으로 변경하였습니다.
- 그러나, 해당 API 사용은 배포 환경에서는 활용하지 못하는 문제가 있습니다.

#### OpenRouter API의 무료 모델을 활용한 추천 뉴스 구현
목록 내 모든 뉴스들을 보기 힘든 상황에서 단 하나의 뉴스만을 봐야할 때가 발생한다면, AI가 추천해주는 뉴스면 좋을 것 같다는 생각에서 구현하게 되었습니다. OpenRouter API의 무료 모델을 활용해 '오늘 주요 뉴스 중 꼭 봐야 할 하나의 뉴스를 추천'하라는 프롬프트를 통해 모든 주요 뉴스 데이터 중에서 AI가 추천하는 단 하나의 뉴스를 볼 수 있습니다.

#### useQuery → RTK Query

- useQuery와 RTK Query 비교 후, RTK Query의 더 많은 장점을 보고 변경하였습니다.
  - 자동 캐시 적용
  - 타입스크립트 적용
  - 코드 수 개선
- Provider, Store를 설정하고, "createApi"로 호출해 데이터를 가져와서 활용하였습니다.
- RTK Query에서 제공하는 "error"를 활용해 toast, console 등으로 에러 처리를 하였습니다.

#### useScrollRestoration Hook으로 BFCache 개선하기

`BFCache(Back/Forward Cache)` 문제를 해결하기 위해 페이지 이동 시 스크롤 위치를 저장하고 복원하여 브라우저의 히스토리 탐색 중 스크롤 상태를 유지하기 위한 훅인 `useScrollRestoration`을 사용하여 개선 시도를 하였습니다.   

이 훅은, 스크롤 위치를 `sessionStorage`에 현재 위치를 저장하고, 페이지 이동 완료 시, `restoreScrollPos` 함수가 호출되어 해당 URL에 맞는 스크롤 위치를 가져옵니다. 즉, 페이지 전환이 완료된 후 이전 스크롤 위치를 복원시킵니다.   

이를 통해, `BFCache`가 제대로 사용되지 않을 때, 브라우저가 페이지 상태를 캐싱하여, 사용자가 이전 또는 다음 페이지로 돌아갈 때 페이지를 다시 로드하지 않고, 빠르게 이전 상태를 보여주는 데 도움이 될 수 있습니다.   

## 개발 과정 중 겪은 문제

- Vercel 배포 시, 배포가 되지 않는 에러 상황
  - [Vercel 배포 에러 회고](https://hseongchan2.tistory.com/89)
- 같은 단어로 중복 검색을 방지했던 개선 경험
  - [같은 단어 중복 검색 방지](https://hseongchan2.tistory.com/148)
- SSR 방식으로 수정하는 과정에서 실패와 성공
  - [SSR 방식으로 데이터 가져오기 실패](https://hseongchan2.tistory.com/182)
  - [SSR 방식으로 데이터 가져오기 성공](https://hseongchan2.tistory.com/183)

## 이 프로젝트를 개발한 이유

오늘 봐야할 주요 뉴스들을 빠르게 확인하거나, 다양한 카테고리 별로 주요한 뉴스들을 빠르게 보고 싶어 이 프로젝트를 개발하였습니다.

## 프로젝트 주요 타겟

- 출퇴근, 통학에 주요 뉴스를 포함한 다양한 뉴스들을 빠르게 읽고 싶은 사람

## 실행

```
npm install
npm run dev
```
