import React from 'react'
import { randomUUID } from 'crypto'
import { SkeletonLine, SkeletonLoader } from '../../styles/LoadingStyle'

function Skeleton() {
  return (
    <SkeletonLoader>
      {Array(5)
        .fill(0)
        .map((value) => (
          <SkeletonLine key={randomUUID()} />
        ))}
    </SkeletonLoader>
  )
}

export default Skeleton
