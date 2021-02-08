import React from 'react';
import ReactDom from 'react-dom';

// 글로벌 스타일 임포트
import GlobalStyle from './components/GlobalStyle';

import Pages from './pages';

const App = () => {
    return (
        <div>
          <GlobalStyle />
          <Pages />
        </div>
    );
};

ReactDom.render(<App />, document.getElementById('root'));
