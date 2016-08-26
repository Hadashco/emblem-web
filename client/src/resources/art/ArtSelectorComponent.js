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
    backgroundColor: 'rgba(239, 249, 245, 0.74902)',
    zIndex: 15,
    overflow: 'auto',
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
    background: 'rgba(255, 255, 255, .7)',
    width: '90%',
  },
};

class ArtComponent extends React.Component {
  constructor(props) {
    super(props);
    this.showPhoto = this.showPhoto.bind(this);
  }

  showPhoto(id) {
    this.props.photoClick(id);
  }

  render() {
    let source = `https://s3.amazonaws.com/hadashco-emblem/${this.props.art}`;
    return (
      <img
        onClick={() => this.showPhoto(this.props.art)}
        src={source} className="artPiece"
        role="presentation"
      />);
  }
}

class ArtSelector extends React.Component {
  constructor(props) {
    super(props);
    this.art = [];
  }

  componentDidMount() {
    this.props.populateArtFiles();
  }


  render() {
    this.art = this.props.files;
    const context = this;
    let artID = 0;
    return (
      <Modal
        className="ArtModal"
        isOpen={this.props.artModalState}
        style={customStyles}
      >
        <div className="artContainer col-xs-2">
          {context.art.map(() => {
            artID++;
            return (<div><ArtComponent
              photoClick={this.props.updateCurrentArt} art={artID}
            /><br /></div>); })}
        </div>
        <UploadButton class="ArtModalCloseButton" text="" btn-mad clearfix form-control />
        <ArtViewer art={this.props.currentArt} />
        <div className="col-xs-12" style={{ paddingRight: 0 }}>
          <UploadButton
            class="ArtModalUploadButton"
            text=""
            clickFunc={this.props.switchUploadModalState}
            btn-mad clearfix form-control
          />
        </div>
      </Modal>
    );
  }
}

ArtComponent.propTypes = {
  photoClick: React.PropTypes.func,
  art: React.PropTypes.number,
};

ArtSelector.propTypes = {
  artModalState: React.PropTypes.bool,
  currentArt: React.PropTypes.number,
  files: React.PropTypes.array,
  populateArtFiles: React.PropTypes.func,
  switchUploadModalState: React.PropTypes.func,
  updateCurrentArt: React.PropTypes.func,
};

export default connection(ArtSelector);
