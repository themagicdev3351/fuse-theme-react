import { combineReducers } from '@reduxjs/toolkit';
import login from './loginSlice';
import register from './registerSlice';
import user from './userSlice';
import users from './usersSlice';


const authReducers = combineReducers({
  user,
  login,
  register,
  users
});

export default authReducers;
