# 소셜미디어 게시판
소셜미디어로 로그인을 하여 회원이 되면 이야기 게시판을 즐길 수 있습니다.

## 프로젝트 기술
* React 페이지 (React, Node.js, Mysql, Bootstrap)   
    * Bootstrap 반응형 제거
        * min-width으로 폭 고정
    * Let's Encrypt를 이용하여 HTTPS 적용중
        * Greenlock-express 사용 안함
    * 로그인
        * 회원가입
            * 비밀번호 암호화 - bcrypt
        * 로그인
            * Token - jsonwebtoken
        * 회원수정
            * 일반 회원 - 이름, 비밀번호, 이메일 수정
            * oAuth - 이름, 비밀번호 수정
        * 회원탈퇴
            * 일반 회원 - 비밀번호 입력으로 탈퇴
            * oAuth - 비밀번호 입력 X
        * 소셜 미디어 로그인
            * 카카오
            * 네이버
            * 페이스북
            * 구글
            * 데이터 베이스 연동
        * oAuth 로그인 버튼 두 번 눌러야 로그인되는 문
            * serializeUser Error   

    * 게시판
        * 글 리스트
            * 글 읽기 페이지에서 뒤로가기로 들어왔을 경우, 새로 고침
            * 글 페이징 추가 예정
            * 글 검색 Cannot POST 에러
        * 글 작성
            * Textarea에서 기본 값 영어 문제
        * 글 읽기
            * 글 읽기 페이지에서 새로 고침해도 조회수는 한 번 증가
            * 작성자만 수정, 삭제 버튼 보기
            * 댓글 작성
            * 댓글 불러오기
            * 댓글 삭제 개발 중
        * 글 수정
            * Datestamp 값은 글 수정 날짜로 변경
        * 글 삭제
            * Confirm으로 삭제 확인
            * 글 삭제 후, Alert으로 삭제 확인
            * 데이터 베이스에서 완전 삭제로 작성
        * 글 검색
            * Cannot POST 에러   