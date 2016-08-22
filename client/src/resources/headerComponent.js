import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddMarkerButton from './map/AddMarkerButton.js';
import FacebookButton from './authentication/fbookButtonView';
import UploadButton from './upload/UploadButton.js';
import Logout from './authentication/LogoutButton.js';
import { connection } from './headerState.js';



export default class headerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
            <ButtonToolbar className='headerButtonToolbar buttonToolbar'>
              <UploadButton text='Art Library' />
              <Logout />
            </ButtonToolbar>
        <h1><i>Emblem</i></h1>
      </div>
    );
  }
}

export default connection(headerComponent);