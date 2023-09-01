import { startTransition } from 'react'
import { useRecoilState } from 'recoil'
import { SeoState } from '../../constants/SeoState'

export default function useSetSEO() {
  const [seo, setSEO] = useRecoilState(SeoState)

  const setSEOInfo = (title: string) => {
    startTransition(() => {
      setSEO(title)
    })
  }

  return setSEOInfo
}
