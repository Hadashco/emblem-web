import { connect } from 'react-redux';
import { addToActions } from '../../Store.js';
import 'whatwg-fetch';

const actions = {};

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
  return (
    { markers: state.map.markers,
      addMarkerToMapState: state.map.addMarkerToMapState,
      modalState: state.upload.modalState,
    }
  );
};

const mapDispatchToProps = dispatch => (
  {
    addMarker: marker => {
      const lat = marker.position.lat();
      const long = marker.position.lng();
      const sector = lat.toFixed(5) + long.toFixed(5);
      console.log('sector:', sector);
      fetch('/place', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat, long, sector }),
      }).then(response => {
        return response.json();
      });
    },
    removeMarker: index => {
      dispatch({ type: 'removeMarker', data: index });
    },
    addMarkerToMapStateSwitch: bool => {
      dispatch({ type: 'addMarkerToMapStateSwitch' });
    },
    switchUploadModalState: bool => {
      dispatch({ type: 'switchUploadModalState' });
    },
  }
);


addToActions(actions);

const connection = connect(mapStateToProps, mapDispatchToProps);
export { connection };
