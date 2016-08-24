import React from 'react';
import FacebookButton from './../authentication/fbookButtonView.js';
import InfoPage from './../stateless/InfoPage.js';
import { browserHistory } from 'react-router';

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startingBackgroundPos: -64,
      windowPosition: window.pageYOffset,
    };

    this.style = {
      backgroundPosition: 101 + 'px ' + this.state.startingBackgroundPos + 'px'
    }

    this.onScroll = this.onScroll.bind(this);
  }
 

  componentDidMount() {
    console.log('componentDidMount');
    window.addEventListener('scroll', this.onScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  onScroll(e) {
    console.log(e, 'hi');
    this.setState({startingBackgroundPos: this.state.startingBackgroundPos-4});
    this.setState({windowPosition: this.pageYOffset});
    console.log(this, 'windowOffset')
    this.style = {backgroundPosition: 101 + 'px ' + this.state.startingBackgroundPos + 'px'}

    }


  render() {
    return (
    <div className='frontPage'>
      <div className='login'>
        <div className='loginContainer' ref='loginArt' style={this.style}>
          <img src="./assets/iphone.png" />
            <h1><b><i>Emblem</i></b></h1>
            <div className='loginButtonDiv'>
              <FacebookButton className='loginButton' />
            </div>
        </div>
      </div>
      <div className="infoContainer"><InfoPage /></div>
    </div>
    )
  }
}