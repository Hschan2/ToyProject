import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { TMButton, TMContainer, TMInput } from '../../../styles/ButtonStyle'

function searchPage() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const router = useRouter()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) return
    router.push(`/page/search/search?q=${searchTerm}`, undefined, {
      shallow: true,
    })
  }

  const onEnterSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (!searchTerm.trim()) return
    if (event.key === 'Enter') handleSearch()
  }

  return (
    <TMContainer>
      <TMInput
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
        onKeyDown={onEnterSearch}
        autoFocus
      />
      <TMButton onClick={handleSearch} aria-label="뉴스검색">
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
      </TMButton>
    </TMContainer>
  )
}

export default searchPage
