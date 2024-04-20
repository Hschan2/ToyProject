import { useEffect, useState } from 'react'
import { ILocation, IWeather } from '../../utils/types/type'
import useGeolocation from '../../utils/Geolocation'

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

        if (!response.ok) throw new Error('위도와 경도가 부정확합니다.')

        const { name, weather, main } = await response.json()
        setWeatherData({
          name: name,
          description: weather[0].description,
          temp: main.temp,
        })
        setLoading(true)
      } catch (err) {
        console.error(`날씨를 가져오지 못했습니다. : ${err}`)
        throw new Error(`날씨 정보 가져오기 실패: ${err}`)
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
    return <p>날씨 가져오는 중...</p>
  }

  if (!weatherData) {
    return <p>날씨 정보가 없습니다.</p>
  }

  return (
    <div>
      {weatherData.name} {Math.floor(weatherData.temp)}˚{' '}
      {weatherData.description}
    </div>
  )
}
