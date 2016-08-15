import React from 'react';
import { Button } from 'react-bootstrap';
import { connection } from './uploadState.js';

class UploadButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <Button id='Button' className={this.props.class || this.props.className} onClick={this.props.clickFunc || this.props.switchArtModalState}>{ this.props.text }</Button>
	}
}

export default connection(UploadButton);
