import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Layout from '../components/Layout';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Note from './note';
import SignUp from './signup';
import SignIn from './signin';
import NewNote from './new';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Pages = () => {
        return (
            <Router>
              <Layout>
                  <Route exact path="/" component={Home} />
                  <PrivateRoute path="/mynotes" component={MyNotes} />
                  <PrivateRoute path="/favorites" component={Favorites} />
                  <PrivateRoute path="/new" component={NewNote} />
                  <Route path="/note/:id" component={Note} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/signin" component={SignIn} />
              </Layout>
            </Router>
    );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    // 데이터 로딩 중이면 로딩 메시지 표시
    if (loading) return <p>Loading...</p>;
    // 데이터 로딩 중 에러가 발생하면 에러 메시지 표시
    if (error) return <p>Error!</p>;
    // 사용자가 로그인해 있으면 요청한 컴포넌트로 라우팅
    // 사용자가 로그인 상태가 아니면 로그인 페이지로 리다이렉션
    return (
        <Route
          {...rest}
          render={props =>
              data.isLoggedIn === true ? (
                  <Component {...props} />
              ) : (
                  <Redirect
                    to={{
                        pathname: '/signin',
                        state: { form: props.location }
                    }}
                  />
              )
          }
        />
    );
};

export default Pages;
