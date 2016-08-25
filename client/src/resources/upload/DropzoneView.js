import React from 'react';
import Dropzone from 'react-dropzone';
import { connection } from './uploadState.js';

const dropZoneStyles = {
  position: 'relative',
  left: `${5}%`,
  width: `${90}%`,
  height: `${50}%`,
  border: 'dashed 1px black',
  marginBottom: `${5}px`,
};

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
      <span>
        <Dropzone onDrop={this.dropFile} style={dropZoneStyles}>
          <div>Drop files here to upload</div>
        </Dropzone>
      </span>
    );
  }
}

DropzoneView.propTypes = {
  addDragAndDropFiles: React.PropTypes.func,
};

export default connection(DropzoneView);
