// frontend/src/components/List.js
import React, { useState } from 'react';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import './List.scss';

const List = ({ title, moveList }) => {
  const [cards, setCards] = useState([]);
  const [newCardText, setNewCardText] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  const addCard = () => {
    if (newCardText.trim() !== '') {
      setCards([...cards, { id: Date.now(), text: newCardText }]);
      setNewCardText('');
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
    accept: ItemTypes.CARD, // Cambia a ItemTypes.CARD o el tipo que estés utilizando
    drop: () => {
      moveList(title);
    },
  });

  return (
    <div ref={drop} className="list-container">
      <div className="list-header" onClick={handleTitleEdit}>
        {editingTitle ? (
          <input
            type="text"
            value={listTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            autoFocus
          />
        ) : (
          <h2>{listTitle}</h2>
        )}
      </div>
      <div className="cards-list">
        {cards.map((card) => (
          <Card style={{color: 'red'}} key={card.id} text={card.text} onDelete={() => deleteCard(card.id)} />
        ))}
      </div>
      <div className="add-card">
        <textarea
          placeholder="Enter card text..."
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
        />
        <button onClick={addCard}>Add Card</button>
      </div>
    </div>
  );
};

export default List;