import React, { useState, useEffect } from 'react'
import {
  LoadingContainer,
  LoadingLottie,
  LoadingMessage,
} from '../../styles/LoadingStyle'
import loading from '../../public/lottie/loading.json'

export default function Loading() {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    setAnimationData(loading)
  }, [])

  if (!animationData) {
    return <div>LottieFile Error</div>
  }

  return (
    <LoadingContainer>
      <LoadingLottie loop animationData={animationData} play />
      <LoadingMessage>Loading Error...</LoadingMessage>
    </LoadingContainer>
  )
}
