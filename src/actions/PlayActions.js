/**
 * Created by admin on 2017/4/2.
 */
import Reflux from 'reflux';
let PlayActions = Reflux.createActions({
  'add': {asyncResult: true},
  'getIndexList':{asyncResult: true},
  'getNearBy':{asyncResult: true},
  'disabletab':{},
  'playTab':{},
  'init':{}
});

export default PlayActions
