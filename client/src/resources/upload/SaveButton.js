import React from 'react';
import UploadButton from './UploadButton.js';
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
    return <UploadButton bsStyle="success" text="Save" clickFunc={this.onSave} />;
  }
}

SaveButton.propTypes = {
  emptyToUploadFiles: React.PropTypes.func,
  toUpload: React.PropTypes.array,
  uploadFiles: React.PropTypes.func,
};

export default connection(SaveButton);
