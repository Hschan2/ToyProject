import { styled } from "styled-components";

interface SliderProps {
  checked: boolean;
}

export const DarkModeContainer = styled.div`
  margin-bottom: 20px;
  margin-left: 14px;
`;

export const Toggle = styled.input.attrs({ type: 'checkbox' })`
  visibility: hidden;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  color: black;
`;

export const Indicator = styled.div`
  content: "";
  width: 48px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.background};
  margin-right: 4px;
  transition: 250ms ease-in-out;
`;

export const Slider = styled.div<SliderProps>`
  content: "";
  width: 20px;
  height: 18px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.text};
  position: absolute;
  left: 1;
  margin-left: 4px;
  transition: 250ms ease-in-out;
  transform: ${props => props.checked ? 'translateX(100%)' : 'translateX(0)'};
`;