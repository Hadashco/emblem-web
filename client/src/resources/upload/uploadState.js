import { connect } from 'react-redux';

const uploadStateToProps = state => {
  return {
    artModalState: state.upload.artModalState,
    modalState: state.upload.modalState,
    files: state.upload.files, toUpload: state.upload.toUpload,
    currentArt: state.upload.currentArt,
    isAuthorized: state.auth.isAuthorized,
    displayColorPicker: state.color.diplayColorPicker,
  };
};

const uploadDispatchToProps = dispatch => {
  return {
    switchUploadModalState: () => {
      dispatch({ type: 'switchUploadModalState' });
    },
    switchArtModalState: () => {
      dispatch({ type: 'switchArtModalState' });
    },
    uploadFiles: (files) => {
      files.forEach(file => {
        const uploadFile = file[0];
        const fileReader = new FileReader(uploadFile);
        fileReader.readAsArrayBuffer(uploadFile);
        fileReader.onload = e => {
          const arrayBufferStr = fileReader.result;
          fetch('/art', {
            headers: {
              'Accept': 'application/octet-stream',
              'Content-Type': 'application/octet-stream',
              'File-Type': uploadFile.type,
            },
            credentials: 'same-origin',
            method: 'POST',
            body: arrayBufferStr,
          }).catch(() => {
                msg.show('Please log in to get all of our awesome features!', {
                  time: 3000,
                  type: 'info',
                });
            setTimeout(() => {
              window.location = '/';
            }, 3000);
          }).then(body => body.json())
          .then(artObj => dispatch({ type: 'uploadFiles', data: { id: artObj.key, type: uploadFile.type } }));
        };
      });
    },
    emptyToUploadFiles: () => {
      dispatch({ type: 'emptyToUploadFiles' });
    },
    addDragAndDropFiles: (file) => {
      dispatch({ type: 'addDragAndDropFiles', data: file });
    },
    populateArtFiles: () => {
      fetch('/user/art', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
        credentials: 'same-origin',
      }).then(response =>
        response.json()
      )
      .catch(() => {
            msg.show('Please log in to get all of our awesome features!', {
              time: 3000,
              type: 'info',
            });
        setTimeout(() => {
          window.location = '/';
        }, 3000);
      })
      .then(body => {
        dispatch({ type: 'populateArtFiles', data: body });
      });
    },
    updateCurrentArt: (data) => {
      dispatch({ type: 'updateCurrentArt', data });
    },
  };
};


const connection = connect(uploadStateToProps, uploadDispatchToProps);
export { connection };
