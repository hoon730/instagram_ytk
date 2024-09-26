import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul,
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
/* 
  input {
    border: none;
    padding-left: 10px;
    transition: all 0.3s;
  }

  input::-moz-placeholder {
    opacity: 1;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }

  input::placeholder {
    opacity: 1;
    transition: all 0.3s;
  }

  input:focus {
    outline: none;
  }

  input:focus::-moz-placeholder {
    opacity: 0;
  }

  input:focus::placeholder {
    opacity: 0;
  } */

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: "Noto Sans KR", sans-serif;
  }

  body {
    font-family: "Noto Sans KR", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -0.5px;
  }

  :root {
    --main-color: linear-gradient(-75deg, #F9CE34, #EE2A7B, #6228D7);
    --sub-purple-color: #6228D7;
    --sub-pink-color: #EE2A7B;
    --warning-color: #FF5C2B;
    --bg-black-color: #1F0D44;
    --bg-white-color: #FFFFFF;
    --light-gray-color: #EEEEEE;
    --gray-color: #BFBFBF;
    --dark-gray-color: #7E7E7E;
    --font-black-color: #2B2B2B;

    --border-radius-12: 12px;
    --border-radius-8: 8px;

    --font-size-8: 8px;
    --font-size-10: 10px;
    --font-size-12: 12px;
    --font-size-14: 14px;
    --font-size-16: 16px;
    --font-size-18: 18px;
    --font-size-20: 20px;
    --font-size-22: 22px;
    --font-size-24: 24px;
    --font-size-28: 28px;
    --font-size-32: 32px;
    --font-size-34: 34px;

    --font-thin: 100;
    --font-extralight: 200;
    --font-light: 300;
    --font-regular: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;
    --font-extrabold: 800;
    --font-black: 900;
    
  }
`;

export default GlobalStyles;
