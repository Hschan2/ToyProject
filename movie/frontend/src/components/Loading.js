import React from 'react'
import styles from '../style/loading.module.css';

function Loading() {

  return (
    <div className={styles.container}>
      <div className={styles.loading}></div>
      <div className={styles.message}>Loading...</div>
    </div>
  )
}

export default Loading