import React from 'react';
import { Button } from 'react-bootstrap';
import { connection } from './MapModel.js';

class AddMarkerButton extends React.Component {
  constructor(props) {
    super(props);
    this.setMarkerAddState = this.setMarkerAddState.bind(this);
  }

  setMarkerAddState() {
    this.props.addMarkerToMapStateSwitch();
  }

  render() {
    return <Button className='addMarkerButton' bsStyle='danger' onClick={this.setMarkerAddState}>Add Art</Button>
  }
}

export default connection(AddMarkerButton);