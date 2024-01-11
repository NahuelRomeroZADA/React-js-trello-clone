export const addCard = (listId, text) => ({
    type: 'ADD_CARD',
    payload: { listId, text },
  });