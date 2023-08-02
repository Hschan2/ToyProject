import React from 'react'
import styles from '../style/loading.module.css';
import LottieFiles from './lottieFiles';
import { LOADING_LOTTIE } from './constants/LottiefilesSrc';

/**
 * 로딩 페이지 컴포넌트
 * @returns 로딩 페이지 출력
 */
function Loading() {
  return (
    <div className={styles.container}>
      <LottieFiles srcLink={LOADING_LOTTIE} style={styles.loading} />
      <div className={styles.message}>Loading...</div>
    </div>
  )
}

export default Loading