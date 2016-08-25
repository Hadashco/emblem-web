import React from 'react';

export default class ArtViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const source = `https://s3.amazonaws.com/hadashco-emblem/${this.props.art}`;
    return (
      <div className="col-xs-9">
        <img
          src={source || 'https://s3.amazonaws.com/hadashco-emblem/1'}
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
