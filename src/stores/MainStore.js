/**
 * Created by admin on 2017/4/2.
 */
import Reflux from 'reflux';
import MainActions from '../actions/MainActions';
// import ListStore from './ListStore';
// import Promise from 'bluebird';
import CONFIG,{XHR} from '../static/js/request'

let MainStore = Reflux.createStore({
  init: function () {
    this.data = {
      msg:'ok',
      indexData:{},
      nearList:[]
    };
  },
  listenables: MainActions,
  getInitialState() {
    return this.data
  },
  onGetIndexList:async function(){
    try {
      const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.indexData,{},'post');
      this.data.indexData=res;
      this.data.msg='ok';
    }catch(err){
      if(err=='noRight'){
        this.data.msg = 'noRight';
      }else{
        this.data.msg = 'error';
      }
      this.data.indexData = null;
    }finally{
      this.trigger(this.data);
    }
  },
  onGetNearBy:async function(){
    try {
      const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.findnearby,{"lat":"104.06487","lng":"30.54742"},'post');
      this.data.nearList=res;
      this.data.msg='ok';
    }catch(err){
      if(err=='noRight'){
        this.data.msg = 'noRight';
      }else{
        this.data.msg = 'error';
      }
      this.data.nearList = null;
    }finally{
      this.trigger(this.data);
    }
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
      // ListStore.onChangename();
      this.trigger(this.data);

    }

  }
});
export default MainStore
