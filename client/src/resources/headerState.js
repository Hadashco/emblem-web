import { connect } from 'react-redux';
import React from 'react';

const headerStateToProps = state => {
  return { isAuthorized: state.auth.isAuthorized };
};

const headerDispatchToProps = dispatch => {
  return { changeAuth: () => {
      dispatch({ type: 'changeAuth' });
  }}
}

const connection = connect(headerStateToProps, headerDispatchToProps);
export { connection };