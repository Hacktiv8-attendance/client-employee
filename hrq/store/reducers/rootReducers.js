import { combineReducers } from 'redux';
import userReducers from './userReducers';

const rootReducers = combineReducers({
  user: userReducers
});

export default rootReducers;