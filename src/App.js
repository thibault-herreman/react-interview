import './App.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import movies from './reducers/movies';
import category from './reducers/category';
import Home from './components/Home';

// création du store
const store = createStore(combineReducers({ movies, category }));

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
