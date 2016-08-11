import React from 'react';
import Dropzone from 'react-dropzone';

export default class DropletView extends React.Component {
  constructor() {
    super();

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    console.log('Files:', files);
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Drop some files here to test</div>
        </Dropzone>
      </div>
    );
  }
}
