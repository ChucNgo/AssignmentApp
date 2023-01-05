import {combineReducers} from 'redux';

const authSlice = require('./authSlice');

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

export default rootReducer;
