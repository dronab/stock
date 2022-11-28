import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore, useSelector } from 'react-redux';

import TopPanel from './component/top/top-panel'
import Message from './component/alert/message';
import MainPage from './component/page'
import Item from './component/item'

import './App.css';
import './Color.css';

function App() {
  // const store = useStore();
  // console.log('APP!!!', store, store.getState());

  const state = useSelector(state => state);
  const { msg  } = state;
  // console.log('global state: ', state);

  return (
    <div className="App">
      <TopPanel />
      {msg.show && <Message />}
      <div className='App'>
        <div className='grid-column'>
          <div className='grid-item'>
            <Router>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/item/:id" element={<Item />} />
                <Route path="/item/" element={<Item />} />
                <Route path="*" element={<div>Ресурс не найден</div>} />
              </Routes>
            </Router>
          </div>
        </div>
      </div>
      <footer>Подвал</footer>
    </div>
  );
}

export default App;
