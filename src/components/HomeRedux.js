/**
 * Created by admin on 2017/4/4.
 */
import {combineReducers} from 'redux';
import list from '../redux/reducer/PreviewListredux';
export default combineReducers({
  list
});
export * as listActions from '../redux/reducer/PreviewListredux';
