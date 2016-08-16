import React from 'react';
import AlertContainer from 'react-alert';

export default class Alert extends React.Component {
  constructor(props){
    super(props);
    this.alertOptions = {
      offset: 14,
      position: 'top right',
      theme: 'light',
      time: 5000,
      transition: 'scale'
    };
  }

  showAlert() {
    msg.show('Unauthorized access, please log in', {
      time: 2000,
      type: 'error',
    });
  }

  render(){
    return(
      <div>
        <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
      </div>
    );
  }

}