import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { SkeletonLine, SkeletonLoader } from '../../styles/LoadingStyle'

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
