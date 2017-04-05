/**
 * Created by admin on 2017/4/3.
 */
import Reflux from 'reflux';
import ListActions from '../actions/ListActions';

let ListStore = Reflux.createStore({
  init: function () {
    this.data = {
      list:""
    };
  },
  listenables: ListActions,
  getInitialState() {
    return this.data
  },
  onChangename:async function(){
    try {
      this.data.list = "huangyunqi";
    } catch (err) {
  
      this.data.list = "ricky";
    } finally {
      this.trigger(this.data)
    }
    
  }
});
export default ListStore
