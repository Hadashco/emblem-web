import React from 'react';
import FacebookButton from './../authentication/fbookButtonView.js';
import InfoPage from './../stateless/InfoPage.js';
import DemoButton from './DemoButton.js';

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startingBackgroundPos: 20,
      windowPosition: window.pageYOffset,
    };

    this.style = {
      backgroundPosition: `${171}px ${this.state.startingBackgroundPos}px`,
    };

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    this.setState({ startingBackgroundPos: this.state.startingBackgroundPos - 3 });
    this.setState({ windowPosition: window.pageYOffset });
    console.log(this.state.windowPosition);
    this.style = { backgroundPosition: `${171}px ${this.state.startingBackgroundPos}px` };
  }


  render() {
    return (
      <div className="frontPage">
        <div className="login">
          <div className="loginContainer" ref="loginArt" style={this.style}>
            <img src="./assets/iphone.png" role="presentation" />
            <h1><b><i>Emblem</i></b></h1>
            <div className="loginButtonDiv">
              <FacebookButton className="loginButton" />
            </div>
            <DemoButton />
          </div>
        </div>
        <div className="infoContainer"><InfoPage /></div>
      </div>
      );
  }
}
