import styled from 'styled-components'

export const RecommendedSection = styled.section`
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 12px;
  background-color: #fff7d6;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
  }

  p {
    color: #555;
    margin-top: 0.5rem;
  }
`

export const RecommendedLink = styled.a`
  color: #1d4ed8;
  text-decoration: underline;
  font-weight: 600;
  &:hover {
    color: #2563eb;
  }
`
