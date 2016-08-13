import React from 'react';
import Modal from 'react-modal';
import { Button, ButtonToolbar } from 'react-bootstrap';
import {connection} from './uploadState.js';
import UploadButton from './UploadButton.js';
import DropzoneView from './DropzoneView';
import SaveButton from './SaveButton.js';


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
          <ButtonToolbar>
            <SaveButton />
            <UploadButton text='Close'/>
          </ButtonToolbar>
        </Modal>
      </span>
    );
  }
}

export default connection(UploadView);
