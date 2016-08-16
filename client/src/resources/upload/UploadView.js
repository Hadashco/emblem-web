import React from 'react';
import Modal from 'react-modal';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { connection } from './uploadState.js';
import UploadButton from './UploadButton.js';
import DropzoneView from './DropzoneView';
import SaveButton from './SaveButton.js';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.74902)',
    zIndex: 2
  }
}

class UploadView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className='modalButton'>
        <Modal
          isOpen={this.props.modalState}
          style={ customStyles }
        >
          <h2>Upload Art</h2>
          <DropzoneView />
          <ButtonToolbar>
            <SaveButton />
            <UploadButton text='Close' clickFunc={this.props.switchUploadModalState} />
          </ButtonToolbar>
        </Modal>
      </span>
    );
  }
}

export default connection(UploadView);
