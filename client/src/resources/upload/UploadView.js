import React from 'react';
import Modal from 'react-modal';
import { Button, ButtonToolbar } from 'react-bootstrap';
import {connection} from './uploadState.js';
import DropletView from './DropletView';
import UploadButton from './UploadButton.js';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class UploadView extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   modalIsOpen: false,
    // };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    // this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references now sync'd, can be accessed
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    // this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <span className='modalButton'>
        <Button bsStyle="success" onClick={this.openModal}>Open Modal</Button>
        <Modal
          isOpen={this.props.modalState}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <h2>Upload Art</h2>
          <DropletView />
          <UploadButton />
        </Modal>
      </span>
    );
  }
}

export default connection(UploadView);
