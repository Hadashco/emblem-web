import React from 'react';
import FacebookButton from './../authentication/fbookButtonView.js';
import InfoPage from './../stateless/InfoPage.js';
import { browserHistory } from 'react-router';

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundPos: -164
    }

    this.style = {
      backgroundPosition: 101 + 'px ' + this.state.backgroundPos + 'px'
    }

    this.onScroll = this.onScroll.bind(this);
  }
 

  componentDidMount() {
    console.log('componentDidMount');
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll(e) {
    console.log(e, 'hi');
    console.log(this.refs.loginArt.style.backgroundPosition);
    this.setState({backgroundPos: this.state.backgroundPos+1});
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