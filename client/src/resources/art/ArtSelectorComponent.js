import React from 'react';
import Modal from 'react-modal';
import ArtViewer from './ArtViewer.js';
import UploadButton from './../upload/UploadButton.js';
import { connection } from './../upload/uploadState.js';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.74902)'
  },
  content: {
    position: 'relative',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid rgb(204, 204, 204)',
    overflow: 'auto',
    borderRadius: '4px',
    padding: '20px',
    background: 'rgb(255, 255, 255)',
    width: '90%'
  }
};

class ArtComponent extends React.Component {
	constructor(props) {
		super(props);
    console.log(props)
    this.showPhoto = this.showPhoto.bind(this);
  }
    
    showPhoto(id) {
      console.log(this.props);
      this.props.photoClick(id);
    }

  render() {
    let source = '/storage/art/' + this.props.art + '/' + this.props.art + '_FULL';
    return <img onClick={() => this.showPhoto(this.props.art)} src={source} className='artPiece' />;
  }
}

class ArtSelector extends React.Component {
    constructor(props) {
      super(props);
      
      this.art = [{id: 12}, {id: 13}, {id: 14}]//this.props.files.splice(12, this.props.files.length-13);
    }

    componentDidMount() {
      this.props.populateArtFiles();
    }


    render() {
      console.log(this.art, 'jdsa');
      var context = this;
      return (
        <Modal
          isOpen={this.props.modalState}
          style={ customStyles }>
          <div className='artContainer col-xs-2'>
            {context.art.map(num => <div><ArtComponent photoClick={this.props.updateCurrentArt} art={num.id} /><br/></div>)}
          </div>
          <ArtViewer art={this.props.currentArt} />
          <div className='col-xs-12' style={{paddingRight: 0}}>
            <UploadButton className='col-xs-1 col-xs-offset-10' class='ArtModalButton' text='close' btn-mad clearfix form-control/>
          </div>
        </Modal>
      );
    }
}

export default connection(ArtSelector);