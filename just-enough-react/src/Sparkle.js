import React, { useState } from 'react';

function Sparkle() {
    // 초기 컴포넌트 상태 선언
    // 변수 'sparkle' (빈 스트링)으로 선언
    // 'addSparkle' 함수도 정의
    // 이 함수는 클릭 핸들러에서 호출
    const [sparkle, addSparkle] = useState('');

    return (
        <div>
          <button onClick={() => addSparkle(sparkle + '\u2728')}>
            Add some sparkle
          </button>
          <p>{sparkle}</p>
        </div>
    );
}

export default Sparkle;
