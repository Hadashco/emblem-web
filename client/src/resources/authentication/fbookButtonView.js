import React from 'react';

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
      <button onClick={this.handleClick}>Facebook</button>
    );
  }
}

