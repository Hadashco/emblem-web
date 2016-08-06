import React from 'react';
import ReactDOM from 'react-dom';
import MapView from './resources/map/MapView';
import Header from './resources/headerComponent.js'
import {Provider} from 'react-redux';
import {store} from './Store.js';
import Socket from './Socket';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    addMarker(latLong) {
        console.log(latLong);
    }

    render() {
        return (
        <div>
            <Header />
            <div className='mapUserContainer'>
                <div className='container'>Hello World</div>
                <MapView />
                <button onClick={this.addMarker('marker added')}>Add a Marker!</button>
            </div>
        </div>
        );
    }
}
ReactDOM.render(<Provider store={store}><Dashboard/></Provider>, document.querySelector('#app'));
