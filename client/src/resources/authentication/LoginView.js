import React from 'react';
import FacebookButton from './fbookButtonView';

export default class LoginView extends React.Component {

  // Facebook OAuth provides three states:
    //  1) connected = Logged into app AND Facebook
    //  2) not_authorized = Logged into Facebook NOT app
    //  3) All other => Not logged into Facebook, not sure if logged into app

  render() {
    return (
      <FacebookButton />
    );
  }

}
