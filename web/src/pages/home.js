import React from 'react';
import { useQuery, gql } from '@apollo/client';

import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';

import ReactMarkdown from 'react-markdown';

const GET_NOTES = gql`
query noteFeed($cursor: String) {
  noteFeed(cursor: $cursor) {
    cursor
    hasNextPage
    notes {
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
}`;


const  Home = () => {
    // 훅 쿼리
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

    // 데이터 로딩 중이면 로딩 메시지 표시
    if (loading) return <p>Loading...</p>;
    // 데이터 로딩 중 에러 발생하면 에러 메시지 표시
    if (error) return <p>Error!</p>;

    // 데이터 로딩에 성공하면 UI에 데이터 표시
    return <NoteFeed notes={data.noteFeed.notes} />;
};

export default Home;
