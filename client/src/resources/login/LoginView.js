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
      iphoneOpacity: 1,
    };

    this.style = {
      backgroundPosition: `${171}px ${this.state.startingBackgroundPos}px`,
    };
    this.iphoneOpacity = {
      opacity: 1,
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
    if (this.state.windowPosition < window.pageYOffset) {
      this.setState({ startingBackgroundPos:
        this.state.startingBackgroundPos - (window.pageYOffset - this.state.windowPosition) });
      if (window.pageYOffset > 150) {
        this.setState({ iphoneOpacity:
          this.state.iphoneOpacity - ((window.pageYOffset - this.state.windowPosition) / 220) });
      } else {
        this.setState({ iphoneOpacity: 1 });
      }
      this.setState({ windowPosition: window.pageYOffset });
    } else {
      this.setState({ startingBackgroundPos:
        this.state.startingBackgroundPos + (this.state.windowPosition - window.pageYOffset) });
      if (window.pageYOffset > 150) {
        this.setState({ iphoneOpacity:
          this.state.iphoneOpacity + ((this.state.windowPosition - window.pageYOffset) / 220) });
      } else {
        this.setState({ iphoneOpacity: 1 });
      }
      this.setState({ windowPosition: window.pageYOffset });
    }
    this.style = { backgroundPosition: `${171}px ${this.state.startingBackgroundPos}px` };
    this.iphoneOpacity = { opacity: this.state.iphoneOpacity };
  }


  render() {
    console.log(this.iphoneOpacity);
    return (
      <div className="frontPage">
        <div className="login">
          <div className="loginContainer" ref="loginArt" style={this.style}>
            <img src="./assets/iphone.png" role="presentation" style={this.iphoneOpacity} />
            <h1 style={this.iphoneOpacity}><b><i>Emblem</i></b></h1>
            <DemoButton style={this.iphoneOpacity} />
            <div className="loginButtonDiv" style={this.iphoneOpacity}>
              <FacebookButton className="loginButton" />
            </div>
          </div>
        </div>
        <div className="infoContainer"><InfoPage /></div>
      </div>
      );
  }
}
