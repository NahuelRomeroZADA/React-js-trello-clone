import { createStore, combineReducers } from 'redux';
import listsReducer from './reducers/listsReducer';

const rootReducer = combineReducers({
  lists: listsReducer,
  // Puedes agregar más reducers según sea necesario.
});

const store = createStore(rootReducer);

export default store;