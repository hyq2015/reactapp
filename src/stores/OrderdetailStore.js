import Reflux from 'reflux';
import OrderdetailActions from '../actions/OrderdetailActions';
import AppStore from './AppStore';
import _ from 'lodash';
import CONFIG,{XHR} from '../static/js/request';
let OrderdetailStore = Reflux.createStore({
  init: function () {
    this.data = {
        indexLoading:true,
        originData:{}
    };
  },
  listenables: OrderdetailActions,
  getInitialState() {
    return this.data
  },
  
  onLoadData:async function(id){
    try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.orderDetail+id,{},'get');
        this.data.originData=res;
        this.data.indexLoading=false;
    }catch(err){
        this.data.indexLoading=false;
        this.data.originData={};
        alert('请求异常')
    }finally{
        let needAddress=false;
        for(let item of this.data.originData.items){
            if(item.needAddress){
                needAddress=true;
                break;
            }
        }
        this.data.needAddress=needAddress;
        this.trigger(this.data);
    }
  }
})
export default OrderdetailStore