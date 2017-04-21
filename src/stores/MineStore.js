import Reflux from 'reflux';
import MineActions from '../actions/MineActions';
import AppStore from './AppStore';
import PUBLIC from '../static/js/public';
// import Promise from 'bluebird';
import CONFIG,{XHR} from '../static/js/request';
let MineStore = Reflux.createStore({
  init: function () {
    this.data = {
      loginmsg:'ok',
      indexData:{
          user:{}
      },
      indexLoading:true
    };
  },
  listenables: MineActions,
  onGetIndexInfo:async function(){
    try {
      const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.userIndexinfo,{},'get');
      this.data.indexData=res;
      this.data.loginmsg='ok';
    }catch(err){
      if(err=='noRight'){
        this.data.loginmsg = 'noRight';
      }else{
        this.data.loginmsg = 'error';
        alert('请求异常');
      }
      this.data.indexData = null;
    }finally{
      this.data.indexLoading=false;
      if(this.data.loginmsg=='noRight'){
        PUBLIC.RedirectToGen();
      }else{
        this.trigger(this.data);
      }
      
    }
  },
  onGoAddresslist:function(){
      AppStore.onDisabletab();
  },
  onInit:function(){
    AppStore.onMineTab();
  }
});
export default MineStore;