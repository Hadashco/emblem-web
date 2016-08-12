import { connect } from 'react-redux';
import { addToActions } from '../../Store.js';
import 'whatwg-fetch';

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

const mapStateToProps = state => {
  return { markers: state.map.markers, addMarkerToMapState: state.map.addMarkerToMapState };
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
    },
    addMarkerToMapStateSwitch: function(bool) {
      dispatch({type: 'addMarkerToMapStateSwitch'})
    }
}};


addToActions(actions);

const connection = connect(mapStateToProps, mapDispatchToProps);
export { connection };
