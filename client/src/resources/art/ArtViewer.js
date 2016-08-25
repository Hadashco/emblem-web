import React from 'react';

export default class ArtViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const source = `/storage/art/${this.props.art}/${this.props.art}_FULL`;
    return (
      <div className="col-xs-9">
        <img
          src={source || '/storage/art/1/1_FULL'}
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
