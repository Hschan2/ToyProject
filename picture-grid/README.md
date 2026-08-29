# 📷 PicGrid (픽그) - 소셜미디어 사진 그리드 생성기

> 인스타그램 피드, 스토리, 릴스용 사진 그리드 및 레이아웃을 원클릭으로 완성하는 웹 기반 이미지 에디터입니다.  
> 모든 이미지 처리가 **100% 브라우저 메모리(Canvas API)** 내에서 이루어져 서버 전송 없이 안전하고 빠릅니다.

---

## ✨ 주요 기능 (Key Features)

- **🎨 다양한 그리드 프리셋 지원**
  - **2장 겹침 (오버레이)**: 감성적인 배경 위에 중앙 강조 사진 배치
  - **4개 그리드 (2x2)**: 인스타그램 피드에 최적화된 4분할 레이아웃
  - **10개 세로 스트립**: 2열 5행 구성의 감성 포토 스트립
  - **3개 가로 그리드**: 세련된 3단 가로 분할 컷
  - **폴라로이드 프레임**: 레트로 감성의 하단 여백 폴라로이드 스타일
  - **블러 배경 모드**: 메인 사진을 돋보이게 하는 감성 블러 백그라운드

- **📐 소셜미디어 최적화 비율 (Aspect Ratio)**
  - `1:1` (정사각형 - 인스타 기본 피드)
  - `4:5` (세로형 - 인스타 피드 추천 규격)
  - `9:16` (스토리 / 릴스 / 쇼츠 규격)
  - `16:9` (가로형 / 유튜브 썸네일 규격)

- **🛠️ 세부 디자인 커스터마이징**
  - **여백 및 간격(Gap)**, **모서리 둥글기(Border Radius)**, **그림자 강도(Shadow)** 슬라이더 조절
  - **배경 스타일**: 단색 컬러 피커, 프리셋 그라디언트, 원본 기반 배경 블러
  - **사진 필터 효과**: 감성 워머(Warm), 쿨 사이버(Cool), 클래식 흑백(B&W), 비비드 팝(Vivid), 파스텔 소프트(Soft)
  - **워터마크/서명 삽입**: 본인 계정(@username)이나 텍스트를 캔버스 우측 하단에 자동 각인
  - **사진 셔플(🎲) 및 초기화(🔄)** 기능 지원

- **🔒 100% 개인정보 보호 & 무료 고화질 다운로드**
  - 외부 서버 업로드 없이 오직 브라우저 내부에서만 렌더링
  - 고해상도(1080p+) PNG 파일 원클릭 무손실 다운로드

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: [Astro](https://astro.build/) (v4.15.0)
- **Language**: TypeScript / JavaScript, HTML5, CSS3
- **Graphics Engine**: HTML5 Canvas API
- **Package Manager**: npm

---

## 📁 프로젝트 구조 (Project Structure)

```text
picture-grid/
├── public/                # 파비콘 및 정적 자산 (샘플 이미지 등)
│   ├── favicon.ico
│   └── samples/
├── src/
│   ├── layouts/
│   │   └── Layout.astro   # 기본 HTML 레이아웃 및 메타데이터
│   ├── pages/
│   │   └── index.astro    # 메인 에디터 UI 및 Canvas 렌더링 로직
│   └── styles/
│       └── global.css     # 전역 CSS 변수 및 스타일링
├── astro.config.mjs       # Astro 설정 파일
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 시작하기 (Getting Started)

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:4321` (또는 터미널에 표시되는 로컬 URL)로 접속합니다.

### 3. 프로덕션 빌드 및 미리보기
```bash
# 정적 빌드 생성
npm run build

# 빌드 결과물 로컬 미리보기
npm run preview
```

---

## 📄 라이선스 (License)

This project is open-source and free to use.
