import React from 'react';
import Router from './Router';
import './App.css';
import './assets/style.css';
import { Header } from './components/Header/index';

function App() {
  return (
    <>
      <Header />
      <main className='c-main'>
        <Router />
      </main>
    </>
  );
}

export default App;
