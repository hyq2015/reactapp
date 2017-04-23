import Reflux from 'reflux';
import PUBLIC from '../static/js/public.js';
const pingpp = require('pingpp-js');
import OrderpayActions from '../actions/OrderpayActions';
import CONFIG,{XHR} from '../static/js/request';
let OrderpayStore = Reflux.createStore({
    init: function () {
    this.data = {
        paySuccess:false,
        payStatus:''
    };
  },
  listenables: OrderpayActions,
  getInitialState() {
    return this.data
  },
  onPay:async function(id){
      let initData=this.data;
      let thisObj=this;
      try{
        const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.generateOrder,{'orderId':id},'get').then((res)=>{
            return pingpp.createPayment(res,function(result,errmsg){
                    if (result == "success") {
                        initData.paySuccess=true;
                        initData.payStatus='ok';
                        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                    } else if (result == "fail") {
                        initData.paySuccess=false;
                        initData.payStatus='fail';
                        // charge 不正确或者微信公众账号支付失败时会在此处返回
                    } else if (result == "cancel") {
                        initData.paySuccess=false;
                        initData.payStatus='fail';
                        // 微信公众账号支付取消支付
                    }
                    thisObj.trigger(initData);
                })
            }
            
        );
        // const pingApppay=await res
        
      }catch(err){
        alert('请求异常');
        initData.paySuccess=false;
        initData.payStatus='fail';
        this.trigger(initData);
      }
  }
})
export default OrderpayStore 