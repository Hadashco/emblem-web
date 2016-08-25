import React from 'react';
import { Button } from 'react-bootstrap';
import { connection } from './uploadState.js';

class UploadButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button
        id="Button"
        className={this.props.class || this.props.className}
        onClick={this.props.clickFunc || this.props.switchArtModalState}
      >
        {this.props.text}
      </Button>); }
}

UploadButton.propTypes = {
  class: React.PropTypes.string,
  className: React.PropTypes.string,
  clickFunc: React.PropTypes.func,
  switchArtModalState: React.PropTypes.func,
  text: React.PropTypes.string,
};

export default connection(UploadButton);
