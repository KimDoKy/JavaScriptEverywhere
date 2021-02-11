import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';

const MyNotes = () => {
    useEffect(() => {
        // 문서 제목 업데이트
        document.title = 'My Notes - Notedly';
    });

    const { loading, error, data } = useQuery(GET_MY_NOTES);

    // 데이터 로딩 중이면 앱에서 로딩 메시지 표시
    if (loading) return 'Loading...';
    // 데이터 로딩 중 에러가 발생하면 에러 메시지 표시
    if (error) return `Error! ${error.message}`;
    // 쿼리에 성공하고 노트가 있으면, 노트 피드 반환
    // 쿼리가 성공했으나 노트가 없으면 메시지 표시
    if (data.me.notes.length !== 0) {
        return <NoteFeed notes={data.me.notes} />;
    } else {
        return <p>No notes yet</p>;
    }
};

export default MyNotes;
