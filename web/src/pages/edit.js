import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
    // URL에서 찾은 ID를 변수로 저장
    const id = props.match.params.id;
    // 노트 쿼리 정의
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
    // 현재 사용자 데이터 불러오기
    const { data: userdata } = useQuery(GET_ME);
    // 뮤테이션 정의
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    });

    // 데이터 로딩 중이면 로딩 메시지 표시
    if (loading) return <p>Loading...</p>;
    // 데이터 로딩 중 에러 발생하면 에러 메시지 표시
    if (error) return <p>Error! Note not found</p>;
    // 현재 사용자와 노트 작성자가 불일치할 경우
    if (userdata.me.id !== data.note.author.id) {
        return <p>You do not have access to edit this note</p>;
    }

    // 데이터 양식 컴포넌트에 전달
    return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
