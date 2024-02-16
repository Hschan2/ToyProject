import React, { useState, useCallback, useMemo, useRef } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {
  InputWrapper,
  SearchContainer,
  SearchInput,
  SearchingButton,
} from '../../../styles/ButtonStyle'

export default function SearchButton() {
  const [isInputVisible, setInputVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const inputValueRef = useRef('')
  const router = useRouter()

  const handleToggleInput = useCallback(() => {
    setInputVisible((prev) => !prev)
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const searchNews = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (router.pathname !== '/search') inputValueRef.current = ''
      if (event.key === 'Enter') {
        event.preventDefault()
        if (inputValueRef.current !== searchTerm && searchTerm.trim() !== '') {
          handleSearch()
          console.log(`검색: ${searchTerm}`)
        }
      }
    },
    [searchTerm],
  )

  const handleSearch = () => {
    router.push(`/search?q=${searchTerm}`)
    setInputVisible(false)
    inputValueRef.current = searchTerm
  }

  const searchInput = useMemo(() => {
    if (!isInputVisible) {
      return null
    }
    return (
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
    )
  }, [isInputVisible, searchTerm, handleInputChange, searchNews])

  return (
    <SearchContainer>
      <SearchingButton type="button" onClick={handleToggleInput}>
        <FontAwesomeIcon icon={faSearch} size="1x" />
      </SearchingButton>
      {searchInput}
    </SearchContainer>
  )
}
