import { LAUNCH_SEARCH } from '../constants/actionTypes';

function SearchBarReducer(state = 'sounddesign', action) {
  console.log(action);
  switch (action.type) {
    case LAUNCH_SEARCH:
      return action.term;
    default:
      return state;
  }
}

export default SearchBarReducer;