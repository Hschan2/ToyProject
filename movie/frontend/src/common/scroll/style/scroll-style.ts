import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const UpTopButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: clamp(30px, 10%, 50px);
  background: tomato;
  color: white;
  cursor: pointer;
  width: clamp(40px, 5vw, 60px);
  height: clamp(40px, 5vw, 60px);
  border-radius: 50%;
  border: none;
  transition: 0.3s;

  svg {
    width: clamp(26px, 3vw, 46px);
    height: clamp(26px, 3vw, 46px);
  }

  &:hover {
    background: #ff7547;
  }

  @media (max-width: 425px) {
    bottom: 80px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
`;

export const Content = styled.div`
  flex: 1;
  height: 100%;
`;

// Bottom Menu Style
export const BottomMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding-right: 20px;
  visibility: hidden;

  @media (max-width: 425px) {
    visibility: visible;
  }
`;

export const BottomMenuButton = styled(Link)<{ active?: string }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  border: none;
  border-left: 1px solid ${(props) => props.theme.background};
  border-right: 1px solid ${(props) => props.theme.background};
  background-color: ${(props) => props.theme.background};
  color: ${(props) => (props.active === "true" ? props.theme.text : "#777")};
  gap: 4px;
  font-size: 14px;

  svg {
    width: 15px;
    height: 15px;
  }
`;

// Searching Style
export const SearchingWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`;

export const SearchingContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SearchingInput = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.lightBorder};
  color: ${(props) => props.theme.text};
  background-color: transparent;
  width: 100%;
  height: 50px;
  font-size: 14px;

  &::placeholder {
    color: ${(props) => props.theme.lightText};
  }
`;

export const SearchingButton = styled.button`
  width: 20%;
  border: none;
  border-bottom: 0.5px solid ${(props) => props.theme.lightBorder};
  background: ${(props) => props.theme.lightBackground};
  cursor: pointer;

  svg {
    width: clamp(15px, 2vw, 20px);
    height: clamp(15px, 2vw, 20px);
    color: ${(props) => props.theme.text};
  }
`;

export const SearchingButtonWrapper = styled.div`
  margin: 20px 0;
`

export const SearchingWordButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.lightBorder};
  background-color: transparent;
`

export const SearchingWordTitle = styled.span`
  font-weight: 800;
`