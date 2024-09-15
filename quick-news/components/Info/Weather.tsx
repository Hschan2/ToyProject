import { useEffect, useState } from 'react'
import { ILocation, IWeather } from '../../utils/types/type'
import useGeolocation from '../../utils/Geolocation'
import { GetLocationButton } from '../../styles/ButtonStyle'

export default function Weather() {
  const { latitude, longitude, error, requestLocation }: ILocation =
    useGeolocation()
  const [weatherData, setWeatherData] = useState<IWeather | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const getLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (window.confirm('현재 위치를 가져올까요?')) {
      requestLocation()
    }
  }

  useEffect(() => {
    if (!latitude || !longitude) return

    const abortController = new AbortController()
    setLoading(true)
    setFetchError(null)

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&lang=kr&units=metric`,
          { signal: abortController.signal },
        )

        if (!response.ok) return new Error('날씨 데이터 불러오기 실패')

        const { name, weather, main } = await response.json()
        setWeatherData({
          name,
          description: weather[0].description,
          temp: main.temp,
        })
      } catch (err) {
        setFetchError('날씨 정보가 없습니다')
        if (process.env.NODE_ENV !== 'production') {
          console.error(`날씨를 가져오지 못했습니다. : ${err}`)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()

    return () => {
      abortController.abort()
    }
  }, [latitude, longitude])

  if (!latitude || !longitude) {
    return (
      <GetLocationButton onClick={getLocation}>날씨 가져오기</GetLocationButton>
    )
  }

  if (loading) {
    return <span>날씨 정보 불러오는 중</span>
  }

  if (fetchError) {
    return <span>{fetchError}</span>
  }

  if (!weatherData) {
    return <span>날씨 정보가 없습니다.</span>
  }

  if (error) {
    return <span>{error}</span>
  }

  return (
    <>
      {weatherData.name} {Math.floor(weatherData.temp)}˚{' '}
      {weatherData.description}
    </>
  )
}
