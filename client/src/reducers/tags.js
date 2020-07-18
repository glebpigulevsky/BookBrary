import { GET_TAGS, ADD_TAG, TAG_ERROR, ADD_COUNT_TAG } from '../actions/types';
const initialState = {
  tags: null,
  error: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TAGS:
      return {
        ...state,
        loading: false,
        tags: payload,
      };
    case ADD_TAG:
      return {
        ...state,
        loading: false,
        tags: [payload, ...state.tags],
      };
    case ADD_COUNT_TAG:
      return {
        ...state,
        loading: false,
        tags: state.tags.map((tag) =>
          tag._id === payload._id ? payload : tag
        ),
      };
    case TAG_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
