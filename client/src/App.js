import React from 'react';
import ReactDOM from 'react-dom';
import MapView from './resources/map/MapView';
import LoginView from './resources/authentication/LoginView';
import Header from './resources/headerComponent.js';
import { Provider } from 'react-redux';
import { store } from './Store.js';
import Socket from './Socket';
import FacebookButton from './resources/authentication/fbookButtonView';

class Dashboard extends React.Component {

  addMarker(latLong) {
    console.log(latLong);
  }

  render() {
    return (
      <div>
        <Header />
          <div className="container">Welcome to <i>Emblem</i></div>
          <FacebookButton fb={FB} />
      </div>
    );
  }
}

ReactDOM.render(<Provider store={store}><Dashboard/></Provider>, document.querySelector('#app'));
