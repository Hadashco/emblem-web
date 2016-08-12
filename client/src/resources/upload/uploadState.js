import { connect } from 'react-redux';
import { addToActions } from '../../Store.js';

const uploadStateToProps = state => {
  return { modalState: state.upload.modalState };
};

const uploadDispatchToProps = dispatch => {
  return {
  	switchUploadModalState: () => {
    	dispatch({ type: 'switchUploadModalState' });
  	},
    fileUpload: (files) => {
      dispatch({ type: 'fileUpload', data: files })
    }
  }
};


const connection = connect(uploadStateToProps, uploadDispatchToProps);
export { connection };
