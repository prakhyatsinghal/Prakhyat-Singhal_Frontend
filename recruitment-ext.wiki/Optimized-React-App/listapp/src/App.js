import React, { Component } from 'react';
import './App.css';
import List from './components/List';

const App = () => {
  const items = [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' },
    { text: 'Item 4' },
  ];

  return <List items={items} />;
};

export default App;
