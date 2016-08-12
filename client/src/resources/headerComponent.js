import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddMarkerButton from './map/AddMarkerButton.js';
import FacebookButton from './authentication/fbookButtonView';
import UploadButton from './upload/UploadButton.js'


export default function headerComponent(props) {
  return (
    <div className="header">
      <h1>Welcome to <i>Emblem</i></h1>
      <ButtonToolbar className='buttonToolbar'>
      	<AddMarkerButton />
      	<UploadButton text='Upload Art'/>
      	<FacebookButton />
      </ButtonToolbar>
    </div>
  );
}
