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

export default function SearchButton({
  searchRef,
}: {
  searchRef: React.MutableRefObject<string>
}) {
  const [isInputVisible, setInputVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const ref = searchRef

  const router = useRouter()

  const handleToggleInput = () => {
    setInputVisible((prev) => !prev)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = () => {
    ref.current = searchTerm.trim()
    router.push(`/page/search/search?q=${searchTerm}`, undefined, {
      shallow: true,
    })
    setInputVisible(false)
    if (typeof window !== 'undefined')
      localStorage.setItem('searchValue', searchTerm)
  }

  const searchNews = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (ref.current !== searchTerm.trim() && searchTerm.trim() !== '') {
        handleSearch()
      }
    }
  }

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
