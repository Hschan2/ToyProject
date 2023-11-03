import React from 'react'
import { SkeletonLine, SkeletonLoader } from '../../../styles/LoadingStyle'

function Skeleton() {
  return (
    <SkeletonLoader>
      {Array(5)
        .fill(0)
        .map(() => (
          <SkeletonLine />
        ))}
    </SkeletonLoader>
  )
}

export default Skeleton
