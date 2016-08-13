import { connect } from 'react-redux';
import { addToActions } from '../../Store.js';

const uploadStateToProps = state => {
  return { modalState: state.upload.modalState, files: state.upload.files, toUpload: state.upload.toUpload };
};

const uploadDispatchToProps = dispatch => {
  return {
  	switchUploadModalState: () => {
    	dispatch({ type: 'switchUploadModalState' });
  	},
    uploadFiles: (files) => {
      files.forEach(file => {
        const fileReader = new FileReader(file);
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = function(e) {
          const arrayBufferStr = fileReader.result;
          fetch('/art', {
            headers: {
              'Accept': 'application/octet-stream',
              'Content-Type': 'application/octet-stream',
              'File-Type': file.type,
              'UserId': '1',
            },
            credentials: 'same-origin', // ADDED
            method: 'POST',
            body: arrayBufferStr,
          });
        }
      });
      dispatch({ type: 'uploadFiles', data: files });
    },
    emptyToUploadFiles: () => {
      dispatch({ type: 'emptyToUploadFiles' });
    },
    addDragAndDropFiles: (file) => {
      dispatch({ type: 'addDragAndDropFiles', data: file })
    },
    populateArtFiles: () => {
      fetch('/art', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        console.log('RESPONSSSSSSSSSEEEEEEEE', JSON.stringify(response));
        dispatch({ type: 'populateArtFiles', data: response })
      });
    }
  }
};


const connection = connect(uploadStateToProps, uploadDispatchToProps);
export { connection };
