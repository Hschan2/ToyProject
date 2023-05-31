import React, { useState, useEffect } from 'react'
import {
  LoadingContainer,
  LoadingLottie,
  LoadingMessage,
} from '../../../styles/styledComponents'

export default function Loading() {
  const lottieFilesSrc =
    'https://assets1.lottiefiles.com/packages/lf20_jv0xz0qi.json'
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch(lottieFilesSrc)
        const jsonData = await response.json()
        setAnimationData(jsonData)
      } catch (error) {
        console.error('Failed to fetch animation data:', error)
      }
    }

    fetchAnimationData()
  }, [])

  if (!animationData) {
    return <div>LottieFile Error</div>
  }

  return (
    <LoadingContainer>
      <LoadingLottie loop animationData={animationData} play />;
      <LoadingMessage>Wait...</LoadingMessage>
    </LoadingContainer>
  )
}
