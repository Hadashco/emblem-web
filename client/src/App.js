import React from 'react';
import ReactDOM from 'react-dom';
import MapView from './resources/map/MapView.js';
import LoginView from './resources/authentication/LoginView';
import Header from './resources/headerComponent.js';
import { Provider } from 'react-redux';
import { store } from './Store.js';
import { socket } from './Socket';
import UploadView from './resources/upload/UploadView';
import ArtSelectorComponent from './resources/art/ArtSelectorComponent.js';
import InfoPage from './resources/stateless/InfoPage.js';

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
          <div className="infoContainer"><InfoPage /></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Provider store={store}><Dashboard/></Provider>, document.querySelector('#app'));
