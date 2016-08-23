import { connect } from 'react-redux';
import React from 'react';

const colorStateToProps = state => {
  return { diplayColorPicker: state.color.diplayColorPicker };
};

const colorDispatchToProps = dispatch => {
  return {
    handleColorPickerDisplay: () => {
      dispatch({type: 'handleColorPickerDisplay'});
    }
  };
}


const connection = connect(colorStateToProps, colorDispatchToProps);
export { connection };
