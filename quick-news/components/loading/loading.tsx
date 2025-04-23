import React, { useState, useEffect } from 'react'
import {
  LoadingContainer,
  LoadingLottie,
  LoadingMessage,
} from '../../styles/loading/loading-style'
import loading from '../../public/lottie/loading.json'

export default function Loading() {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    setAnimationData(loading)
  }, [])

  return (
    <LoadingContainer>
      {animationData ? (
        <>
          <LoadingLottie loop animationData={animationData} play />
          <LoadingMessage>Loading...</LoadingMessage>
        </>
      ) : (
        <div>No LottieFile</div>
      )}
    </LoadingContainer>
  )
}
