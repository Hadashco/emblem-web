import React from 'react';
import { Button } from 'react-bootstrap';
import UploadButton from './UploadButton.js'
import { connection } from './uploadState.js';

class SaveButton extends React.Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    this.props.uploadFiles(this.props.toUpload);
    this.props.emptyToUploadFiles();
  }

  render() {
    return <UploadButton bsStyle='success' text='Save' clickFunc={this.onSave} />
  }
}

export default connection(SaveButton);
