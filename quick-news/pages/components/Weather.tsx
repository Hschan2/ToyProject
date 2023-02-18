import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { locationType, WeatherData } from "../constants/interfaces";
import GetGeoLocation from "./GetGeoLocation";

const API_KEY = "a03004bf971234fd4cb532f6df20b7af";

export default function Weather() {
    const [location, setLocation] = useState<locationType>({
        latitude: null,
        longitude: null,
    });
    const [weatherData, setWeatherData] = useState<WeatherData>({
        name: '',
        description: '',
        icon: '',
        temp: 0,
        humidity: 0,
        wind: 0,
    });
    const [a, b] = GetGeoLocation();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            console.error("이 브라우저에서 위치를 가져올 수 없습니다.");
        }
    }, []);

    useEffect(() => {
        async function fetchWeatherData() {
            try {
                const weatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&lang=kr&units=metric`
                );
                console.log(location.latitude, location.longitude);
                console.log(weatherResponse);
                const data = await weatherResponse.json();
                if (data?.cod === "400") throw data;
                setWeatherData({
                    name: data.name,
                    description: data.weather[0].description,
                    icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                    temp: data.main.temp,
                    humidity: data.main.humidity,
                    wind: data.wind.speed,
                });
            } catch (error) {
              console.error(error);
            }
        }
      
        fetchWeatherData();
    }, []);

    return (
        <>
            <div>{weatherData.name} {Math.floor(weatherData.temp)}˚ {weatherData.description}</div>
        </>
    );
}