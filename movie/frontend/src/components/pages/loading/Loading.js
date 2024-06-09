import React from 'react'
import LottieFiles from '../animation/lottieFiles';
import { ERROR_404, ERROR_500, LOADING_LOTTIE } from '../../constants/FileLink';
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

export function Error404({ status }) {
  return (
    <LoadingContainer stat={status}>
      <LoadingAnimation srcLink={ERROR_404} stat={status} />
    </LoadingContainer>
  )
}

export function Error500({ status }) {
  return (
    <LoadingContainer stat={status}>
      <LoadingAnimation srcLink={ERROR_500} stat={status} />
    </LoadingContainer>
  )
}

export default Loading