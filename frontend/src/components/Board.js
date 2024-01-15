// frontend/src/components/Board.js
import React, { useState } from 'react';
import List from './List';
import Modal from 'react-modal';
import './Board.scss';

const Board = () => {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');
  const [isAddingList, setIsAddingList] = useState(false);

  const addList = () => {
    if (newListTitle.trim() !== '') {
      setLists([...lists, { id: Date.now(), title: newListTitle }]);
      setNewListTitle('');
      setIsAddingList(false);
    }
  };

  const deleteList = (listId) => {
    setLists(lists.filter((list) => list.id !== listId));
  };

  return (
    <div className="board">
      <div className="lists-board">
        {lists.map((list) => (
          <List key={list.id} title={list.title} moveList={deleteList} />
        ))}
      </div>
      <div className="add-list-button" onClick={() => setIsAddingList(true)}>
        +
      </div>
      <Modal
        isOpen={isAddingList}
        onRequestClose={() => setIsAddingList(false)}
        contentLabel="Add List"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro
          },
          content: {
            width: '300px',
            height: '150px',
            margin: 'auto',
            borderRadius: '8px',
            padding: '20px',
          },
        }}
      >
        <div>
          <h2>Add List</h2>
          <label>List Title:</label>
          <input
            type="text"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <button onClick={addList}>Add List</button>
        </div>
      </Modal>
    </div>
  );
};

export default Board;
