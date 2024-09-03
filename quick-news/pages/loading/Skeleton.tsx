import React from 'react'
import { SkeletonLine, SkeletonLoader } from '../../styles/LoadingStyle'

function Skeleton() {
  return (
    <SkeletonLoader>
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonLine key={index} />
      ))}
    </SkeletonLoader>
  )
}

export default Skeleton
