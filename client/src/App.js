import React from 'react';
import ReactDOM from 'react-dom';
import MapView from './resources/map/MapView.js';
import LoginView from './resources/authentication/LoginView';
import Header from './resources/headerComponent.js';
import ArtSelector from './resources/map/ArtSelectorComponent.js'
import { Provider } from 'react-redux';
import { store } from './Store.js';
import { socket } from './Socket';
import FacebookButton from './resources/authentication/fbookButtonView';

class Dashboard extends React.Component {

  render() {
    return (
      <div className="main">
        <div className="headerContainer">
          <Header />
          <div className="fbook-button"><FacebookButton /></div>
        </div>
        <div className="container">
          <div className="list">
            <ArtSelector />
          </div>
          <div className="mapContainer"><MapView /></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Provider store={store}><Dashboard/></Provider>, document.querySelector('#app'));
