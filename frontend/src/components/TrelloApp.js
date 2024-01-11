// frontend/src/components/TrelloApp.js
import React from 'react';
import Board from './Board';

const TrelloApp = () => {
  return (
    <div className="trello-app">
      <h1>Trello Clone</h1>
      <Board />
    </div>
  );
};

export default TrelloApp;