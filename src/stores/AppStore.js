import Reflux from 'reflux';
import CONFIG,{XHR} from '../static/js/request';
import AppActions from '../actions/AppActions';
let AppStore = Reflux.createStore({
  init: function () {
    this.data = {
      loading:true
    };
  },
  listenables: AppActions,
  getInitialState() {
    return this.data
  },
  onLoadUser:async function(){
    try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.userlogin,{},'get');
        if(res.openid){
            this.data.user=res;
        }
    }catch(err){
        this.data.user=null;
    }finally{
        this.trigger({user:this.data.user});
    }
  },
  onLoaded:function(){
    this.data.loading=false;
    this.trigger(this.data);
  },
    onDisabletab:function(){
    this.data.tabshow=false;
    this.data.loading=true;
    this.data.pagebottom=0;
    this.trigger(this.data);
  },
  onDisableLoading:function(){
    this.data.tabshow=false;
    this.data.loading=false;
    this.data.pagebottom=0;
    this.trigger(this.data);
  },
  onMineTab:function(){
    this.data.tabshow=true;
    this.data.activebar=3;
    this.data.loading=true;
    this.data.pagebottom=50;
    this.trigger(this.data);
  },
  onMallTab:function(){
    this.data.tabshow=true;
    this.data.activebar=2;
    this.data.loading=true;
    this.data.pagebottom=50;
    this.trigger(this.data);
  },
   onPlayTab:function(){
    this.data.tabshow=true;
    this.data.activebar=1;
    this.data.loading=true;
    this.data.pagebottom=50;
    this.trigger(this.data);
  },
});
export default AppStore