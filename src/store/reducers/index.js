import { combineReducers } from 'redux';

import posts from './reducers';
import userData from './userReducer';

const reducers = combineReducers({posts : posts , userData : userData});

export default reducers