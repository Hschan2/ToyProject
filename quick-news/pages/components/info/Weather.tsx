import { useEffect, useState } from 'react'
import { ILocation, IWeather } from '../../../interfaces/Interfaces'
import useGeolocation from '../../../constants/GetGeoLocation'

export default function Weather() {
  const { latitude, longitude, error }: ILocation = useGeolocation()
  const [weatherData, setWeatherData] = useState<IWeather | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!latitude || !longitude) {
      return undefined
    }

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

        setLoading(true)
      } catch (err) {
        console.log('Error fetching weather data: ', err)
      }
    }

    fetchWeatherData()

    return () => {
      abortController.abort()
    }
  }, [latitude, longitude])

  if (error) {
    return <div>{error}</div>
  }

  if (!loading) {
    return <div>날씨 가져오는 중...</div>
  }

  if (!weatherData) {
    return <div>날씨 정보가 없습니다.</div>
  }

  return (
    <div>
      {weatherData.name} {Math.floor(weatherData.temp)}˚{' '}
      {weatherData.description}
    </div>
  )
}
