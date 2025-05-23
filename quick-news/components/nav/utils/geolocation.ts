import { useState } from 'react'
import { ILocation } from '../../../types/type'

export default function useGeolocation(): ILocation {
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
        },
        (err) => {
          setError(err.message)
        },
      )
    } else {
      setError('이 브라우저에서 위치를 가져올 수 없습니다.')
    }
  }

  return { latitude, longitude, error, requestLocation }
}
