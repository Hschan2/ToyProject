# Coronavirus_Map_Cover
코로나 맵 및 알리미 따라 만들기 (카카오 지도 API)

## 프로젝트 기술
* 집 주변 공공기관   
    * HTML, JAVASCRIPT, CSS, KAKAO MAP API
    * 검색한 위치로 자동 이동
    * 현재 위치로 이동 버튼 (Animation 포함)
    * 표시할 장소 배열에 오브젝트 배열로 저장   

### (Object로 현재 주변 주요 기관을 임의로 위도와 경도 값 추가)
1. 지도 생성
2. customOverlay로 해당 위치에 생성, 마우스 오버 및 아웃 시 툴팁 생성, 클릭 시 장소 정보 (Clrcle Overlay 형태, 숫자로 갯수를 표현)
3. Polyline을 customOverlay와 같은 위치로 생성(버튼으로 보이게 / 안 보이게 가능)
4. 내 위치 버튼 생성 및 CustomOverlay(애니메이션 포함)으로 생성 (내 위치 API를 사용)
5. 검색 기능, 검색하면 관련 장소으로 이동 그리고 클릭 시 장소명 볼 수 있음 (카카오 지도 검색 API 사용)
