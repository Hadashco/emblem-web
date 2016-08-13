import React from 'react';
import { Button } from 'react-bootstrap';
import { connection } from './uploadState.js';

class UploadButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <Button bsStyle='success' onClick={this.props.switchUploadModalState}>{ this.props.text }</Button>
	}
}

export default connection(UploadButton);
