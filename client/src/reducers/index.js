import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import users from './users';
import post from './post';
import profile from './profile';
import file from './file';
import tags from './tags';

export default combineReducers({
  alert,
  auth,
  users,
  post,
  profile,
  file,
  tags,
});
