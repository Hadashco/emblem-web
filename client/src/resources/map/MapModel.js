import { connect } from 'react-redux';
import { addToActions } from '../../Store.js';
import 'whatwg-fetch'

var actions = {};

actions.removeMarker = function(previousState, data) {
    var map = previousState.map;
    var markers = previousState.map.markers;
    var markerToRemove = markers.slice();
    markerToRemove.splice(data, 1);
    for (var i = 0; i < markerToRemove.length; i++) {
        markerToRemove[i].key = i;
    }
    map.markers = markerToRemove;
    var newState = Object.assign({}, previousState, {map: map});
    return newState;
}

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

var mapDispatchToProps = function(dispatch) {
    return {addMarker: function(marker) {
      fetch('/place', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({lat: marker.position.lat(), long: marker.position.lng()}),
    }).then(function(response) {
        return response.json();
    });
  },
     removeMarker: function(index) {
        dispatch({type: 'removeMarker', data: index})
    }
}};

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
