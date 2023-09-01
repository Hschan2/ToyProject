import { useEffect, useState } from 'react'
import { LocationType, WeatherData } from '../../../interfaces/Interfaces'
import useGeolocation from '../../../constants/GetGeoLocation'

export default function Weather() {
  const { latitude, longitude, error }: LocationType = useGeolocation()
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    const abortController = new AbortController()

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&lang=kr&units=metric`,
          { signal: abortController.signal },
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
      } catch (err) {
        console.log(err)
      }
    }

    if (latitude && longitude) {
      fetchWeatherData()
    }

    return () => {
      abortController.abort()
    }
  }, [latitude, longitude])

  if (error) {
    return <div>{error}</div>
  }
  if (!latitude || !longitude || !weatherData) {
    return null
  }

  return (
    <div>
      {weatherData.name} {Math.floor(weatherData.temp)}˚{' '}
      {weatherData.description}
    </div>
  )
}
