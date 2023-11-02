import React from 'react'
import { SkeletonLine, SkeletonLoader } from '../../../styles/LoadingStyle'

function Skeleton() {
  return (
    <SkeletonLoader>
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
    </SkeletonLoader>
  )
}

export default Skeleton
