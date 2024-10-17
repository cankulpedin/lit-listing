import { createStore } from 'redux';
import { reducer } from './reducer.js';

export const saveState = state => {
  let stringifiedState = JSON.stringify(state);
  localStorage.setItem('STORE_KEY', stringifiedState);
};
export const loadState = () => {
  let json = localStorage.getItem('STORE_KEY') || '{"employees":[]}';

  let state = JSON.parse(json);

  if (state) {
    return state;
  } else {
    return undefined; // To use the defaults in the reducers
  }
};

export const store = createStore(reducer, loadState());

store.subscribe(() => {
  saveState(store.getState());
});
