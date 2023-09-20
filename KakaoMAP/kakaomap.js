const current = new kakao.maps.LatLng(37.540551, 126.999999);
const myHome = new kakao.maps.LatLng(37.540675, 126.673899);

const mapContainer = document.getElementById('map'), // 지도의 중심좌표
    mapOption = {
        center: myHome, // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };

const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

const homeAddress = [
    {
        position: '극동늘푸른아파트',
        latlng: new kakao.maps.LatLng(37.540618, 126.673938),
        name: '연희 극동늘푸른아파트',
        call: '032-567-0697',
        form: '주거지',
    },
    {
        position: '서구보건소',
        latlng: new kakao.maps.LatLng(37.544433, 126.673924),
        name: '서구보건소',
        call: '032-718-0400',
        form: '의료기관',
    },
    {
        position: '인천서부소방서',
        latlng: new kakao.maps.LatLng(37.543315, 126.677248),
        name: '인천서부소방서',
        call: '032-723-5420',
        form: '공안기관',
    },
    {
        position: '인천서부경찰서',
        latlng: new kakao.maps.LatLng(37.544421, 126.678279),
        name: '인천서부경찰서',
        call: '182',
        form: '공안기관',
    },
    {
        position: '국제성모병원',
        latlng: new kakao.maps.LatLng(37.542291, 126.683620),
        name: '가톨릭관동대학교 국제성모병원',
        call: '1600-8291',
        form: '종합병원',
    },
];

const choiceMarkers = [];
const choiceOverlays = [];
const choiceTooltips = [];
const choicePolylines = [];

createChoiceMarkers();
setChoiceOverlays(null);
setChoiceTooltips(null);
setChoicePolylines(map, choicePolylines);

function createMarker(position) {
    const imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(34, 39), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(14, 36) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

    const marker = new kakao.maps.Marker({
        position: position,
        image: markerImage,
    });
    return marker;
}

function createChoiceMarkers() {
    for (const i = 0; i < homeAddress.length; i++) {
        const marker = createMarker(homeAddress[i].latlng);
        //const marker = createCircle(homeAddress[i].latlng);

        const circle = '<div class ="circle-main"><div class="circle">' + (i + 1) + '</div></div>';

        const customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            position: homeAddress[i].latlng,
            content: circle,
            clickable: true,
        });

        const content = '<div class="wrap">' +
            '<div class="info">' +
            '<div class="title">' +
            homeAddress[i].position +
            '<div class="close" onclick="closeOverlay()" title="닫기"></div>' +
            '</div>' +
            '<div class="body">' +
            '<div class="desc">' +
            '<div class="name">' + homeAddress[i].name + '</div>' +
            '<div class="call">' + homeAddress[i].call + '</div>' +
            '<div class="form">' + homeAddress[i].form + '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        const overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: marker.getPosition(),
        });

        kakao.maps.event.addListener(marker, 'click', makeClickListener(map, overlay));

        const tooltip = '<div class="tooltip">' + homeAddress[i].desc + '</div>';

        const tooltipoverlay = new kakao.maps.CustomOverlay({
            content: tooltip,
            map: map,
            position: marker.getPosition(),
        });

        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, tooltipoverlay));
        kakao.maps.event.addListener(marker, 'mouseout', makeOverListener(null, tooltipoverlay));

        const circleDiv = document.getElementsByClassName("circle-main");

        $(circleDiv[i]).on('mouseover', makeOverListener(map, tooltipoverlay));
        $(circleDiv[i]).on('mouseout', makeOverListener(null, tooltipoverlay));

        $(circleDiv[i]).on('click', makeClickListener(map, overlay));

        choiceMarkers.push(marker);
        choiceOverlays.push(overlay);
        choiceTooltips.push(tooltipoverlay);
        choicePolylines.push(homeAddress[i].latlng);
    }
}

function setChoiceMarkers(map) {
    for (let i = 0; i < choiceMarkers.length; i++) {
        choiceMarkers[i].setMap(map);
    }
}

function setChoiceOverlays(map) {
    for (let i = 0; i < choiceOverlays.length; i++) {
        choiceOverlays[i].setMap(map);
    }
}

function setChoiceTooltips(map) {
    for (let i = 0; i < choiceTooltips.length; i++) {
        choiceTooltips[i].setMap(map);
    }
}

function setChoicePolylines(map, linePath) {
    const polylinebtn = document.getElementById('lineclick');

    const polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 2, // 선의 두께 입니다
        strokeColor: '#4286f4', // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
    });
    // 지도에 선을 표시합니다 
    polyline.setMap(map);

    polylinebtn.addEventListener('click', function () {
        if (polyline.getMap()) {
            polyline.setMap(null);
            polylinebtn.style.color = 'black';
        } else {
            polyline.setMap(map);
            polylinebtn.style.color = '#4374D9';
        }
    });
}

function makeClickListener(map, overlay) {
    return function () {
        if (overlay.getMap()) {
            overlay.setMap(null);
        } else {
            overlay.setMap(map);
        }
    };
}

function makeOverListener(map, overlay) {
    return function () {
        overlay.setMap(map);
    };
}

function closeOverlay() {
    setChoiceOverlays(null);
}