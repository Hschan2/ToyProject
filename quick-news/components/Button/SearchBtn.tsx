import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
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
      <SearchingButton type="button" onClick={handleToggleInput}>
        <FontAwesomeIcon icon={faSearch} size="1x" />
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
