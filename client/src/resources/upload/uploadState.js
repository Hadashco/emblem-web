import { connect } from 'react-redux';
import { addToActions } from '../../Store.js';

const uploadStateToProps = state => {
  return { modalState: state.upload.modalState };
};

const uploadDispatchToProps = dispatch => {
  return {
  switchUploadModalState: bool => {
    dispatch({ type: 'switchUploadModalState' });
  }
}};


const connection = connect(uploadStateToProps, uploadDispatchToProps);
export { connection };
