/**
 * Created by admin on 2017/4/4.
 */
import {combineReducers} from 'redux';
import list from './PreviewListredux';
export default combineReducers({
  list
});
export * as listActions from './PreviewListredux';
