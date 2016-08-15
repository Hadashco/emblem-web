import React from 'react';
import { Button } from 'react-bootstrap';

const fbButtonStyles = {
  borderRadius: 30 + 'px'
}

export default class FacebookButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.location = '/auth/facebook';
  }

  // TODO: Format button with official Facebook styling
      // className="fb-login-button"
      // data-max-rows="1"
      // data-size="medium"
      // data-show-faces="false"
      // data-auto-logout-link="false"

  render() {
    return (
      <Button className='button' bsStyle="primary" style={ fbButtonStyles } onClick={this.handleClick}>Login with Facebook</Button>
    );
  }
}

