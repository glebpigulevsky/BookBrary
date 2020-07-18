import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  id: null,
  loading: true,
  user: null,
  isAdmin: false,
  isBlocked: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,

        loading: false,
        isBlocked: payload.isBlocked,
        isAdmin: payload.isAdmin,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      if (localStorage.token) {
        localStorage.removeItem('token');
      }
      return {
        ...state,
        ...payload,
        token: null,
        isAuthenticated: false,
        loading: false,
        isAdmin: false,
        isBlocked: true,
        user: null,
      };
    default:
      return state;
  }
}
