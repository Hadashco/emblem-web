import { createStore } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import { actions as globalActions } from './Actions.js';

// actions object where keys are action names and value is action
let defaultState = {
  auth: {
    isAuthorized: false,
  },
  map: {
    markers: [],
    addMarkerToMapState: false,
  },
  upload: {
    modalState: false,
    artModalState: false,
    currentArt: 1,
    toUpload: [],
    files: [],
  },
  color: {
    displayColorPicker: false,
    currentColor: '#000000',
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

const store = createStore(reducer, undefined, autoRehydrate());
persistStore(store).purge(['map', 'upload']);


export { store, addToActions };
