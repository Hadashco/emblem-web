
import React from 'react';
import ReactDOM from 'react-dom';
import MapView from './resources/map/MapView'

const Dashboard = function() {
    // render() {
        return (
        <div>
            <div className='container'>Hello World</div>
            <MapView markers={[{key:0, position:{ lat: 37.754862, lng: -122.431558 }}]}/>
        </div>
        );
        
    // }
}

ReactDOM.render(<Dashboard />, document.querySelector('#app')); 
