import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { professionals } from './professionals.reducer';
const rootReducer = combineReducers({
  authentication,
  users,
  professionals,
  alert
});

export default rootReducer;