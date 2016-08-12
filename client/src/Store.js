import { createStore } from 'redux';
import { actions as globalActions } from './actions.js';

// actions object where keys are action names and value is action
const defaultState = {
  map: {
    markers: [],
    addMarkerToMapState: false,
  },
  upload: {
    modalState: false,
  },
};

let actions = Object.assign({}, globalActions);

const reducer = (previousState = defaultState, action) => {
  if (actions[action.type]) {
    return actions[action.type](previousState, action.data);
  } else {
    console.warn(`action ${action.type} does not exist`);
    return previousState;
  }
};

const addToActions = (newActions) => {
  actions = Object.assign({}, actions, newActions);
};

const store = createStore(reducer);

export { store, addToActions };
