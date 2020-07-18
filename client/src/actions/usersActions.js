import axios from 'axios';
import {
  GET_AUSERS,
  AUSERS_ERROR,
  SET_USER,
  CLEAR_USER,
  UPDATE_USER,
  DELETE_USER
} from './types';

// Get AUsers
export const getAusers = () => async dispatch => {
  try {
    const res = await axios.get('/api/adminUsers');
    dispatch({ 
      type: GET_AUSERS, 
      payload: res.data });
  } catch (err) {
    dispatch({ 
      type: AUSERS_ERROR,
      payload: err.response.msg 
    });
  }
}

// Set Current user
export const setCurrentU = (user) => async dispatch => {
  dispatch({ 
    type: SET_USER,
    payload: user
  });
}

// Update user
export const updateAusers = user => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.put(`/api/adminUsers/${user.id}`, user, config);
    dispatch({ 
      type: UPDATE_USER, 
      payload: res.data });
  } catch (err) {
    dispatch({ 
      type: AUSERS_ERROR,
      payload: err.response.msg 
    });
  }
}

// Delete user
export const deleteUser = id => async dispatch => {
  try {
    await axios.delete(`/api/adminUsers/${id}`);
    dispatch({ type: DELETE_USER, payload: id });
  } catch (err) {
    dispatch({ 
      type: AUSERS_ERROR,
      payload: err.response.msg 
    });
  }
}


// Clear Current user
export const clearCurrentU = () => async dispatch => {
  dispatch({ 
    type: CLEAR_USER,
  });
}

