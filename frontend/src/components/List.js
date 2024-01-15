// frontend/src/components/List.js
import React, { useState } from 'react';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Modal from 'react-modal';
import './List.scss';

const List = ({ title, moveList }) => {
  const [cards, setCards] = useState([]);
  const [newCardText, setNewCardText] = useState('');
  const [newCardContent, setNewCardContent] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('Programming');
  const [listHeight, setListHeight] = useState(80); // Altura inicial de la lista

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
      setListHeight(listHeight + 40); // Ajustar la altura de la lista al agregar una tarjeta
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
    <div ref={drop} className="list-container" style={{ minHeight: listHeight + 'px' }}>
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
          <Card
            key={card.id}
            title={card.title}
            content={card.content}
            label={card.label}
            labelColor={card.labelColor} // Asegurémonos de pasar el color de fondo a la tarjeta
            onDelete={() => deleteCard(card.id)}
          />
        ))}
      </div>
      <div className="add-card">
        <button onClick={() => setIsAddingCard(true)} style={{ height: '40px', width: '40px' }}>
          +
        </button>
      </div>
      <Modal
        isOpen={isAddingCard}
        onRequestClose={() => setIsAddingCard(false)}
        contentLabel="Add Card"
        ariaHideApp={false}
        style={{
          content: {
            width: '300px',
            height: '300px',
            margin: 'auto',
            borderRadius: '8px',
            padding: '20px',
          },
        }}
      >
        <div>
          <h2>Add Card</h2>
          <label>Title:</label>
          <input
            type="text"
            value={newCardText}
            onChange={(e) => setNewCardText(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <label>Content:</label>
          <textarea
            placeholder="Enter card content..."
            value={newCardContent}
            onChange={(e) => setNewCardContent(e.target.value)}
            style={{ width: '100%', height: '60px', marginBottom: '10px' }}
          />
          <label>Label:</label>
          <select
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
            style={{ width: '100%', marginBottom: '20px' }}
          >
            <option value="Programming">Programming</option>
            <option value="Food">Food</option>
            <option value="Coffee">Coffee</option>
            <option value="Gym">Gym</option>
            <option value="Study">Study</option>
          </select>
          <button onClick={addCard}>Add Card</button>
        </div>
      </Modal>
    </div>
  );
};

export default List;
