/**
 * Created by admin on 2017/4/2.
 */
import Reflux from 'reflux';
let MainActions = Reflux.createActions({
  'add': {asyncResult: true},
  'getIndexList':{asyncResult: true},
  'getNearBy':{asyncResult: true}
});

export default MainActions
