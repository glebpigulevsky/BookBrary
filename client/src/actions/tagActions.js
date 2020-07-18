import { GET_TAGS, ADD_TAG, TAG_ERROR, ADD_COUNT_TAG } from './types';
import axios from 'axios';

// Get tags
export const getTags = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/tags');
    dispatch({ type: GET_TAGS, payload: res.data });
  } catch (err) {
    dispatch({
      type: TAG_ERROR,
      payload: err.response,
    });
  }
};

// Add tags
export const addTag = (tag) => async (dispatch) => {
  try {
    const res = await axios.post('/api/tags', tag);
    dispatch({ type: ADD_TAG, payload: res.data });
  } catch (err) {
    dispatch({
      type: TAG_ERROR,
      payload: err.response,
    });
  }
};

// Change counter

export const addCount = (id) => async (dispatch) => {
  console.log(id);
  try {
    const res = await axios.post(`/api/tags/${id}`);
    dispatch({ type: ADD_COUNT_TAG, payload: res.data });
  } catch (err) {
    dispatch({
      type: TAG_ERROR,
      payload: err.response,
    });
  }
};
