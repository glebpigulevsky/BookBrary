import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  CREATE_PROFILE,
} from './types';

// Get profile
export const createProfile = () => async (dispatch) => {
  try {
    const res = await axios.post('/api/profile/me');
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.msg,
    });
  }
};

// Get profile
export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.msg,
    });
  }
};

// Update profile
export const updateProfile = (formData) => async (dispatch) => {
  console.log(formData);
  try {
    const res = await axios.post('/api/profile/me', formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.msg,
    });
  }
};

// Clear profile state
export const clearProfile = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
};
