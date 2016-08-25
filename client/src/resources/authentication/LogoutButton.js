import React from 'react';
import UploadButton from '../upload/UploadButton.js';
import { connection } from './../headerState.js';
import { browserHistory } from 'react-router';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    document.cookie = 'token=nil';
    this.props.changeAuth();
    browserHistory.push('/');
  }

  render() {
    return <UploadButton clickFunc={this.logout} text="Logout" />;
  }
}

export default connection(Logout);
