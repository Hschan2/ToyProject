var current = new kakao.maps.LatLng(37.540551, 126.999999);
var myhome = new kakao.maps.LatLng(37.540675, 126.673899);

var mapContainer = document.getElementById('map'), // 지도의 중심좌표
    mapOption = { 
        center: myhome, // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    }; 

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var homeadress = [
    {
        position: '극동늘푸른아파트',
        latlng: new kakao.maps.LatLng(37.540618, 126.673938),
        desc: '우리집 위치',
    },
    {
        position: '서구보건소',
        latlng: new kakao.maps.LatLng(37.544433, 126.673924),
        desc: '보건소 위치',
    },
    {
        position: '인천서부소방서',
        latlng: new kakao.maps.LatLng(37.543315, 126.677248),
        desc: '소방서 위치',
    },
    {
        position: '인천서부경찰서',
        latlng: new kakao.maps.LatLng(37.544421, 126.678279),
        desc: '경찰서 위치',
    },
    {
        position: '국제성모병원',
        latlng: new kakao.maps.LatLng(37.542291, 126.683620),
        desc: '병원 위치',
    },
];

var choiceMarkers = [];
var choiceOverlays = [];
var choiceTooltips = [];
var choicePolylines = [];

createChoiceMarkers();
setChoiceOverlays(null);
setChoiceTooltips(null);
setChoicePolylines(map, choicePolylines);

function createMarker(position) {
    var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(34, 39), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(14, 36)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

    var marker = new kakao.maps.Marker({
        position: position,
        image : markerImage,
    });
    return marker;
}

function createChoiceMarkers() {
    for (var i = 0; i < homeadress.length; i++) {
        var marker = createMarker(homeadress[i].latlng);
        //var marker = createCircle(homeadress[i].latlng);

        var circle = '<div class ="circle-main"><div class="circle">'+ (i+1) +'</div></div>';

        var customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            position: homeadress[i].latlng,
            content: circle,
            clickable: true,
        });

        var content = '<div class="wrap">' + 
                '<div class="info">' + 
                    '<div class="title">' + 
                        homeadress[i].position + 
                        '<div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
                    '</div>' + 
                    '<div class="body">' +  
                        '<div class="desc">' + 
                            '<div class="ellipsis">' + homeadress[i].desc + '</div>' +   
                        '</div>' + 
                    '</div>' + 
                '</div>' +    
            '</div>';

        var overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: marker.getPosition(),
        });

        kakao.maps.event.addListener(marker, 'click', makeClickListener(map, overlay));
        
        var tooltip = '<div class="tooltip">' + homeadress[i].desc + '</div>';

        var tooltipoverlay = new kakao.maps.CustomOverlay({
            content: tooltip,
            map: map,
            position: marker.getPosition(),
        });

        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, tooltipoverlay));
        kakao.maps.event.addListener(marker, 'mouseout', makeOverListener(null, tooltipoverlay));
        
        var circleDiv = document.getElementsByClassName("circle-main");

        $(circleDiv[i]).on('mouseover', makeOverListener(map, tooltipoverlay));
        $(circleDiv[i]).on('mouseout', makeOverListener(null, tooltipoverlay));

        $(circleDiv[i]).on('click', makeClickListener(map, overlay));

        choiceMarkers.push(marker);
        choiceOverlays.push(overlay);
        choiceTooltips.push(tooltipoverlay);
        choicePolylines.push(homeadress[i].latlng);
    }
}

function setChoiceMarkers(map) {
    for(var i = 0; i < choiceMarkers.length; i++) {
        choiceMarkers[i].setMap(map);
    }
}

function setChoiceOverlays(map) {
    for(var i = 0; i < choiceOverlays.length; i++) {
        choiceOverlays[i].setMap(map);
    }
}

function setChoiceTooltips(map) {
    for(var i = 0; i < choiceTooltips.length; i++) {
        choiceTooltips[i].setMap(map);
    }
}

function setChoicePolylines(map, linePath) {
    var polylinebtn = document.getElementById('lineclick');

    var polyline = new kakao.maps.Polyline({
    path: linePath, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 2, // 선의 두께 입니다
    strokeColor: '#4286f4', // 선의 색깔입니다
    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid' // 선의 스타일입니다
});
    // 지도에 선을 표시합니다 
    polyline.setMap(map);

    polylinebtn.addEventListener('click', function() {
        if(polyline.getMap()) {
            polyline.setMap(null);
            polylinebtn.style.color = 'black';
        } else {
            polyline.setMap(map);
            polylinebtn.style.color = '#4374D9';
        }
    });
}

function makeClickListener(map, overlay) {
    return function() {
        if (overlay.getMap()) {
            overlay.setMap(null);
        } else {
            overlay.setMap(map);
        }
    };
}

function makeOverListener(map, overlay) {
    return function() {
        overlay.setMap(map);
    };
}

function closeOverlay() {
    setChoiceOverlays(null);     
}