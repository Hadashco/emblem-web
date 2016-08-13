import React from 'react';
import { Button } from 'react-bootstrap';
import { connection } from './uploadState.js';

class SaveButton extends React.Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    this.props.uploadFiles(this.props.toUpload[0]);
    this.props.emptyToUploadFiles();
  }

  render() {
    return <Button bsStyle='success' onClick={this.onSave}>Save</Button>
  }
}

export default connection(SaveButton);
