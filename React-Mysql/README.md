# 소셜 게시판

<p align="center">
    <img 
    src="https://github.com/Hschan2/ToyProject/blob/master/React-Mysql/Image/banner.png?raw=true"
    width="300"/>
</p>

### **소셜 게시판** - 소셜 회원 전문 게시판

<br/>

소셜 게시판은 소셜 로그인 회원을 기준으로 운영되는 게시판 서비스입니다.   

네이버, 페이스북, 카카오톡, 구글 로그인이 가능하며, 사용자 이름은 자동으로 소셜 로그인 서비스 명을 포함하게 됩니다.   

<br/>

## 현재 상황
* 배포 예정
* MySQL 서비스의 업데이트로 기존 데이터 베이스 자동 삭제
    * MySQL 데이터 베이스 재생성 예정

## 소셜 게시판 개발자

### 웹 개발
| [홍성찬](https://github.com/Hschan2) |.
| :---: |
| ![](https://avatars.githubusercontent.com/u/39434913?v=4) |
| 회원가입 및 로그인 구현 <br/> 소셜미디어 회원가입 및 로그인 구현 <br/> 게시판 CRUD 구현 <br/> 데이터 베이스 구성 <br/> 회원 정보 암호화 적용 <br/> 전체 디자인 |

<br/>
<br/>

## 기술 스택

#### 프레임워크 & 라이브러리
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![HBS](https://img.shields.io/badge/HBS-%23E34F26.svg?style=for-the-badge&logo=HBS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

#### 소셜 for oAuth
![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=Facebook&logoColor=white)
![KakaoTalk](https://img.shields.io/badge/kakaotalk-ffcd00.svg?style=for-the-badge&logo=kakaotalk&logoColor=000000)
![Naver](https://img.shields.io/badge/Naver-00C300?style=for-the-badge&logo=naver&logoColor=white)
![Google](https://img.shields.io/badge/Google-D14836?style=for-the-badge&logo=google&logoColor=white)

#### 데이터 베이스
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)

#### 개발 도구
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

<br/>
<br/>

## 파일 구조
```
src
├─ cert
├─ controllers
├─ model
│
├─ Image
├─ public
│
├─ routes
├─ views
│
└─ App.js
```

<br/>
<br/>

## 페이지 및 주요 기능
|페이지|이미지|구현 목록|
|:---:|:---:|:---:|
|메인|<img src="https://github.com/Hschan2/ToyProject/blob/master/React-Mysql/Image/main.png?raw=true" width="100" />|설명이 포함된 카드형 소개란|
|회원가입|<img src="https://github.com/Hschan2/ToyProject/blob/master/React-Mysql/Image/signup.PNG?raw=true" width="100" />|일반 회원가입 구현|
|로그인|<img src="https://github.com/Hschan2/ToyProject/blob/master/React-Mysql/Image/signin.PNG?raw=true" width="100" />|일반 로그인 구현 <br/> 소셜 로그인 구현(페이스북, 구글, 네이버, 카카오 oAuth) <br/> 소셜 회원의 데이터가 없을 시 소셜 회원으로 자동 회원가입|
|게시판|<img src="https://github.com/Hschan2/ToyProject/blob/master/React-Mysql/Image/board.png?raw=true" width="100" />|제목, 작성자, 조회수가 포함된 게시판 CRUD 구현 <br/> 글 검색 구현 <br/> 댓글 기능 구현|

<br/>

## 기능 구현 목록
* 서비스
    * Let's Encrypt를 이용하여 HTTPS 적용
* 회원 서비스
    * 회원 가입
        * ```bcrypt```로 비밀번호 암호화
        * MySQL의 회원 데이터 베이스에 저장
    * 로그인
        * ```JsonWebToken(JWT)```으로 회원 정보 토큰 형식으로 저장
    * 회원 수정
        * 일반 회원 -> 이름, 비밀번호, 이메일 수정
        * 소셜 회원 -> 이름, 비밀번호 수정
    * 회원 탈퇴
        * 일반 회원 -> 비밀번호 입력으로 탈퇴
        * 소셜 회원 -> 탈퇴 재확인 후 삭제
* 게시판
    * 목록
        * 뒤로가기로 목록 페이지 도달 시, 자동 새로고침
    * 읽기
        * 새로고침을 해도 조회수 1회 증가 (Boolean 타입의 refreshCheck 변수로 관리 => false일 때, 조회수 증가)
            * 읽기 페이지에 도달 시, ```refreshCheck = true```
            * 목록 페이지에 도달 시, ```refreshCheck = false```
        * 댓글 작성 및 댓글 목록 구현
    * 수정
        * 수정 날짜&시간으로 날짜&시간 데이터 값 변경 (DateStamp)
    * 삭제
        * ```Confirm```으로 삭제 확인함으로써 사용자 클릭 실수로 인한 잘못된 삭제 문제 방지
        * 삭제 후, ```Alert```으로 삭제 재확인
        * 데이터 베이스에서 ```True/False```에서 완전 삭제로 변경 (DELETE)
* 디자인
    * 부트스트랩에서 자동으로 설정된 반응형에서 ```min-width```로 폭 고정된 레이아웃

## 프로젝트 문제 목록
* 초기 첫 방문 시, 소셜 로그인 버튼을 클릭할 때 두 번 클릭해야 하는 문제
    * serializeUser Error
    * 공식 문서, 외부 블로그를 이용했지만, 해결하지 못함
* 글 검색 시, 빈번한 횟수로 ```Cannot POST``` 에러 발생

## 이 프로젝트를 개발한 이유
소셜 서비스를 이용한 oAuth 서비스를 개발하고 싶었고, 가장 간단하고 기본적인 게시판과 결합하여 이 프로젝트를 개발하였습니다.   

가장 기본적인 카카오톡, 네이버, 구글, 페이스북을 이용하여 소셜 회원의 회원가입과 로그인을 구현하는 방법을 배울 수 있었고, MySQL의 데이터 베이스를 많은 시간동안 다루면서 데이터 베이스 구현 및 동작을 학습할 수 있었던 프로젝트였습니다.   

## 아쉬운 점
* MySQL의 업데이트로 인한 기존 데이터 베이스 자동 삭제되고 복원을 못한 점
* 페이스북 소셜 로그인 지원 문제로 인한 사용 에러가 발생하는 점
* 댓글 삭제 등 여러 기능들의 목록들을 아직 제대로 구현하지 못한 점
* 부족한 디자인