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

var mapStateToProps = function(state) {
    return {markers: state.map.markers};
};

var mapDispatchToProps = function(dispatch) {
    return {addMarker: function(marker) {
        dispatch({type: 'addMarker', data: marker});
    }};
};


addToActions(actions);

var connection = connect(mapStateToProps, mapDispatchToProps);
export {connection};