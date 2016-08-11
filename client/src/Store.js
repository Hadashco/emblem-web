import { createStore } from 'redux';
import { actions as globalActions } from './Actions.js';

// actions object where keys are action names and value is action
const defaultState = {
  map: {
    markers: [],
    addMarkerToMapState: false
  },
};

var actions = Object.assign({}, globalActions);

var reducer = function(previousState = defaultState, action) {
    if (actions[action.type]) {
        return actions[action.type](previousState, action.data);
    } else {
        console.warn(`action ${action.type} does not exist`);
        return previousState;
    }
}

var addToActions = function(newActions) {
    actions = Object.assign({}, actions, newActions);
}

const store = createStore(reducer);

export { store, addToActions };