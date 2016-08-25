import { connect } from 'react-redux';

const headerStateToProps = state => {
  return {
    isAuthorized: state.auth.isAuthorized,
    displayColorPicker: state.color.displayColorPicker,
    currentColor: state.color.currentColor,
  };
};

const headerDispatchToProps = dispatch => {
  return { changeAuth: () => {
    dispatch({ type: 'changeAuth' });
  },
  handleColorPickerDisplay: () => {
    dispatch({ type: 'handleColorPickerDisplay' });
  },
  updateCurrentColor: (data) => {
    dispatch({ type: 'updateCurrentColor', data });
  } };
};

const connection = connect(headerStateToProps, headerDispatchToProps);
export { connection };
