/**
 * Created by admin on 2017/4/2.
 */
import Reflux from 'reflux';
import MainActions from '../actions/MainActions';
// import Promise from 'bluebird';
const request=require('../static/js/request');


const f = () => {
  return new Promise((resolve, reject) => {
    request.http.post(request.baseUrl+request.alphaPath.indexData,{}).then((res)=>{
      resolve(res)
    });
    // setTimeout(() => {
    //   reject(234);
    //   // resolve(234);
    // }, 2000);
  });
};
let MainStore = Reflux.createStore({
  init: function () {
    this.data = {
      name:'ricky'
    };
  },
  listenables: MainActions,
  getInitialState() {
    return this.data
  },
  onAdd:async function(grammar){
    try {
      const t = await f();
      this.data.grammar = '123';
      this.data.playData = t;
    } catch (err) {
      this.data.grammar = 'error';
      this.data.playData = {};
    } finally {
      this.trigger(this.data)
    }
    
  }
});
export default MainStore
