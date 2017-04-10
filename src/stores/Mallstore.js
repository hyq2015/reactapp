import Reflux from 'reflux';
import MallActions from '../actions/MallActions';
import AppStore from './AppStore';
import CONFIG,{XHR} from '../static/js/request';
let MallStore = Reflux.createStore({
  init: function () {
    this.data = {
        indexLoading:true
    };
  },
  listenables: MallActions,
  getInitialState() {
    return this.data
  },
  onInit:function(){
      AppStore.onMallTab();
  },
  
  onLoadData:async function(){
    try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.currentShopCar,{},'get');
        this.data.originData=res;
        ShopcarActions.handleData(res);
    }catch(err){
        alert('请求异常')
    }
  }
})
export default MallStore