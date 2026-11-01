import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import {
  LoadingContainer,
  LoadingLottie,
  LoadingMessage,
} from '../../styles/loading/loading-style'
import loading from '../../public/lottie/loading.json'

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false })

export default function Loading() {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    setAnimationData(loading)
  }, [])

  return (
    <LoadingContainer>
      {animationData ? (
        <>
          <LoadingLottie>
            <Lottie
              loop
              animationData={animationData}
              play
              style={{ width: '100%', height: '100%' }}
            />
          </LoadingLottie>
          <LoadingMessage>Loading...</LoadingMessage>
        </>
      ) : (
        <div>No LottieFile</div>
      )}
    </LoadingContainer>
  )
}
