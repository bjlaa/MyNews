import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import searchTerm from './searchBarReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  searchTerm,
  routing: routerReducer
});

export default rootReducer;
