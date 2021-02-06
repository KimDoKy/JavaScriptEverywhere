import React from 'react';
import './App.css';

// 스파클 컴포넌트를 임포트
import Sparkle from './Sparkle'

function App() {
    const name = 'Adam';
    const now = String(new Date())
  return (
      <div className="App">
        <p>Hello {name}!</p>
        <p>The current time is {now}</p>
        <p>Two plus two is {2+2}</p>
        <Sparkle />
      </div>
  );
}

export default App;