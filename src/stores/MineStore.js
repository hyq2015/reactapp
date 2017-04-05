import Reflux from 'reflux';
import MineActions from '../actions/MineActions';
// import ListStore from './ListStore';
// import Promise from 'bluebird';
import CONFIG,{XHR} from '../static/js/request';
let MineStore = Reflux.createStore({
  init: function () {
    this.data = {
      msg:'ok',
      indexData:{
          user:{}
      }
    };
  },
  listenables: MineActions,
  onGetIndexInfo:async function(){
    try {
      const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.userIndexinfo,{},'get');
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
  }
});
export default MineStore;