// frontend/src/components/Card.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const Card = ({ title, content, label, labelColor, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { type: ItemTypes.CARD, title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const cardStyle = {
    backgroundColor: labelColor, // Usamos labelColor directamente
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative', // Establecemos posición relativa para posicionar elementos internos
  };

  const titleStyle = {
    color: labelColor, // Color del texto del título igual al color de la etiqueta
    margin: '0', // Eliminamos el margen
    position: 'absolute', // Establecemos posición absoluta para posicionar en la esquina superior izquierda
    top: '5px', // Posicionamos en la parte superior con un pequeño margen superior
    left: '5px', // Posicionamos en la parte izquierda con un pequeño margen izquierdo
  };

  const contentStyle = {
    color: 'black', // Color del texto del contenido
  };

  const contentContainerStyle = {
    backgroundColor: 'white', // Fondo blanco para el contenido
    borderRadius: '8px', // Bordes redondeados para el contenido
    padding: '5px', // Padding para el contenido
    minHeight: '50px', // Altura mínima del contenedor del contenido
    position: 'relative', // Establecemos posición relativa para posicionar elementos internos
  };

  const deleteButtonStyle = {
    position: 'absolute', // Establecemos posición absoluta para posicionar en la esquina inferior derecha
    bottom: '5px', // Posicionamos en la parte inferior con un pequeño margen inferior
    right: '5px', // Posicionamos en la parte derecha con un pequeño margen derecho
  };

  return (
    <div ref={drag} className={`card ${isDragging ? 'dragging' : ''}`} style={cardStyle}>
      <div style={contentContainerStyle}>
        <h3 style={titleStyle}>{title}</h3>
        {content && (
          <div>
            <p style={contentStyle}>{content}</p>
            <button style={deleteButtonStyle} onClick={onDelete}>
              Delete
            </button>
          </div>
        )}
        {!content && (
          <button style={deleteButtonStyle} onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
