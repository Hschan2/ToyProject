import { styled } from "styled-components";

export const DarkModeContainer = styled.div`
  margin-bottom: 22px;
  margin-left: 12px;
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
  border: 1px solid #111;
  background-color: #FFF;
  margin-right: 4px;
  transition: 250ms ease-in-out;
`;

export const Slider = styled.div`
  content: "";
  width: 20px;
  height: 18px;
  border-radius: 12px;
  background-color: #111;
  position: absolute;
  left: 1;
  margin-left: 4px;
  transition: 250ms ease-in-out;
  transform: ${props => props.checked ? 'translateX(100%)' : 'translateX(0)'};
`;