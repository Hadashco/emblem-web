// global actions shared across application
let actions = {};

// MAP ACTIONS
actions.addMarker = (previousState, data) => {
  const map = previousState.map;
  const markers = previousState.map.markers;
  const newMarker = markers.slice();
  newMarker.push(data);
  map.markers = newMarker;
  const newState = Object.assign({}, previousState, { map });
  return newState;
};

actions.addMarkerToMapStateSwitch = (previousState) => {
  const map = previousState.map;
  const addMarkerToMapState = previousState.map.addMarkerToMapState;
  const newMarkerAddState = !addMarkerToMapState;
  map.addMarkerToMapState = newMarkerAddState;
  const newState = Object.assign({}, previousState, { map });
  return newState;
};

// UPLOAD ACTIONS
actions.switchUploadModalState = (previousState) => {
  let upload = previousState.upload;
  let uploadModalState = previousState.upload.modalState;
  let newModalState = !uploadModalState;
  upload.modalState = newModalState;
  let newState = Object.assign({}, previousState, { upload });
  return newState;
};

export { actions };
