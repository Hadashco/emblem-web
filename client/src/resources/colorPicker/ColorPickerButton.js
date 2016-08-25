import React from 'react';
import UploadButton from './../upload/UploadButton.js';
import { connection } from './../headerState.js';

class ColorPickerButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    this.props.handleColorPickerDisplay();
  }

  render() {
    return (
      <UploadButton
        className="colorPickerButton"
        clickFunc={this.props.func || this.handleClick}
        text={this.props.text || 'Pick Your Color'}
      />
    );
  }
}

export default connection(ColorPickerButton);
