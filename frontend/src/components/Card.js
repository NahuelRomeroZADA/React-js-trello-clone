// frontend/src/components/Card.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const Card = ({ text, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { type: ItemTypes.CARD, text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`card ${isDragging ? 'dragging' : ''}`}>
      <p>{text}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Card;
