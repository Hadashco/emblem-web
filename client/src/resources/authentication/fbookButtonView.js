import React from 'react';

export default class FacebookButton extends React.Component {
  constructor(props) {
    super(props);
    this.FB = props.fb;

    this.state = {
      message: '',
    };
  }

  componentDidMount() {
    this.FB.Event.subscribe('auth.logout',
      this.onLogout.bind(this));

    this.FB.Event.subscribe('auth.statusChange',
      this.onStatusChange.bind(this));
  }

  onStatusChange(response) {
    console.log('statusChange response is:', response);
    const self = this;

    if (response.status === 'connected') {
      this.FB.api('/me', response => {
        const message = `Welcome ${response.name}`;
        self.setState({ message });
        console.log('Facebook API me:', response);
      });
    }
  }

  onLogout(response) {
    this.setState({
      message: '',
    });
  }

  render() {
    return (
      <div>
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="large"
          data-show-faces="false"
          data-auto-logout-link="true"
        >
        </div>
        <div>{this.state.message}</div>
      </div>
    );
  }
}

