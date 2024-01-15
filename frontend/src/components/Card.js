// frontend/src/components/Card.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Card = ({ title, content, label, labelColor, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { type: ItemTypes.CARD, title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Paper
      ref={drag}
      elevation={3}
      className={`card ${isDragging ? 'dragging' : ''}`}
      style={{
        backgroundColor: labelColor,
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: '5px', left: '5px' }}>
        <Typography variant="h6" style={{ color: labelColor, margin: '0' }}>
          {title}
        </Typography>
      </div>
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '5px',
          minHeight: '50px',
          position: 'relative',
        }}
      >
        {content && (
          <div>
            <Typography variant="body1" style={{ color: 'black' }}>
              {content}
            </Typography>
            <Button
              style={{ position: 'absolute', bottom: '5px', right: '5px' }}
              variant="outlined"
              color="secondary"
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        )}
        {!content && (
          <Button
            style={{ position: 'absolute', bottom: '5px', right: '5px' }}
            variant="outlined"
            color="secondary"
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default Card;
