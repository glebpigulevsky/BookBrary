import { UPLOAD_FILE } from './types';
import axios from 'axios';

// Upload file
export const uploadFile = (formData) => async (dispatch) => {
  console.log(formData.get('headerPhoto'));
  await axios.post('/api/upload', formData, {});
  dispatch({
    type: UPLOAD_FILE,
  });
};
