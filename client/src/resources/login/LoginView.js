import React from 'react';
import FacebookButton from './../authentication/fbookButtonView.js';
import { browserHistory } from 'react-router';

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className='login'>
      <div className='loginContainer'>
        <h1>Emblem</h1>
        <div className='loginButtonDiv'>
          <FacebookButton className='loginButton' />
        </div>
      </div>
    </div>
    )
  }
}