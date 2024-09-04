import 'core-js/modules/es.string.trim'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  InputWrapper,
  SearchContainer,
  SearchInput,
  SearchingButton,
} from '../../styles/ButtonStyle'

export default function SearchButton() {
  const [isInputVisible, setInputVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const prevSearchTerm = useRef<string>('')

  const router = useRouter()

  const handleToggleInput = () => {
    setInputVisible((prev) => !prev)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = () => {
    router.push(`/page/search/search?q=${searchTerm}`, undefined, {
      shallow: true,
    })
    setInputVisible(false)
    saveNewsValue()
  }

  const searchNews = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    event.preventDefault()

    if (!searchTerm.trim()) return

    if (prevSearchTerm.current === searchTerm.trim()) return

    handleSearch()
  }

  const saveNewsValue = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchValue', searchTerm)
    }
    prevSearchTerm.current = searchTerm.trim()
  }

  useEffect(() => {
    if (router.pathname !== '/page/search/search') prevSearchTerm.current = ''
  }, [router.pathname])

  return (
    <SearchContainer>
      <SearchingButton
        type="button"
        onClick={handleToggleInput}
        aria-label="뉴스검색"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>
      </SearchingButton>
      {isInputVisible && (
        <InputWrapper>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="검색"
            onKeyDown={searchNews}
            autoFocus
          />
        </InputWrapper>
      )}
    </SearchContainer>
  )
}
