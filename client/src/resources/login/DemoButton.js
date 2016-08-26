import React from 'react';
import UploadButton from './../upload/UploadButton.js';

export default class DemoButton extends React.Component {
  constructor(props) {
    super(props);

    this.demoClick = this.demoClick.bind(this);
  }

  demoClick() {
    console.log('demo!');
  }

  render() {
    return <UploadButton class='demoButton' clickFunc={this.demoClick} text='demo' />;
  }
}