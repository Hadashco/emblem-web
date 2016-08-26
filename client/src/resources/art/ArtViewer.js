import React from 'react';

export default class ArtViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let source;
    if (this.props.art.type === 'application/zip') {
      source = `assets/emblem.jpg`;
    } else {
      source = `https://s3.amazonaws.com/hadashco-emblem/${this.props.art.id}`; 
    }
    return (
      <div className="col-xs-9">
        <img
          src={source}
          className="mainArt"
          role="presentation"
        />
      </div>
      );
  }
}

ArtViewer.propTypes = {
  art: React.PropTypes.number,
};
