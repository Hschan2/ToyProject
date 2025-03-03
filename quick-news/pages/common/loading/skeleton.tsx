import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { SkeletonLine, SkeletonLoader } from './style/loading-style'

function Skeleton() {
  return (
    <SkeletonLoader>
      {Array.from({ length: 5 }).map(() => (
        <SkeletonLine key={nanoid()} />
      ))}
    </SkeletonLoader>
  )
}

export default Skeleton
