import React from 'react';
import ReactDom from 'react-dom';

import { 
    ApolloClient, 
    ApolloProvider, 
    createHttpLink,
    InMemoryCache 
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

import GlobalStyle from './components/GlobalStyle';
import Pages from './pages';

// API URI 및 캐시 설정
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// 토큰을 확인하고 컨텍스트에 대한 헤더 반환
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };
});

// 아폴로 클라이언트 설정
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
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
