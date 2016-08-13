import React from 'react';
import Modal from 'react-modal';
import { connection } from './../upload/uploadState.js';


class ArtComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
    let source = '/storage/art/' + this.props.art + '/' + this.props.art + '_FULL'
    return (<img className='artPiece' src={source} />);
	}
}

class ArtSelector extends React.Component {
	// box component with many different Art components inside it
	// grabs all art from call to server for art pieces
    // loop through art piece array and create new art
    //component for each one
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.props.populateArtFiles();
    }

    render() {
      var art = this.props.files.splice(12, this.props.files.length-13);
      console.log(this.props.files);
      return (
        <Modal
          isOpen={false}>
          <div className='artContainer'>
          {art.map(num => <ArtComponent art={num.id}/>)}
          </div>
        </Modal>
      );
    }
}

export default connection(ArtSelector);