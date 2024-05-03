import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${(props) => props.theme.background};
        transition: background 0.3s ease;
    }
`

export default GlobalStyles;