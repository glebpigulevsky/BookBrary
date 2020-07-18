import { GET_AUSERS, AUSERS_ERROR, SET_USER, CLEAR_USER, UPDATE_USER, DELETE_USER } from '../actions/types';
const initialState = {
    users: null,
    current: null,
    filtered: null,
    error: null,
    loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_AUSERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case SET_USER:
      return {
        ...state,
        current: payload,
        loading: false
      }
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        users: state.users.map(user => user._id === payload._id 
          ? payload 
          : user
          ),
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== payload),
        loading: false
      }
    case CLEAR_USER:
      return {
        ...state,
        current: null,
        loading: false
      }
    case AUSERS_ERROR:
      return {
        ...state,
        error: payload
      }

    default:
      return state;
  }
}