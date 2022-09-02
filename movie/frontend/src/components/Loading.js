import React, { useRef } from 'react'
import styles from '../style/loading.module.css';
import { Player } from '@lottiefiles/react-lottie-player';

/**
 * 로딩 페이지 컴포넌트
 * Lottiefiles 출처: https://lottiefiles.com/
 * @returns 로딩 페이지 출력
 */
function Loading() {
  const container = useRef(null);

  return (
    <div className={styles.container}>
      <div className={styles.loading}></div>
      <Player
        ref={container.current}
        autoplay
        loop
        src='https://assets1.lottiefiles.com/packages/lf20_jv0xz0qi.json'
        className={styles.loading}
      />
      <div className={styles.message}>Loading...</div>
    </div>
  )
}

export default Loading