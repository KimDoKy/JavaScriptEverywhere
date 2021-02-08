import React from 'react';
import ReactDom from 'react-dom';

// 아폴로 클라이언트 라이브러리 임포트
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import GlobalStyle from './components/GlobalStyle';
import Pages from './pages';

// API URI 및 캐시 설정
const uri = process.env.API_URI;
const cache = new InMemoryCache();

// 아폴로 클라이언트 설정
const client = new ApolloClient({
    uri,
    cache,
    connectToDevTools: true
});

const App = () => {
    return (
        <ApolloProvider client={client}>
          <GlobalStyle />
          <Pages />
        </ApolloProvider>
    );
};

ReactDom.render(<App />, document.getElementById('root'));
