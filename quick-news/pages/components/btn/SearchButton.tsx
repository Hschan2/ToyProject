import React, { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil'
import { searchState } from '../../../constants/SearchTermState'
import {
  InputWrapper,
  SearchContainer,
  SearchInput,
  SearchingButton,
} from '../../../styles/ButtonStyle'

export default function SearchButton() {
  const [isInputVisible, setInputVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchTermState, setSearchTermState] = useRecoilState(searchState)
  const router = useRouter()

  const handleToggleInput = useCallback(() => {
    setInputVisible((prev) => !prev)
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setSearchTermState(searchTerm)
        setInputVisible(false)
        setSearchTerm('')
        router.push(`/search`)
      }
    },
    [searchTerm, setSearchTermState, router],
  )

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
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </InputWrapper>
    )
  }, [searchTerm, handleInputChange, handleKeyDown])

  return (
    <SearchContainer>
      <SearchingButton type="button" onClick={handleToggleInput}>
        <FontAwesomeIcon icon={faSearch} size="1x" />
      </SearchingButton>
      {searchInput}
    </SearchContainer>
  )
}
