import Reflux from 'reflux';
const PUBLIC=require('../static/js/public.js') ;
import OrderSuccessActions from '../actions/OrderSuccessActions';
import CONFIG,{XHR} from '../static/js/request';
let OrderSuccessStore = Reflux.createStore({
    init: function () {
    this.data = {
        indexLoading:true,
        originData:{}
    };
  },
  listenables: OrderSuccessActions,
  getInitialState() {
    return this.data
  },
  onLoadData:async function(id){
      try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.orderDetail+id,{},'get');
        this.data.originData=res;
      }catch(err){
        alert('请求异常');
      }finally{
        this.data.indexLoading=false;
        this.trigger(this.data);
      }
  }
})
export default OrderSuccessStore 