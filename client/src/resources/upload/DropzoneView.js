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

  // TODO: Add preview
  //       https://github.com/okonet/react-dropzone
  //       http://reactdropzone.azurewebsites.net/example/
  render() {
    return (
      <div>
        <Dropzone onDrop={this.dropFile}>
          <div>Drop files here to upload</div>
        </Dropzone>
        {this.props.toUpload.length > 0 ? <div>
        <h2>Uploading {this.props.toUpload.length} files...</h2>
        <div>{this.props.toUpload.map((file) => <img src={file.preview} /> )}</div>
        </div> : null}
      </div>
    );
  }
}

export default connection(DropzoneView);
