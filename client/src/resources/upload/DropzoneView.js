import React from 'react';
import Dropzone from 'react-dropzone';
import 'whatwg-fetch';

export default class DropletView extends React.Component {
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
        <button onClick={this.onSave}>Save</button>
      </div>
    );
  }
}
