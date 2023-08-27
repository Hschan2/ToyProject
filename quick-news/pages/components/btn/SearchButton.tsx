import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {
  InputWrapper,
  SearchContainer,
  SearchInput,
  StyledButton,
} from '../../../styles/ButtonStyle'

function SearchButton() {
  const [isInputVisible, setInputVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleToggleInput = () => {
    setInputVisible(!isInputVisible)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {}

  return (
    <SearchContainer>
      <StyledButton type="button" onClick={handleToggleInput}>
        <FontAwesomeIcon icon={faSearch} size="1x" />
      </StyledButton>
      {isInputVisible && (
        <InputWrapper>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </InputWrapper>
      )}
    </SearchContainer>
  )
}

export default SearchButton
