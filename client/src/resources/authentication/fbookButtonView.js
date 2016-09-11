import React from 'react';
import { Button } from 'react-bootstrap';
import { connection } from './../headerState.js';

const fbButtonStyles = {
  borderRadius: `${30}px`,
};

class FacebookButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.location = 'http://localhost:3000/auth/facebook';
    this.props.changeAuth();
  }

  render() {
    return (
      <Button
        className="button"
        bsStyle="primary"
        style={fbButtonStyles}
        onClick={this.handleClick}
      >
        Login with Facebook
      </Button>
      );
  }
}

FacebookButton.propTypes = {
  changeAuth: React.PropTypes.func,
};

export default connection(FacebookButton);
