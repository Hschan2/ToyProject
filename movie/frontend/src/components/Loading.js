import React from 'react'
import styles from '../style/loading.module.css';

function Loading() {

  return (
    <div class={styles.container}>
      <div class={styles.loading}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    
  )
}

export default Loading