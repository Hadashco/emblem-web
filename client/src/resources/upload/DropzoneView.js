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
          <div>Drop files here to upload</div>
        </Dropzone>
        {this.props.toUpload.length > 0 ? <div>
        <h2>Uploading {this.props.toUpload.length} files...</h2>
        <div className='preview'>
          {this.props.toUpload.map((file) => {
            return (
              <img src={file[0].preview}/>
              )
          })}</div>
          </div> : null}
      </div>
    );
  }
}

export default connection(DropzoneView);
