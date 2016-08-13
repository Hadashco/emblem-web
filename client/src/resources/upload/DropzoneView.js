import React from 'react';
import Dropzone from 'react-dropzone';
import { connection } from './uploadState.js';

class DropzoneView extends React.Component {
  constructor(props) {
    super(props);

    this.dropFile = this.dropFile.bind(this);
  }

  dropFile(file) {
    this.props.addDragAndDropFiles(file);
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.dropFile}>
          <div>Drop some files here to test</div>
        </Dropzone>
      </div>
    );
  }
}

export default connection(DropzoneView);
