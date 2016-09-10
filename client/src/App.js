import React from 'react';
import ReactDOM from 'react-dom';
import MapView from './resources/map/MapView.js';
import Header from './resources/headerComponent.js';
import { Provider } from 'react-redux';
import { store } from './Store.js';
import { socket } from './Socket';
import UploadView from './resources/upload/UploadView';
import ArtSelectorComponent from './resources/art/ArtSelectorComponent.js';
import AlertContainer from 'react-alert';
import ColorPicker from './resources/colorPicker/colorPicker.js';
import LoginView from './resources/login/LoginView.js';
import { Router, Route, browserHistory } from 'react-router';
import 'whatwg-fetch';


const alertOptions = {
  offset: 30,
  position: 'top right',
  theme: 'light',
  time: 3000,
  transition: 'fade',
};

class Dashboard extends React.Component {

  render() {
    return (
      <div className="main">
        <div className="headerContainer">
          <Header />
          <UploadView />
          <ArtSelectorComponent />
          <AlertContainer ref={(a) => global.msg = a} {...alertOptions} />
        </div>
        <div className="container">
          <ColorPicker />
          <div className="mapContainer"><MapView /></div>
        </div>
      </div>
    );
  }
}

// keep a leave hook on the login page route to ensure login succeeded
// before allowing them to render the main page

const requireAuth = () => {
  fetch('localhost:3000/auth/isAuth', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      ContentType: 'application/json',
    },
  }).then(response => {
    if (response.ok) {
      return true;
    }
    return false;
  });
};

ReactDOM.render(<Provider store={store}>
  <Router history={browserHistory}>
    <Route onLeave={requireAuth}>
      <Route path="/" component={LoginView} />
    </Route>
    <Route path="/home" component={Dashboard} />
  </Router>
</Provider>, document.querySelector('#app'));
