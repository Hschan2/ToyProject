var current = document.getElementById('current');

var content = '<div class="positionwrap">' + 
                '<div class="circle1"></div>' + 
                '<div class="circle2"></div>' +      
            '</div>';

var myoverlay = new kakao.maps.CustomOverlay({
    content: content,
});

current.addEventListener('click', function() {
    if (navigator.geolocation) {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            
            var locPosition = new kakao.maps.LatLng(lat+0.0047, lon+0.03058); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다 

            if(myoverlay.getMap()) {
                myoverlay.setMap(null);
                current.style.color = 'black';
            } else {
                myoverlay.setMap(map);
                myoverlay.setPosition(locPosition);
                map.panTo(locPosition);
                current.style.color = '#4374D9';
            }
        });
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다   
        message = '위치를 찾을 수 없습니다.';
        alert(message);
    }
});