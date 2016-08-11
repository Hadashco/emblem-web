// global actions shared across application

var actions = {};

actions.addMarker = function(previousState, data) {
    var map = previousState.map;
    var markers = previousState.map.markers;
    var newMarker = markers.slice();
    newMarker.push(data);
    map.markers = newMarker;
    var newState = Object.assign({}, previousState, {map: map});
    return newState;
}

actions.addMarkerToMapStateSwitch = function(previousState) {
  var map = previousState.map;
  var addMarkerToMapState = previousState.map.addMarkerToMapState;
  var newMarkerAddState = !addMarkerToMapState;
  map.addMarkerToMapState = newMarkerAddState;
  var newState = Object.assign({}, previousState, {map: map});
  return newState;
}

export { actions }