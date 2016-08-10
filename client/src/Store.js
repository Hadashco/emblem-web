import { createStore } from 'redux';
import { actions } from './Actions.js';

// actions object where keys are action names and value is action
const defaultState = {
  map: {
    markers: [],
  },
};

var actiones = actions;

var reducer = function(previousState = defaultState, action) {
    if (actiones[action.type]) {
        return actiones[action.type](previousState, action.data);
    } else {
        console.warn(`action ${action.type} does not exist`);
        return previousState;
    }
}

var addToActions = function(newActions) {
    actiones = Object.assign({}, actiones, newActions);
}

const store = createStore(reducer);

export { store, addToActions };