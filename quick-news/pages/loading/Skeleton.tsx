import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { SkeletonLine, SkeletonLoader } from '../../styles/LoadingStyle'

function Skeleton() {
  return (
    <SkeletonLoader>
      {Array(5)
        .fill(0)
        .map((value) => (
          <SkeletonLine key={uuidv4()} />
        ))}
    </SkeletonLoader>
  )
}

export default Skeleton
