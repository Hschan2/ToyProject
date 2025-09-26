import { useEffect, useState } from 'react'
import { ILocation, IWeather } from '../../../types/type'
import { GetLocationButton } from '../../../styles/button-style'
import useGeolocation from '../utils/geolocation'
import ConfirmModal from '../../modal/confirm-modal'

interface WeatherApiResponse {
  name: string
  weather: {
    description: string
  }[]
  main: {
    temp: number
  }
}

export default function Weather() {
  const { latitude, longitude, error, requestLocation }: ILocation =
    useGeolocation()
  const [weatherData, setWeatherData] = useState<IWeather | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)

  const getLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setModalOpen(true)
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

        if (!response.ok) {
          setFetchError('날씨 데이터 불러오기 실패')
          return
        }

        const data: WeatherApiResponse = await response.json()
        setWeatherData({
          name: data.name,
          description: data.weather[0].description,
          temp: data.main.temp,
        })
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }
        setFetchError('날씨 정보가 없습니다')
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()

    // eslint-disable-next-line consistent-return
    return () => {
      abortController.abort()
    }
  }, [latitude, longitude])

  if (!latitude || !longitude) {
    return (
      <>
        <GetLocationButton onClick={getLocation}>
          날씨 가져오기
        </GetLocationButton>
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={requestLocation}
          message="현재 위치를 가져올까요?"
        />
      </>
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
