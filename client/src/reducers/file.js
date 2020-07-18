import { UPLOAD_FILE } from '../actions/types';

const initialState = {
  files: [],
  file: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
