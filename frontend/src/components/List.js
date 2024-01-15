// frontend/src/components/List.js
import React, { useState } from 'react';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Modal from 'react-modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuItem from '@mui/material/MenuItem';

const List = ({ title, moveList }) => {
  const [cards, setCards] = useState([]);
  const [newCardText, setNewCardText] = useState('');
  const [newCardContent, setNewCardContent] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('Programming');
  const [listHeight, setListHeight] = useState(80);

  const getColorForLabel = (label) => {
    switch (label) {
      case 'Programming':
        return '#D98CD1';
      case 'Food':
        return '#A3FFC2';
      case 'Coffee':
        return '#5F3939';
      case 'Gym':
        return '#FFC6C6';
      case 'Study':
        return '#7A92EA';
      default:
        return 'gray';
    }
  };

  const addCard = () => {
    if (newCardText.trim() !== '') {
      const labelColor = getColorForLabel(selectedLabel);
      setCards([...cards, { id: Date.now(), title: newCardText, content: newCardContent, label: selectedLabel, labelColor }]);
      setNewCardText('');
      setNewCardContent('');
      setIsAddingCard(false);
      setListHeight(listHeight + 40);
    }
  };

  const deleteCard = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };

  const handleTitleEdit = () => {
    setEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setEditingTitle(false);
  };

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => {
      moveList(title);
    },
  });

  return (
    <Paper
      ref={drop}
      className="list-container"
      style={{ minHeight: listHeight + 'px', padding: '10px', backgroundColor: '#333', borderRadius: '8px' }}
    >
      <div className="list-header" onClick={handleTitleEdit}>
        {editingTitle ? (
          <TextField
            value={listTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            autoFocus
            fullWidth
            variant="standard"
            color="primary"
          />
        ) : (
          <Typography variant="h6" style={{ color: '#fff', margin: '0' }}>
            {listTitle}
          </Typography>
        )}
      </div>
      <div className="cards-list">
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            content={card.content}
            label={card.label}
            labelColor={card.labelColor}
            onDelete={() => deleteCard(card.id)}
          />
        ))}
      </div>
      <div className="add-card">
        <Button
          onClick={() => setIsAddingCard(true)}
          style={{ height: '40px', width: '40px', color: '#fff', backgroundColor: '#555', borderRadius: '50%', fontSize: '20px' }}
        >
          +
        </Button>
      </div>
      <Modal
        isOpen={isAddingCard}
        onRequestClose={() => setIsAddingCard(false)}
        contentLabel="Add Card"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          content: {
            width: '300px',
            height: '300px',
            margin: 'auto',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#333',
          },
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" style={{ color: '#fff', marginBottom: '10px' }}>
            Add Card
          </Typography>
          <TextField
            label="Title"
            value={newCardText}
            onChange={(e) => setNewCardText(e.target.value)}
            fullWidth
            variant="outlined"
            color="primary"
            style={{ marginBottom: '10px' }}
          />
          <TextareaAutosize
            placeholder="Enter card content..."
            value={newCardContent}
            onChange={(e) => setNewCardContent(e.target.value)}
            style={{
              width: '100%',
              height: '60px',
              marginBottom: '10px',
              padding: '5px',
              borderRadius: '5px',
              resize: 'none',
              backgroundColor: '#444',
              color: '#fff',
            }}
          />
          <TextField
            select
            label="Label"
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
            fullWidth
            variant="outlined"
            color="primary"
            style={{ marginBottom: '20px' }}
          >
            <MenuItem value="Programming">Programming</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Coffee">Coffee</MenuItem>
            <MenuItem value="Gym">Gym</MenuItem>
            <MenuItem value="Study">Study</MenuItem>
          </TextField>
          <Button onClick={addCard} variant="contained" color="primary">
            Add Card
          </Button>
        </div>
      </Modal>
    </Paper>
  );
};

export default List;
