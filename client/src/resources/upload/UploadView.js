import React from 'react';
import Modal from 'react-modal';
import { Button, ButtonToolbar } from 'react-bootstrap';
import {connection} from './uploadState.js';
import UploadButton from './UploadButton.js';
import DropzoneView from './DropzoneView';


class UploadView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className='modalButton'>
        <Modal
          isOpen={this.props.modalState}
        >
          <h2>Upload Art</h2>
          <DropzoneView />
          <UploadButton text='Close'/>
        </Modal>
      </span>
    );
  }
}

export default connection(UploadView);
