import { keyframes, styled } from "styled-components";
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

export const Shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }

  100% {
      background-position: 468px 0;
  }
`

export const Skeleton = styled.div`
  background: #E0E0E0;
  border-radius: 4px;
  width: ${(props) => props.width};
  height: ${(props) => props.height === "380px" ? `clamp(270px, 50vw, 380px)` : `clamp(180px, 10vw, 220px)`};
  animation: ${Shimmer} 1.5s infinite linear;
  background: linear-gradient(to right, #E0E0E0 8%, #F0F0F0 18%, #E0E0E0 33%);
  background-size: 800px 104px;
  margin: 0 ${(props) => props.margin};
`

export const SkeletonLayout = styled.div`
  display: flex;
  flex-direction: row;
`