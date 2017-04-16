/**
 * Created by admin on 2017/4/2.
 */
import Reflux from 'reflux';
let AppActions = Reflux.createActions({
  'disabletab':{},
  'mineTab':{},
  'mallTab':{},
  'playTab':{},
  'loaded':{},
  'disableLoading':{},
  'loadUser':{async:true}
});

export default AppActions
