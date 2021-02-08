import React from 'react';
import { useQuery, gql } from '@apollo/client';

import Note from '../components/Note';

const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

const NotePage = props => {
    // URL의 ID를 변수로 저장
    const id = props.match.params.id;
    // 훅을 쿼리하며 ID 값을 변수로 전달
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
    // 데이터 로딩 중이면 로딩 메시지 표시
    if (loading) return <p>Loading...</p>;
    // 데이터 로딩 중 에러 발생하면 에러 메시지 표시
    if (error) return <p>Error! Note not found</p>;

    // 데이터 로딩에 성공하면 UI에 데이터 표시
    return <Note note={data.note} />;
};

export default NotePage;
