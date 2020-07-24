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
  SET_CHAPTER,
  CLEAR_CHAPTER,
  ADD_CHAPTER,
  DELETE_CHAPTER,
  UPDATE_CHAPTER,
  MOVE_CHAPTER_DOWN,
  MOVE_CHAPTER_UP,
  LIKE_CHAPTER,
  UNLIKE_CHAPTER,
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

// // Filter posts in searching mode
// export const getPostsSearch = () => async (dispatch) => {
//   try {
//     const res = await axios.get('/api/posts');

//     dispatch({
//       type: GET_POSTS_SEARCH,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

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

// Set chapter from post to state
export const getChapter = (chapter) => (dispatch) => {
  dispatch({ type: SET_CHAPTER, payload: chapter });
};

// Delete chapter from post to state
export const clearChapter = () => (dispatch) => {
  dispatch({ type: CLEAR_CHAPTER });
};

// Add chapter
export const addChapter = (post, id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/${id}/chapter`, post);
    dispatch({
      type: ADD_CHAPTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.msg,
    });
  }
};

// Delete chapter
export const deleteChapter = (id_post, id_chapter) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/posts/${id_post}/chapter/${id_chapter}`
    );
    dispatch({
      type: DELETE_CHAPTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.msg,
    });
  }
};

// // Set current chapter

// export const setChapter = (chapter) => async (dispatch) => {
//   dispatch({
//     type: SET_CURRENT_CHAPTER,
//     payload: chapter,
//   });
// };

// // Clear current chapter

// export const clearChapter = () => async (dispatch) => {
//   dispatch({
//     type: CLEAR_CURRENT_CHAPTER,
//   });
// };

// Clear current chapter

export const updateChapter = (chapter, chapterId, postId) => async (
  dispatch
) => {
  console.log(chapter, chapterId, postId);

  try {
    const res = await axios.post(
      `/api/posts/${postId}/chapter/${chapterId}`,
      chapter
    );
    dispatch({
      type: UPDATE_CHAPTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.msg,
    });
  }
  // dispatch({
  //   type: UPDATE_CHAPTER,
  // });
};

// Move chapter UP

export const moveChapterUp = (postId, chapterId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/posts/${postId}/chapter/${chapterId}/up`
    );
    dispatch({
      type: MOVE_CHAPTER_UP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.msg,
    });
  }
};

// Move chapter DOWN

export const moveChapterDown = (postId, chapterId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/posts/${postId}/chapter/${chapterId}/down`
    );
    dispatch({
      type: MOVE_CHAPTER_DOWN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.msg,
    });
  }
};

// like chapter

export const likeChapter = (postId, chapterId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/posts/${postId}/chapter/${chapterId}/like`
    );
    dispatch({
      type: LIKE_CHAPTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.msg,
    });
  }
};

// Unlike chapter

export const unlikeChapter = (postId, chapterId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/posts/${postId}/chapter/${chapterId}/unlike`
    );
    dispatch({
      type: UNLIKE_CHAPTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err.response.msg,
    });
  }
};
