import 'whatwg-fetch';
import React from 'react';
import FacebookButton from './fbookButtonView';

export default class LoginView extends React.Component {
  // componentWillMount() {
  //   window.statusChangeCallback = this.statusChangeCallback;
  //   window.checkLoginState = this.checkLoginState;
  // }

  // componentDidMount() {
  //   const s = `<div class="fb-login-button"
  //             data-scope="public_profile,email" data-size="large"
  //             data-show-faces="false" data-auto-logout-link="true"
  //             onlogin="checkLoginState"></div>`;

  //   const div = document.getElementById('social-login-button-facebook');
  //   div.innerHTML = s;
  // }

  // componentWillUnmount() {
  //   delete window.statusChangeCallback;
  //   delete window.checkLoginState;
  // }

  // // TODO: Send to server
  // // Facebook OAuth provides three states:
  //   //  1) connected = Logged into app AND Facebook
  //   //  2) not_authorized = Logged into Facebook NOT app
  //   //  3) All other => Not logged into Facebook, not sure if logged into app
  // statusChangeCallback(response) {
  //   console.log('changeCallback', response);
  // }

  // // Callback for Facebook login button
  // checkLoginState() {
  //   console.log('checking login state 2.0...');
  //   // FB.getLoginStatus(response => {
  //   //   window.statusChangeCallback(response);
  //   // });

  //   // fetch('/auth', {
  //   //   method: 'GET',
  //   //   headers: {
  //   //     Accept: 'application/json',
  //   //     'Content-Type': 'application/json',
  //   //   },
  //   // });
  // }


      // <div id="social-login-button-facebook">
      // </div>
  render() {
    return (
      <FacebookButton fb={FB} />
    );
  }

}
