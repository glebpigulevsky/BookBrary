import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  GET_USERS_POSTS,
  DELETE_POST,
  SET_CURRENT_POST,
  CLEAR_CURRENT_POST,
  UPDATE_POST,
  FILTER_POST,
  CLEAR_FILTER,
  ADD_RATING_POST,
  SEND_COMMENT,
  GET_COMMENT,
  TAG_FILTER,
  FILTER_POST_DATE,
  FILTER_POST_RATING,
  GET_POSTS_SEARCH,
} from './types';
import axios from 'axios';

// Add post
export const addPost = (post) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts`, post);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.msg,
    });
  }
};

// Update post
export const updatePost = (id, postFields) => async (dispatch) => {
  console.log(postFields.tags);
  try {
    const res = await axios.post(`/api/posts/${id}`, postFields);
    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.msg,
    });
  }
};

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get posts for search navbar
export const getPostsSearch = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS_SEARCH,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get posts by id
export const getUserPosts = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/user/${id}`);

    dispatch({
      type: GET_USERS_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Set post

export const setPost = (post) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_POST,
    payload: post,
  });
};

// Clear post

export const clearPost = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_POST,
  });
};

// Filter posts
export const filterPosts = (text) => async (dispatch) => {
  dispatch({ type: FILTER_POST, payload: text });
};

// Filter posts by tag
export const filterPostsTag = (tag) => async (dispatch) => {
  dispatch({ type: TAG_FILTER, payload: tag });
};

// Clear filter
export const clearFilter = () => (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};

// Add rating to post
export const addRating = (rating, id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/rating/${id}`, rating);
    dispatch({ type: ADD_RATING_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get comment to post from socket
export const getComment = (post) => async (dispatch) => {
  dispatch({ type: GET_COMMENT, payload: post });
};
// Send comment to post from socket
export const sendComment = () => async (dispatch) => {
  dispatch({ type: SEND_COMMENT });
};

// Filter posts by date
export const filterPostsDate = () => (dispatch) => {
  dispatch({ type: FILTER_POST_DATE });
};

// Filter posts by rating
export const filterPostsRating = () => (dispatch) => {
  dispatch({ type: FILTER_POST_RATING });
};
