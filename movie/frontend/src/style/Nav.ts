import { styled } from "styled-components";
import LottieFiles from "../components/pages/animation/lottieFiles";

interface LogoProps {
  srcLink: string;
}

export const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 clamp(4px, 100%, 8px);
  border-bottom: 1px solid ${(props) => props.theme.lightBorder};
`;

// Logo
export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LogoAnimation = styled.div`
  max-width: clamp(40px, 10vw, 60px);
`;

export const LottieAnimation = styled(LottieFiles)<LogoProps>`
  width: 100%;
  height: auto;
`;

export const LogoTitle = styled.h1`
  font-size: clamp(20px, 4vw, 32px);
  font-weight: 600;
  font-style: normal;
  color: tomato;
`;

// Search
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;

export const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px 0 0 8px;
  color: ${(props) => props.theme.text};
  background-color: transparent;
  width: clamp(70px, 15vw, 180px);
  height: clamp(28px, 4vw, 36px);
  font-size: clamp(12px, 2vw, 14px);

  &::placeholder {
    color: ${(props) => props.theme.lightText};
  }
`;

export const SearchButton = styled.button`
  border-top: 1px solid ${(props) => props.theme.border};
  border-right: 1px solid ${(props) => props.theme.border};
  border-bottom: 1px solid ${(props) => props.theme.border};
  border-left: none;
  border-radius: 0 8px 8px 0;
  background: ${(props) => props.theme.lightBackground};
  cursor: pointer;

  svg {
    width: clamp(15px, 2vw, 20px);
    height: clamp(15px, 2vw, 20px);
    color: ${(props) => props.theme.text};
  }
`;
