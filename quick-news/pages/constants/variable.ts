import { useRouter } from 'next/router'

const ROUTER = useRouter()
export const CURRENT_URL = ROUTER.asPath
