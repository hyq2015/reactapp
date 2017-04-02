/**
 * Created by admin on 2017/4/2.
 */
import Reflux from 'reflux';
import MainActions from '../actions/MainActions';
// import Promise from 'bluebird';
const request=require('../static/js/request');


const f = () => {
  return new Promise((resolve, reject) => {
    request.http.post(request.baseUrl+request.alphaPath.currentShopCar,{}).then((res)=>{
      console.log(res);
      if(res.status==403){//没有权限
        reject('noRight');
      }else{
        resolve(res)
      }
      
    }).catch((err)=>{
      reject(err)
    })
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
      if(err=='noRight'){
        this.data.grammar = 'noRight';
      }else{
        this.data.grammar = 'error';
      }
      
      this.data.playData = {};
    } finally {
      this.trigger(this.data)
    }
    
  }
});
export default MainStore
