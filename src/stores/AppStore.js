import Reflux from 'reflux';
import AppActions from '../actions/AppActions';
let AppStore = Reflux.createStore({
  init: function () {
    this.data = {
      
    };
  },
  listenables: AppActions,
  getInitialState() {
    return this.data
  },
    onDisabletab:function(){
    this.data.tabshow=false;
    this.trigger(this.data);

  },
  onMineTab:function(){
    this.data.tabshow=true;
    this.data.activebar=3,
    this.trigger(this.data);
  },
  onMallTab:function(){
    this.data.tabshow=true;
    this.data.activebar=2,
    this.trigger(this.data);
  },
   onPlayTab:function(){
    this.data.tabshow=true;
    this.data.activebar=1,
    this.trigger(this.data);
  },
});
export default AppStore