import React from 'react';
import { Button } from 'react-bootstrap';
import { connection } from './../headerState.js';
import {browserHistory} from "react-router";

export default class FacebookButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.location = '/auth/facebook';
    this.props.changeAuth();
  }

  render() {
    return (
      <Button className='uibutton confirm' onClick={this.handleClick}>Login with Facebook</Button>
    );
  }
}

export default connection(FacebookButton);