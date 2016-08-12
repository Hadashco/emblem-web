import React from 'react';


class ArtComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
    return (<div className='artPiece'>{this.props.art}</div>);
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

    render() {
      var arr = [1,2,3,4,5,6,7,8,9];
      return (
        <div className='artContainer'>
        {this.props.markers.map(num => <ArtComponent art={num.id}/>)}
        </div>
      );
    }
}

export default connection(ArtSelector);