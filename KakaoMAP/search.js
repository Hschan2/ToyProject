const ps = new kakao.maps.services.Places();
const infoWindow = new kakao.maps.infoWindow({ zIndex: 1 });

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {
    const keyword = document.getElementById('searchbox').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    } else {
        ps.keywordSearch(keyword, placesSearchCB);
        myoverlay.setMap(null);
        current.style.color = 'black';
    }
}

function Enter_Check() {
    const keyword = document.getElementById('searchbox').value;
    // 엔터키의 코드는 13입니다.
    if (event.keyCode == 13) {
        if (!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        } else {
            ps.keywordSearch(keyword, placesSearchCB);
            myoverlay.setMap(null);
            current.style.color = 'black';
        }
    }
}

function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        displayMarker(data[0]);
        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
        map.setLevel(5);
    }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {

    // 마커를 생성하고 지도에 표시합니다
    const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
        if (infoWindow.getMap()) {
            infoWindow.close();
        } else {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infoWindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infoWindow.open(map, marker);
        }
    });
}