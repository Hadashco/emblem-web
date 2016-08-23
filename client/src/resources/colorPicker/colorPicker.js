import React from 'react';
import UploadButton from './../upload/UploadButton.js';
import { SketchPicker } from 'react-color';

class colorPicker extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
    };
  }


  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose() {
    this.setState({ displayColorPicker: false })
  };

  handleChange(color) {
    this.setState({ color: color.rgb })
  };

  render() {
    return (
      <div>
        <UploadButton clickFunc={ this.handleClick } text='Pick Your Color'/>
        { this.state.displayColorPicker ? <div is="popover">
          <div onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default colorPicker;