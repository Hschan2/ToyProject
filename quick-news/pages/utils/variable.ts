import { useRouter } from 'next/router'

export const useCurrentUrl = () => {
  const router = useRouter()
  return router.asPath
}
