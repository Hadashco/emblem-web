import { connect } from 'react-redux';
import { addToActions } from '../../Store.js';
import 'whatwg-fetch';

const actions = {};

actions.addMarker = (previousState, data) => {
  const map = previousState.map;
  const markers = previousState.map.markers;
  const newMarker = markers.slice();
  newMarker.push(data);
  map.markers = newMarker;
  const newState = Object.assign({}, previousState, { map });
  console.log(data.position.lat(), 'dfasdasf');
  fetch('/place', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ lat: data.position.lat(), long: data.position.lng() }),
  });
  return newState;
};

actions.removeMarker = (previousState, data) => {
  const map = previousState.map;
  const markers = previousState.map.markers;
  const markerToRemove = markers.slice();
  markerToRemove.splice(data, 1);
  for (let i = 0; i < markerToRemove.length; i++) {
    markerToRemove[i].key = i;
  }
  map.markers = markerToRemove;
  const newState = Object.assign({}, previousState, { map });
  return newState;
};

const mapStateToProps = state => {
  return { markers: state.map.markers };
};

const mapDispatchToProps = dispatch => {
  return {
    addMarker: marker => {
      dispatch({ type: 'addMarker', data: marker });
    },
    removeMarker: index => {
      dispatch({ type: 'removeMarker', data: index });
    },
  };
};

addToActions(actions);

const connection = connect(mapStateToProps, mapDispatchToProps);
export { connection };
