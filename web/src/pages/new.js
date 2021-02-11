import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import NoteForm from '../components/NoteForm';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

const NewNote = props => {
    useEffect(() => {
        // 문서 제목 업데이트
        document.title = 'New Note - Notedly';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        // GET_NOTES 쿼리를 다시 가져와서 캐시 업데이트
        refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
        onCompleted: data => {
            // 완료되면 사용자를 노트 페이지로 리다이렉션
            props.history.push('note/${data.newNote.id}');
        }
    });

    return (
        <React.Fragment>
          {/* 뮤테이션 로딩 중이면 로딩 메시지 표시 */}
          {loading && <p>Loading...</p>}
          {/* 에러가 있으면 에러 메시지 표시 */}
          {error && <p>Error saving the note</p>}
          {/* 폼 컴포넌트는 뮤테이션 데이터를 prop으로 전달 */}
          <NoteForm action={data} />
        </React.Fragment>
    );
};

export default NewNote;
