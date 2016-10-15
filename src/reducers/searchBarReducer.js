import { LAUNCH_SEARCH } from '../constants/actionTypes';

function SearchBarReducer(state = [], action) {
  switch (action.type) {
    case LAUNCH_SEARCH:
      return action.payload.data.response.results;
    default:
      return state;
  }
}

export default SearchBarReducer;