import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useSearchQuery = () => {
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setSearchValue(q)
      localStorage.setItem('searchValue', q)
    } else {
      const saved = localStorage.getItem('searchValue') || ''
      setSearchValue(saved)
    }
  }, [searchParams])

  return { searchValue }
}
