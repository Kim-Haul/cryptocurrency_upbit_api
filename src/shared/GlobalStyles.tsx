import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
  }
  body {
    color: #323232;
  }
  html {
    font-size: 10px;
  }
  button {
    cursor: pointer;
    border: none;
    padding: 10px;
    transition: all 0.2s ease-in-out;
    &:hover {
      filter: brightness(90%);
    }
    font-weight: 600;
    background-color: #fc5f64;
    border-color: #fc5f64;
    color: #fff;
    // 버튼 내부 글자 가운데 정렬
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;
