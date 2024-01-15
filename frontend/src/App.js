import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/App.scss';
import List from './components/List';
// import { ItemTypes } from './components/ItemTypes';

function App() {
  const [lists, setLists] = useState(['To Do', 'In Progress', 'Done']);

  const addList = () => {
    const newListTitle = prompt('Enter the title for the new list:');
    if (newListTitle) {
      setLists([...lists, newListTitle]);
    }
  };

  const deleteList = (listTitle) => {
    const updatedLists = lists.filter((title) => title !== listTitle);
    setLists(updatedLists);
  };

  const moveList = (draggedTitle, dropTargetTitle) => {
    // Implementa la lógica para mover la lista a otro contenedor
    const updatedLists = [...lists];
    const draggedIndex = updatedLists.findIndex((title) => title === draggedTitle);
    const dropTargetIndex = updatedLists.findIndex((title) => title === dropTargetTitle);
    updatedLists.splice(draggedIndex, 1);
    updatedLists.splice(dropTargetIndex, 0, draggedTitle);
    setLists(updatedLists);
  };

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <div className="board">
            {lists.map((title) => (
              <List
                key={title}
                title={title}
                moveList={(dropTargetTitle) => moveList(title, dropTargetTitle)}
                deleteList={() => deleteList(title)}
              />
            ))}
            <button onClick={addList}>Add List</button>
          </div>
        </div>
      </DndProvider>
    </Provider>
  );
}

export default App;
