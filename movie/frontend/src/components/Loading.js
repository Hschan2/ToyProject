import React from 'react'
import styles from '../style/loading.module.css';
import LottieFiles from './lottieFiles';

/**
 * 로딩 페이지 컴포넌트
 * @returns 로딩 페이지 출력
 */
function Loading() {
  const lottieFilesSrc = 'https://assets1.lottiefiles.com/packages/lf20_jv0xz0qi.json';

  return (
    <div className={styles.container}>
      <LottieFiles srcLink={lottieFilesSrc} style={styles.loading} />
      <div className={styles.message}>Loading...</div>
    </div>
  )
}

export default Loading