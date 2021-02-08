// createGlobalStyle 및 normalize 임포트
import { createGlobalStyle } from 'styled-components';
import normalize from 'normalize.css';

// CSS 를 JS 템플릿 리터럴로 작성 가능
export default createGlobalStyle`
  ${normalize}

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body,
  html {
    height: 100%;
    margin: 0;
  }

  body {
    background-color: #fff;
    line-height: 1.4;
  }

  a:link,
  a:bisited {
    color: #0077cc;
  }

  a:hover,
  a:focus {
    color: #004499;
  }

  code,
  pre {
    max-width: 100%;
  }
`;
