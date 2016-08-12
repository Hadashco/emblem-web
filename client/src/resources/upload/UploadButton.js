import React from 'react';
import { Button } from 'react-bootstrap';
import { connection } from './uploadState.js';

class UploadButton extends React.Component {
	constructor(props) {
		super(props);
		this.changeModalState = this.changeModalState.bind(this);
	}

	changeModalState() {
		this.props.switchUploadModalState();
	}

	render() {
		return <Button bsStyle='success' onClick={this.changeModalState}>{ this.props.text }</Button>
	}
}

export default connection(UploadButton);
