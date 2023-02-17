import { useEffect, useState } from "react";

export default function GetGeoLocation() {
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);

    useEffect(() => {
        const { geolocation } = navigator;
        geolocation.getCurrentPosition(
            position => {
                setLat(position.coords.latitude);
                setLat(position.coords.longitude);
            },
            error => {
                console.log('위치를 가져올 수 없습니다.', error);
                setLat(37);
                setLon(127);
            },
            {
                enableHighAccuracy: false,
                maximumAge: 0,
                timeout: Infinity,
            })
    }, []);

    return [lat, lon];
}