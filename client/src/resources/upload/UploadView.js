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
    height: 80 + '%',
    width: 75 + '%',
    top: 7.5 + '%',
    left: 10 + '%',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(239, 249, 245, 0.74902)',
    zIndex: 150,
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
          <h2 className='uploadHeader'>Upload Art</h2>
          <DropzoneView />
          <ButtonToolbar className='uploadButtonToolbar'>
            <SaveButton />
            <UploadButton text='Close' clickFunc={this.props.switchUploadModalState} />
          </ButtonToolbar>
          {this.props.toUpload.length > 0 ? <span>
          <h2>Uploading {this.props.toUpload.length} files...</h2>
          <span className='preview'>
            {this.props.toUpload.map((file) => {
              return (
                <img src={file[0].preview}/>
                )
            })}</span>
            </span> : null}
        </Modal>
      </span>
    );
  }
}

export default connection(UploadView);
