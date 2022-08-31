import React from 'react'
import styles from '../style/loading.module.css';

/**
 * 로딩 페이지 컴포넌트
 * @returns 로딩 페이지 출력
 */
function Loading() {

  return (
    <div className={styles.container}>
      <div className={styles.loading}></div>
      <div className={styles.message}>Loading...</div>
    </div>
  )
}

export default Loading