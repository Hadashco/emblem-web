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
    height: 500 + 'px',
    width: 600 + 'px',
    top: 70,
    left: 150,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(239, 249, 245, 0.74902)',
    zIndex: 2,
    overflow: 'auto'
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
