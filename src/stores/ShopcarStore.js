import Reflux from 'reflux';
import ShopcarActions from '../actions/ShopcarActions';
import CONFIG,{XHR} from '../static/js/request';
let ShopcarStore = Reflux.createStore({
  init: function () {
    this.data = {
        indexLoading:true
    };
  },
  listenables: ShopcarActions,
  getInitialState() {
    return this.data
  },
  onLoadData:async function(){
    try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.currentShopCar,{},'get');
        console.log(res);
        this.data.indexLoading=false;
    }catch(err){
        alert('请求异常')
    }finally{
        this.trigger(this.data);
    }
  }
});
export default ShopcarStore;