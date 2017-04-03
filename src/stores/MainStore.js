/**
 * Created by admin on 2017/4/2.
 */
import Reflux from 'reflux';
import MainActions from '../actions/MainActions';
import ListStore from './ListStore';
// import Promise from 'bluebird';
const request=require('../static/js/request');


const f = () => {
  return new Promise((resolve, reject) => {
    request.http.post(request.baseUrl+request.alphaPath.indexData,{}).then((res)=>{
      console.log(res);
      if(res.status==403){//没有权限
        reject('noRight');
      }else if(res.status!=200){
        reject('error');
      }else{
        resolve(res.json())
      }
    }).catch((err)=>{
      reject(err)
    });
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
      console.log(err);
      if(err=='noRight'){
        this.data.grammar = 'noRight';
      }else{
        this.data.grammar = 'error';
      }
      
      this.data.playData = null;
    } finally {
      ListStore.onChangename();
      this.trigger(this.data);
      
    }
    
  }
});
export default MainStore
