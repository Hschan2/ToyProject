import React, { useState, useEffect } from 'react'
import {
  LoadingContainer,
  LoadingLottie,
  LoadingMessage,
} from '../../styles/LoadingStyle'

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
        console.error(`로딩 애니메이션 동작 실패: ${error}`)
        throw new Error(`로딩 애니메이션 실패: ${error}`)
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
      <LoadingMessage>Loading Error...</LoadingMessage>
    </LoadingContainer>
  )
}
