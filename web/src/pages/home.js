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
    // 부모 원소 제공을 위해 <React.Fragment> 추가
    return (
      <React.Fragment>
        <NoteFeed notes={data.noteFeed.notes} />
        {data.noteFeed.hasNextPage && (
            // onClick은 현재 커서를 변수로 전달하며 쿼리를 수행한다
            <Button
              onClick={() =>
                  fetchMore({
                      variables: {
                          cursor: data.noteFeed.cursor
                      },
                      updateQuery: (previousResult, { fetchMoreResult }) => {
                          return {
                              noteFeed: {
                                  cursor: fetchMoreResult.noteFeed.cursor,
                                  hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                  // 새 결과를 기존 결과와 결함
                                  notes: [
                                      ...previousResult.noteFeed.notes,
                                      ...fetchMoreResult.noteFeed.notes
                                  ],
                                  __typename: 'noteFeed'
                              }
                          };
                      }
                  })
              }
            >
            Lead more
            </Button>
        )}
     </React.Fragment>
  );
};

export default Home;
