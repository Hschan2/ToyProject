import { keyframes, styled } from "styled-components";
import LottieFiles from "../../lottie-files/lottie-files";

interface LoadingProps {
  stat?: "main" | "carousel" | "error" | string | null;
}

interface SkeletonProps {
  width: string;
  height: string;
  margin: string;
}

// Loading
export const LoadingContainer = styled.div<LoadingProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.stat === "error" ? "0" : "150px")};
`;

export const LoadingAnimation = styled(LottieFiles)<LoadingProps>`
  display: inline-block;
  width: ${(props) => (props.stat === "error" ? "100px" : "250px")};
  height: ${(props) => (props.stat === "error" ? "100px" : "250px")};
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
`;

// Skeleton
export const Skeleton = styled.div<SkeletonProps>`
  background: #e0e0e0;
  width: ${(props) => props.width};
  height: ${(props) =>
    props.height === "380px"
      ? `clamp(250px, 10vw, 400px)`
      : `clamp(180px, 10vw, 220px)`};
  animation: ${Shimmer} 1.5s infinite linear;
  background: linear-gradient(to right, #e0e0e0 8%, #f0f0f0 18%, #e0e0e0 33%);
  background-size: 800px 104px;
  margin: 0 ${(props) => props.margin};
`;

export const SkeletonLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

// Error
export const ErrorContainer = styled.div<LoadingProps>`
  width: 100%;
  height: ${(props) =>
    props.stat === "main"
      ? "clamp(300px, 20vw, 450px)"
      : props.stat === "carousel"
      ? "clamp(20vh, 10vw, 40vh)"
      : "clamp(350px, 10vw, 500px)"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.05);

  svg {
    width: clamp(50px, 10vw, 150px);
    height: clamp(50px, 10vw, 150px);
    color: #ff0f0f;
  }
`;

export const ErrorTitle = styled.h2`
  font-weight: 600;
  font-size: clamp(18px, 2vw, 32px);
  color: ${(props) => props.theme.text};
`;

export const ErrorMessage = styled.span`
  font-size: clamp(14px, 1vw, 20px);
  color: ${(props) => props.theme.text};
`;
