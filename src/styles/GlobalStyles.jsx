const { createGlobalStyle } = require('styled-components');
const { default: reset } = require('styled-reset');

export const GlobalStyles = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
    }
`;
