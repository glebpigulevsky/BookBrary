import {
  GET_POSTS,
  ADD_POST,
  POST_ERROR,
  GET_POST,
  GET_USERS_POSTS,
  DELETE_POST,
  SET_CURRENT_POST,
  CLEAR_CURRENT_POST,
  UPDATE_POST,
  FILTER_POST,
  CLEAR_FILTER,
  ADD_RATING_POST,
  ADD_COMMENT,
  GET_COMMENT,
  SEND_COMMENT,
  TAG_FILTER,
  FILTER_POST_DATE,
  FILTER_POST_RATING,
  GET_POSTS_SEARCH,
  SET_CHAPTER,
  CLEAR_CHAPTER,
  ADD_CHAPTER,
  DELETE_CHAPTER,
  SET_CURRENT_CHAPTER,
  CLEAR_CURRENT_CHAPTER,
  UPDATE_CHAPTER,
  MOVE_CHAPTER_DOWN,
  MOVE_CHAPTER_UP,
  LIKE_CHAPTER,
  UNLIKE_CHAPTER,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  current: null,
  chapter: null,
  currentChapter: null,
  filtered: null,
  loading: true,
  error: {},
  searchingPost: null,
};

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POSTS_SEARCH:
      return {
        ...state,
        loading: false,
        searchingPost: payload,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case GET_USERS_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case UPDATE_POST:
    case ADD_CHAPTER:
    case UPDATE_CHAPTER:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
        post: payload,
      };
    case SET_CURRENT_POST:
      return {
        ...state,
        loading: false,
        current: payload,
      };
    case CLEAR_CURRENT_POST:
      return {
        ...state,
        post: null,
        loading: false,
        current: null,
      };
    case FILTER_POST:
      return {
        ...state,
        loading: false,
        filtered: state.posts.filter((post) => {
          const regex = new RegExp(`${payload}`, 'gi');
          return post.text.match(regex) || post.header.match(regex);
        }),
      };
    case TAG_FILTER:
      return {
        ...state,
        loading: false,
        filtered: state.posts.filter((post) => {
          const regex = new RegExp(`${payload}`, 'gi');
          for (let i = 0; i < post.tags.length; i++) {
            if (post.tags[i].value.match(regex)) return post;
          }
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case ADD_RATING_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
        post: payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case SEND_COMMENT:
      return {
        ...state,
        loading: false,
      };
    case GET_COMMENT:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case FILTER_POST_RATING:
      return {
        ...state,
        posts: state.posts.sort((a, b) =>
          a.averageRating < b.averageRating ? 1 : -1
        ),
        loading: false,
      };
    case FILTER_POST_DATE:
      return {
        ...state,
        posts: state.posts.sort((a, b) => (a.date < b.date ? 1 : -1)),
        loading: false,
      };
    case SET_CHAPTER:
      return {
        ...state,
        chapter: payload,
        loading: false,
      };
    case CLEAR_CHAPTER:
      return {
        ...state,
        chapter: null,
        loading: false,
      };
    case DELETE_CHAPTER:
      return {
        ...state,
        post: payload,
        loading: false,
        chapter: null,
      };
    case SET_CURRENT_CHAPTER:
      return {
        ...state,
        loading: false,
        currentChapter: payload,
      };
    case CLEAR_CURRENT_CHAPTER:
      return {
        ...state,
        loading: false,
        currentChapter: null,
      };
    case MOVE_CHAPTER_UP:
    case MOVE_CHAPTER_DOWN:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case LIKE_CHAPTER:
    case UNLIKE_CHAPTER:
      return {
        ...state,
        chapter: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
