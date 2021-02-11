import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import ButtonAsLink from './ButtonAsLink';
import { TOGGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVORITES } from '../gql/query';

const FavoriteNote = props => {
    // 노트의 즐겨찾기 카운트를 상태로 저장
    const [count, setCount] = useState(props.favoriteCount);

    // 사용자가 노트를 즐겨찾기했는지를 상태로 저장
    const [favorited, setFavorited] = useState(
        // 노트가 사용자의 즐겨찾기 목록에 있는지 확인
        props.me.favorites.filter(note => note.id === props.noteId).length > 0
    );

    // toggleFavorite 뮤테이션 훅
    const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
        variables: {
            id: props.noteId
        },
        // 캐시를 업데이트하도록 GET_MY_FAVORITES 쿼리 다시 불러오기
        refetchQueries: [{ query: GET_MY_FAVORITES }]
    });

    // 사용자가 이미 노트를 즐겨찾기했다면, 즐겨찾기 해제 옵션을 표시
    // 그렇지 않은 경우, 즐겨찾기 등록 옵션을 표시 
    return (
        <React.Fragment>
          {favorited ? (
              <ButtonAsLink
                onClick={() => {
                    setFavorited(false);
                    setCount(count - 1);
                }}
              >
              Remove Favorite
              </ButtonAsLink>
          ) : (
              <ButtonAsLink
                onClick={() => {
                    setFavorited(true);
                    setCount(count + 1);
                }}
              >
              Add Favorite
              </ButtonAsLink>
          )}
         : {count}
       </React.Fragment>
     );
};

export default FavoriteNote;
