import { LAUNCH_SEARCH } from '../constants/actionTypes';

function SearchBarReducer(state = [], action) {
  switch (action.type) {
    case LAUNCH_SEARCH:
      if (action.payload.data) {
        return action.payload.data.response.results;
      }
      return action.payload.message;
    default:
      return state;
  }
}

export default SearchBarReducer;