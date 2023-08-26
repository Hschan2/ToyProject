import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import styled, { keyframes } from 'styled-components'
import React, { useState } from 'react'
import { NewsCard } from '../../../styles/NewsStyle'
import { DateTime } from '../../../styles/InfoStyle'

interface NewsItem {
  id: string
  title: string
  description: string
  link: string
  pubDate: number
}

const slideIn = keyframes`
  from {
    transform: translateX(-10%);
  }
  to {
    transform: translateX(0);
  }
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`

const SearchInput = styled.input`
  animation: ${slideIn} 0.3s ease-out;
`

const StyledButton = styled.button`
  position: relative;
  transition: transform 0.3s;
  z-index: 2;

  &:active {
    transform: translateX(-5px);
  }
`

const InputWrapper = styled.div`
  animation: ${slideIn} 0.3s ease-out;
  z-index: 1;
`

function SearchNews() {
  const [isInputVisible, setInputVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [newsResults, setNewsResults] = useState<NewsItem[]>([])

  const handleSearch = async () => {
    try {
      const response = await axios.get<{ items: NewsItem[] }>(
        `/api/naver-news-proxy`,
        {
          params: {
            q: searchTerm,
          },
        },
      )

      setNewsResults(response.data.items)
    } catch (error) {
      console.error(error)
    }
  }

  const handleToggleInput = () => {
    setInputVisible(!isInputVisible)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div>
      <SearchContainer>
        <StyledButton type="button" onClick={handleToggleInput}>
          검색
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

      <div>
        {newsResults.map((newsItem) => (
          <Link href={newsItem.link} target="_blank" key={newsItem.id}>
            <NewsCard>
              <h3 dangerouslySetInnerHTML={{ __html: newsItem.title }} />
              <DateTime>
                {moment(newsItem.pubDate).format('YYYY-MM-DD HH:mm')}
              </DateTime>
              <p dangerouslySetInnerHTML={{ __html: newsItem.description }} />
            </NewsCard>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SearchNews
