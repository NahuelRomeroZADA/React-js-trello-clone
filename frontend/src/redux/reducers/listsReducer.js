const initialState = [];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return [...state, { id: Date.now(), title: action.payload.title, cards: [] }];

    case 'ADD_CARD':
      return state.map((list) =>
        list.id === action.payload.listId
          ? { ...list, cards: [...list.cards, { id: Date.now(), text: action.payload.text }] }
          : list
      );

    default:
      return state;
  }
};

export default listsReducer;