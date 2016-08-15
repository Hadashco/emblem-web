import React from 'react';

export default class ArtViewer extends React.Component {
  constructor(props) {
    super(props);
  }
  // this will be the main viewing component
  // ArtSelectorComponent will be the side bar to choose from the history of art at that location
    render() {
      let source = '/storage/art/' + this.props.art + '/' + this.props.art + '_FULL';
      return (
        <div className='col-xs-9'>
          <img src={source} className='mainArt' />
        </div>
        );
    }
}