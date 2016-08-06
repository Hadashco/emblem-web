import {createStore} from 'redux';

var actions = {};

// actions object where keys are action names and value is action
var defaultState = {
    map: {
        markers: []
    }
};

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

var store = createStore(reducer);

export {store, addToActions};