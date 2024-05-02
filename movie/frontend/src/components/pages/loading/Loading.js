import React from 'react'
import LottieFiles from '../animation/lottieFiles';
import { LOADING_LOTTIE } from '../../constants/LottiefilesSrc';
import { LoadingContainer, LoadingAnimation, Message } from '../../../style/Loading';

/**
 * 로딩 페이지 컴포넌트
 * @returns 로딩 페이지 출력
 */
function Loading() {
  return (
    <LoadingContainer>
      <LoadingAnimation srcLink={LOADING_LOTTIE} />
      <Message>Loading...</Message>
    </LoadingContainer>
  )
}

export default Loading