import React from 'react';
import Modal from 'react-modal';
import ColorPickerButton from './ColorPickerButton.js';
import ColorSettingButton from './ColorSettingButton.js';
import { SketchPicker } from 'react-color';
import { connection } from './../headerState.js';

const customStyles = {
  overlay: {
    position: 'fixed',
    height: 360 + 'px',
    width: 320 + 'px',
    top: 15 + '%',
    left: 35 + '%',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(239, 249, 245, 0.74902)',
    zIndex: 150,
    overflow: 'auto'
  }
}


class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(color) {
    console.log(this.props)
    console.log(color.hex)
    this.props.updateCurrentColor(color.hex);
  };

  handleClose() {
    this.props.handleColorPickerDisplay();
  };

  render() {
    return (
      <Modal
          className='ColorModal'
          isOpen={this.props.displayColorPicker}
          style={customStyles}>
      { this.props.displayColorPicker ? 
        <div id="popover">
        {console.log("opened!")}
          <div onClick={ this.handleClose }/>
          <SketchPicker color={ this.props.currentColor } onChange={ this.handleChange } />
          <ColorSettingButton />
          <ColorPickerButton class='colorCloser' text='Close'/>
          </div> : null }
    </Modal>
    )
  }
}

export default connection(ColorPicker);
