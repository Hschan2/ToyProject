import { styled } from "styled-components";
import LottieFiles from "../components/pages/animation/lottieFiles";

export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
`

export const LoadingAnimation = styled(LottieFiles)`
  display: inline-block;
  width: 250px;
  height: 250px;
`;

export const Message = styled.p`
  margin-top: 20px;
  font-weight: bold;
  user-select: none;
`;