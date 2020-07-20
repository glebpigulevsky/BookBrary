import {
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_PROFILE,
  CLEAR_PROFILE,
  CREATE_PROFILE,
} from '../actions/types';
const initialState = {
  profile: null,
  current: null,
  error: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
}
