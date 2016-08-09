import React from 'react';
import 'whatwg-fetch';

export default class FacebookButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('here we go');
    fetch('/auth/facebook', {
      method: 'GET',
      mode: 'no-cors', //'Access-Control-Allow-Origin'
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  onStatusChange(response) {
    console.log('statusChange response is:', response);
    const self = this;
  }

  onLogout(response) {
    this.setState({
      message: '',
    });
  }

  render() {
    return (
      <div>
        <
          input type="button"
          value="Click Me!"
          onClick={this.handleClick}
        />
        <div>{this.state.message}</div>
        <p>Some text</p>
      </div>
    );
  }
}

