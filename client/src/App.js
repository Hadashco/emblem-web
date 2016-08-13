import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';
import MapView from './resources/map/MapView.js';
import AddMarkerButton from './resources/map/AddMarkerButton.js';
import LoginView from './resources/authentication/LoginView';
import Header from './resources/headerComponent.js';
import { Provider } from 'react-redux';
import { store } from './Store.js';
import { socket } from './Socket';
import FacebookButton from './resources/authentication/fbookButtonView';
import UploadView from './resources/upload/UploadView';
import ArtSelectorComponent from './resources/art/ArtSelectorComponent.js';

class Dashboard extends React.Component {

  render() {
    return (
      <div className="main">
        <div className="headerContainer">
          <Header />
          <UploadView />
          <ArtSelectorComponent />
        </div>
        <div className="container">
          <div className="mapContainer"><MapView /></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Provider store={store}><Dashboard/></Provider>, document.querySelector('#app'));
