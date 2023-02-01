import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore, useSelector } from 'react-redux';

import TopMenu from './component/top-menu/menu-panel';
import Message from './component/alert/message';
import MainScreen from './page/page-start/main-screen'
import Item from './page/page-item/component'
import CartList from './page/page-cart/listing-items';
import Oops from './page/page-error/oops';

import './App.css';
import './Color.css';
import './Button.css';

function App() {
  // const store = useStore();
  // console.log('APP!!!', store, store.getState());

  const state = useSelector(state => state);
  const { msg: { show } } = state;
  // console.log('global state: ', state);

  return (
    <div className="App">
      <Router>
        <TopMenu />
        {show && <Message />}
        <div className='Page-Container'>
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/item/:id" element={<Item />} />
            <Route path="/item/" element={<Item />} />
            <Route path="*" element={<Oops />} />
            <Route path='/cart' element={<CartList />} />
          </Routes>
        </div>
      </Router>
      <footer>Подвал</footer>
    </div>
  );
}

export default App;
