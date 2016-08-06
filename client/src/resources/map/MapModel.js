import {connect} from 'react-redux';
import {addToActions} from '../../Store.js';

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

actions.postToServer = function(previousState, data) {
    
}

var mapStateToProps = function(state) {
    return {markers: state.map.markers};
};

var mapDispatchToProps = function(dispatch) {
    return {addMarker: function(marker) {
        dispatch({type: 'addMarker', data: marker});
    }, removeMarker: function(index) {
        dispatch({type: 'removeMarker', data: index})
    }, postToServer: function() {
        dispatch({type: 'postToServer', data: post})}
};


addToActions(actions);

var connection = connect(mapStateToProps, mapDispatchToProps);
export {connection};