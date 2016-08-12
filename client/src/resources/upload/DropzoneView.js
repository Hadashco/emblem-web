import React from 'react';
import Dropzone from 'react-dropzone';
import { Button } from 'react-bootstrap';
import 'whatwg-fetch';

export default class DropzoneView extends React.Component {
  constructor() {
    super();

    this.state = {
      files: [],
    };

    this.onDrop = this.onDrop.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onDrop(files) {
    this.setState({
      files: this.state.files.concat(files),
    });
  }

  onSave() {
    const fileReader = [];
    this.state.files.forEach(file => {
      fileReader.push(new FileReader(file));
    });

    fetch('/art', {
      method: 'POST',
      body: fileReader,
    });
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Drop some files here to test</div>
        </Dropzone>
        <Button bsStyle='primary' onClick={this.onSave}>Save</Button>
      </div>
    );
  }
}
