import { useEffect, useState } from 'react'
import { WeatherData } from '../../constants/interfaces'
import useGeolocation from './GetGeoLocation'

export default function Weather() {
  const { latitude, longitude, error } = useGeolocation()
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&lang=kr&units=metric`,
        )
        if (!response.ok) {
          throw new Error('위도와 경도가 부정확합니다.')
        }
        const data = await response.json()
        setWeatherData({
          name: data.name,
          description: data.weather[0].description,
          temp: data.main.temp,
        })
      } catch (error) {
        console.log(error)
      }
    }

    if (latitude && longitude) {
      fetchWeatherData()
    }
  }, [latitude, longitude])

  if (error) {
    return <div>{error}</div>
  }
  if (!latitude || !longitude) {
    return <div>Loading...</div>
  }
  if (!weatherData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        {weatherData.name} {Math.floor(weatherData.temp)}˚{' '}
        {weatherData.description}
      </div>
    </>
  )
}
