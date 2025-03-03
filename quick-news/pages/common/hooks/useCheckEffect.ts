import { useEffect, useLayoutEffect } from 'react'

const useCheckEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default useCheckEffect
