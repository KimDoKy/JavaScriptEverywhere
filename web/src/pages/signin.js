import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignIn = props => {
    useEffect(() => {
        // 문서 제목 업데이트
        document.title = 'Sign In - Notedly';
    });

    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            // 토큰 저장
            local.storage.setItem('token', data.signUp);
            // 로컬 캐시 업데이트
            client.writeData({ data: { isLoggedIn: true } });
            // 사용자를 홈페이지로 리다이렉션
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
          <UserForm action={signIn} formType="signIn" />
          {/* 데이터 로딩 중이면 로딩 메시지 표시 */}
          {loading && <p>Loading...</p>}
          {/* 에러가 있으면 에러 메시지 표시 */}
          {error && <p>Error creating an account!</p>}
        </React.Fragment>
    );
};

export default SignIn;
