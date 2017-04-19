import Reflux from 'reflux';
import LogisticActions from '../actions/LogisticActions';
import CONFIG,{XHR} from '../static/js/request';
let LogisticStore = Reflux.createStore({
  init: function () {
    this.data = {
      
    };
  },
  listenables: LogisticActions,
  getInitialState() {
    return this.data
  },
  onLoadData:async function(){

  }
})
export default LogisticStore