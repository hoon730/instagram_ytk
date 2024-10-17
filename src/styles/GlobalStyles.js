import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* &::-webkit-scrollbar {
      display: none; //크롬, 사파리, 오페라, 엣지
    }
    -ms-overflow-style: none; //인터넷 익스플로러
    scrollbar-width: none; //파이어 폭스 */
  }

  ul,
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    border: none;
    /* padding-left: 10px; */
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
  }

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
    --main-color: linear-gradient(-75deg, #F9CE34, #E5317C, #6228D7);
    --sub-purple-color: #6228D7;
    --sub-pink-color: #E5317C;
    --warning-color: #FF5C2B;
    --bg-black-color: #1F0D44;
    --bg-white-color: #FFFFFF;
    --light-gray-color: #EEEEEE;
    --gray-color: #BFBFBF;
    --dark-gray-color: #7E7E7E;
    --deep-dark-gray-color: #444444;
    --font-black-color: #2B2B2B;

    --border-radius-12: 12px;
    --border-radius-8: 8px;

    --font-8: 8px;
    --font-10: 10px;
    --font-12: 12px;
    --font-14: 14px;
    --font-16: 16px;
    --font-18: 18px;
    --font-20: 20px;
    --font-22: 22px;
    --font-24: 24px;
    --font-26: 26px;
    --font-28: 28px;
    --font-30: 30px;
    --font-32: 32px;
    --font-34: 34px;
    --font-46: 46px;

    --font-thin: 100;
    --font-extralight: 200;
    --font-light: 300;
    --font-regular: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;
    --font-extrabold: 800;
    --font-black: 900;
    
    --box-shadow:  0 0 30px rgba(0, 0, 0, 0.1);
  }
`;

export default GlobalStyles;
