import  { connect } from 'react-redux';
import { addToActions } from '../../Store.js';

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
  {
    markers: state.map.markers,
    addMarkerToMapState: state.map.addMarkerToMapState,
    modalState: state.upload.modalState,
  });
};

const mapDispatchToProps = dispatch => (
  {
    addMarker: marker => {
      const lat = marker.position.lat();
      const long = marker.position.lng();
      const sector = lat.toFixed(5) + long.toFixed(5);
      fetch(`${process.env.HOST_SERVER}:3000/place`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          ContentType: 'application/json',
        },
        body: JSON.stringify({ lat, long, sector }),
      }).catch(() => {
        msg.show('Unauthorized access, please log in', {
          time: 5000,
          type: 'error',
        });
      }).then(response =>
        response.json()
      );
    },
    removeMarker: index => {
      dispatch({ type: 'removeMarker', data: index });
    },
    populateMarkers: () => {
      fetch(`${process.env.HOST_SERVER}:3000/place`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => response.json()).then(body => {
        dispatch({ type: 'populateMarkers', data: body });
      });
    },
    addMarkerToMapStateSwitch: () => {
      dispatch({ type: 'addMarkerToMapStateSwitch' });
    },
    switchUploadModalState: () => {
      dispatch({ type: 'switchUploadModalState' });
    },
    updateTopRankedUser: (data) => {
      dispatch({ type: 'updateTopRankedUser', data });
    },
  }
);


addToActions(actions);

const connection = connect(mapStateToProps, mapDispatchToProps);
export { connection };
