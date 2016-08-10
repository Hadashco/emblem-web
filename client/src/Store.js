import { createStore } from 'redux';

let actions = {};

// actions object where keys are action names and value is action
const defaultState = {
  map: {
    markers: [],
  },
};

const reducer = (previousState = defaultState, action) => {
  if (actions[action.type]) {
    return actions[action.type](previousState, action.data);
  } else {
    console.warn(`action ${action.type} does not exist`);
    return previousState;
  }
};

const addToActions = newActions => {
  actions = Object.assign({}, actions, newActions);
};

const store = createStore(reducer);

export { store, addToActions };