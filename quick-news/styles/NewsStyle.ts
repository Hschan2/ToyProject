import styled from 'styled-components'
import { COMMON_COLOR } from '../constants/StyleVariable'

export const NewsCard = styled.div`
  background-color: #fff;
  padding: 20px 18px;
  border-bottom: 0.25px solid rgba(0, 0, 0, 0.1);

  &:hover {
    border-left: 3px solid ${COMMON_COLOR};
  }
`

export const Author = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
`

export const DateOfNews = styled.p`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  margin-top: -10px;
`
