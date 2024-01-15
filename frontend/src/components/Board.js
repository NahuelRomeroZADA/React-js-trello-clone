// frontend/src/components/Board.js
import React, { useState } from 'react';
import List from './List';
import Modal from 'react-modal';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    <div>
      <div style={{ backgroundColor: '#222', padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h4" style={{ color: '#fff' }}>
          Trello Board
        </Typography>
      </div>
      <div style={{ display: 'flex' }}>
        {lists.map((list) => (
          <List key={list.id} title={list.title} moveList={deleteList} />
        ))}
        <div style={{ marginLeft: '20px' }}>
          <Button
            onClick={() => setIsAddingList(true)}
            style={{
              height: '40px',
              width: '40px',
              color: '#fff',
              backgroundColor: '#555',
              borderRadius: '50%',
              fontSize: '20px',
            }}
          >
            +
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isAddingList}
        onRequestClose={() => setIsAddingList(false)}
        contentLabel="Add List"
        ariaHideApp={false}
        style={{
          content: {
            width: '300px',
            height: '150px',
            margin: 'auto',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#333',
          },
        }}
      >
        {/* ... Resto del contenido del modal */}
      </Modal>
    </div>
  );
};

export default Board;
