import styled from 'styled-components'
import Lottie from 'react-lottie-player'

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`

export const LoadingMessage = styled.div`
  margin-top: 20px;
  font-weight: bold;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const LoadingLottie = styled(Lottie)`
  display: inline-block;
  width: 250px;
  height: 250px;
`
