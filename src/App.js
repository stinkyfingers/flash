import React from 'react';
import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import Store from './store'

function App() {
  return (
    <Store.Container>
      <div className="App">
        <Header />
        <Body />
      </div>
    </Store.Container>
  );
}

export default App;
