import React from 'react';
import 'whatwg-fetch';

export default class FacebookButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.location = '/auth/facebook';
  }

  render() {
    return (
      <div>
        <
          input type="button"
          value="Click Me!"
          onClick={this.handleClick}
        />
        <p>Some text</p>
      </div>
    );
  }
}

