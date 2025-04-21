import { useRouter } from 'next/router'

const useCurrentUrl = () => {
  const router = useRouter()
  return router.asPath
}

export default useCurrentUrl
