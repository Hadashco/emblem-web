// global actions shared across application
let actions = {};

/****************************************************************

                         AUTHENTICATION

*****************************************************************/

actions.changeAuth = (previousState) => {
  const auth = Object.assign({}, previousState.auth);
  const isAuthorized = previousState.auth.isAuthorized;
  const newAuth = !isAuthorized;
  auth.isAuthorized = newAuth;
  const newState = Object.assign({}, previousState, { auth });
  return newState;
};

/****************************************************************

                                COLOR ACTIONS

*****************************************************************/

actions.handleColorPickerDisplay = (previousState) => {
  const color = Object.assign({}, previousState.color);
  const displayColorPicker = previousState.color.displayColorPicker;
  const newDisplayColorPickerState = !displayColorPicker;
  color.displayColorPicker = newDisplayColorPickerState;
  const newState = Object.assign({}, previousState, { color });
  return newState;
};

actions.updateCurrentColor = (previousState, data) => {
  const color = previousState.color;
  const newColor = data;
  color.currentColor = newColor;
  const newState = Object.assign({}, previousState, { color });
  return newState;
};

/****************************************************************

                                MAP ACTIONS

*****************************************************************/


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

actions.populateMarkers = (previousState, data) => {
  const map = previousState.map;
  const markers = previousState.map.markers;
  const newFiles = markers.slice();
  data.forEach(dataChunk => {
    newFiles.push(dataChunk);
  });
  map.markers = newFiles;
  const newState = Object.assign({}, previousState, { map });
  return newState;
};

/****************************************************************

                            UPLOAD ACTIONS

*****************************************************************/


actions.switchUploadModalState = (previousState) => {
  const upload = previousState.upload;
  const uploadModalState = previousState.upload.modalState;
  const newModalState = !uploadModalState;
  upload.modalState = newModalState;
  const newState = Object.assign({}, previousState, { upload });
  return newState;
};

actions.switchArtModalState = (previousState) => {
  const upload = previousState.upload;
  const artModalState = previousState.upload.artModalState;
  const newModalState = !artModalState;
  upload.artModalState = newModalState;
  const newState = Object.assign({}, previousState, { upload });
  return newState;
};

actions.uploadFiles = (previousState, data) => {
  const upload = previousState.upload;
  const files = previousState.upload.files;
  const newFiles = files.slice();
  data.forEach(dataChunk => {
    newFiles.push(dataChunk);
  });
  upload.files = newFiles;
  const newState = Object.assign({}, previousState, { upload });
  return newState;
};

actions.addDragAndDropFiles = (previousState, data) => {
  const upload = previousState.upload;
  const toUpload = previousState.upload.toUpload;
  const newFiles = toUpload.slice();
  newFiles.push(data);
  upload.toUpload = newFiles;
  const newState = Object.assign({}, previousState, { upload });
  return newState;
};

actions.emptyToUploadFiles = (previousState) => {
  const upload = previousState.upload;
  const newUpload = [];
  upload.toUpload = newUpload;
  const newState = Object.assign({}, previousState, { upload });
  return newState;
};

actions.populateArtFiles = (previousState, data) => {
  const upload = previousState.upload;
  const files = previousState.upload.files;
  const newFiles = files.slice();
  data.forEach(dataChunk => {
    newFiles.push(dataChunk);
  });
  upload.files = newFiles;
  const newState = Object.assign({}, previousState, { upload });
  return newState;
};

actions.updateCurrentArt = (previousState, data) => {
  const upload = previousState.upload;
  const newUpload = data;
  upload.currentArt = newUpload;
  const newState = Object.assign({}, previousState, { upload });
  return newState;
};

export { actions };
